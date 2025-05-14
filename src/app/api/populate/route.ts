export const dynamic = "force-dynamic";

import { classrooms as cx } from "@/lib/classrooms";
import { getXataClient } from "@/lib/db";
import { parseDatetime } from "@/lib/parseDatetime";
import { parseEvent } from "@/lib/parseEvent";

const xata = getXataClient();

export const GET = async () => {
  let rawStart = "15/03/2025";
  let rawEnd = "15/10/2025";

  let classrooms_fetched = 0;

  let i0 = setInterval(() => {
    console.log(`Fetched ${classrooms_fetched}/${cx.length} classrooms`);
  }, 500);

  let events_count = 0;
  let events_processed = 0;
  let classrooms_processed = 0;

  let hostHash: { [key: string]: string } = {};
  let allHosts = await xata.db.hosts.getAll();
  allHosts.forEach((host) => {
    if (host.name) {
      hostHash[host.name] = host.id;
    }
  });

  let cousesHash: { [key: string]: string } = {};
  let allCourses = await xata.db.courses.getAll();
  allCourses.forEach((course) => {
    if (course.code) {
      cousesHash[course.code] = course.id;
    }
  });

  async function getHostID(name: string) {
    let existing_host = hostHash[name];
    if (existing_host) {
      return existing_host;
    } else {
      try {
        let created_host = await xata.db.hosts.create({
          name,
        });
        hostHash[name] = created_host.id;
        return created_host.id;
      } catch (e) {
        return getHostID(name);
      }
    }
  }

  async function getCourseID(code: string, name: string | undefined) {
    let existing_course = cousesHash[code];
    if (existing_course) {
      return existing_course;
    } else {
      try {
        let created_course = await xata.db.courses.create({
          code,
          name,
        });
        cousesHash[code] = created_course.id;
        return created_course.id;
      } catch (e) {
        return getCourseID(code, name);
      }
    }
  }

  try {
    let xAuthToken = process.env.UTEC_X_AUTH_TOKEN || "";
    let sessionId = process.env.UTEC_SESSION_ID || "";

    let start = parseDatetime(rawStart + " 06:00");
    let end = parseDatetime(rawEnd + " 23:30");

    let rawEventsByClassroom: {
      classroom_name: string;
      rawEvents: { start: string; end: string; title: string }[];
    }[] = [];

    await Promise.all(
      cx.map(async (classroom) => {
        let payload = JSON.stringify({
          codAula: classroom.code,
          fechaInicial: rawStart,
          fechaFinal: rawEnd,
        });

        let response = await fetch(
          "https://reserva-intranet.utec.edu.pe/events/",
          {
            method: "POST",
            body: payload,
            headers: {
              "X-Auth-Token": xAuthToken,
              Cookie: `sessionId=${sessionId}`,
              Accept: "application/json, text/plain, */*",
              "Accept-Language": "en-US,en;q=0.6",
              "Content-Type": "application/json",
              Origin: "https://reserva-intranet.utec.edu.pe",
              Referer: "https://reserva-intranet.utec.edu.pe/reserva/aulalibre",
              "Sec-Ch-Ua":
                '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
              "Sec-Ch-Ua-Mobile": "?0",
              "Sec-Ch-Ua-Platform": "Windows",
              "Sec-Fetch-Dest": "empty",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-origin",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
              cache: "no-store",
            },
          }
        );

        console.log(classroom);
        if (!response.ok) {
          throw new Error("Failed to fetch events from UTEC API");
        }

        classrooms_fetched++;

        let rawEvents = (await response.json()).content as {
          start: string;
          end: string;
          title: string;
        }[];
        rawEventsByClassroom.push({
          classroom_name: classroom.name,
          rawEvents,
        });
        events_count += rawEvents.length;
      })
    );

    clearInterval(i0);

    for (let i = 0; i < rawEventsByClassroom.length; i++) {
      let { classroom_name, rawEvents } = rawEventsByClassroom[i];
      let xata_classroom = await xata.db.classrooms
        .filter({ name: classroom_name })
        .getFirstOrThrow();

      if (!xata_classroom.code) {
        throw new Error("Classroom code not found");
      }

      let existing_events_page = await xata.db.events
        .select(["*", "course.*", "host.*", "classroom.*"])
        .filter({
          $all: [
            {
              "classroom.id": xata_classroom.id,
            },
            {
              start: {
                $ge: start,
              },
            },
            {
              end: {
                $le: end,
              },
            },
          ],
        })
        .getPaginated({
          pagination: {
            size: 1000,
          },
        });

      let events_to_create: {
        start: Date;
        end: Date;
        classroom: string;
        name?: string;
        course?: string;
        host?: string;
        group?: number;
        section?: number;
        classType?: string;
      }[] = [];

      let events_to_delete: string[] = [];
      let existing_events = existing_events_page.records;

      // in each iteration, we'll remove the event from the array if its in the UTEC API response
      await Promise.all(
        rawEvents.map(async ({ title, start, end }) => {
          let event_start = parseDatetime(start);
          let event_end = parseDatetime(end);

          let event_name: string | undefined = undefined;

          let group: number | undefined = undefined;
          let section: number | undefined = undefined;
          let classType: string | undefined = undefined;

          let event = parseEvent(title);

          if (event.isCourse) {
            group = event.course.group;
            section = event.course.section;
            classType = event.course.type;
            if (event.course.isEvaluation) {
              event_name = "Evaluación";
            } else if (event.course.isMentorship) {
              event_name = "Asesoría";
            }
          } else {
            event_name = event.name;
          }

          async function createEvent() {
            events_to_create.push({
              start: event_start,
              end: event_end,
              classroom: xata_classroom.id,
              name: event_name,
              course: event.isCourse
                ? await getCourseID(event.course.code, event.course.name)
                : undefined,
              host: event.host ? await getHostID(event.host) : undefined,
              group,
              section,
              classType,
            });
          }

          let event_with_the_same_start_and_end = existing_events.find(
            (event) =>
              event.start &&
              event.end &&
              event.start.getTime() === event_start.getTime() &&
              event.end.getTime() === event_end.getTime()
          );

          if (event_with_the_same_start_and_end) {
            // check if the name is the same, or the course is the same, or the host is the same
            // if not, it shoud be deleted

            if (
              (event_with_the_same_start_and_end.name &&
                event_with_the_same_start_and_end.name !== event_name) ||
              (event.isCourse &&
                event_with_the_same_start_and_end.course &&
                event_with_the_same_start_and_end.course.code !==
                  event.course.code) ||
              (event.host &&
                event_with_the_same_start_and_end.host &&
                event_with_the_same_start_and_end.host.name !== event.host)
            ) {
              events_to_delete.push(event_with_the_same_start_and_end.id);
              await createEvent();
            } else {
              // the event is the same, so don't create it again
            }
          } else {
            await createEvent();
          }
        })
      );

      await xata.db.events.create(events_to_create);
      await xata.db.events.delete(events_to_delete);

      console.log(
        JSON.stringify({
          classroom: xata_classroom.name,
          created: events_to_create.length,
          deleted: events_to_delete.length,
        })
      );

      events_processed += rawEvents.length;
      classrooms_processed++;
      console.log(`processed ${events_processed}/${events_count} events`);
      console.log(`processed ${classrooms_processed}/${cx.length} classrooms`);
    }

    return Response.json({
      message: "success",
    });
  } catch (e) {
    clearInterval(i0);

    console.error(e);
    return Response.json({ error: JSON.stringify(e) }, { status: 500 });
  }
};
