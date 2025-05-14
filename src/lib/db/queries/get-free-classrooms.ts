import { classrooms } from "@/lib/classrooms";
import { getXataClient } from "@/lib/db";

const xata = getXataClient();

export async function getFreeClassrooms(day: string) {
  let day_start = new Date(`${day}T13:00:00.000Z`);

  let free = await Promise.all(
    new Array(13).fill(0).map(async (_, i) => {
      let desired_start = new Date(day_start);
      desired_start.setHours(desired_start.getHours() + i);

      let desired_end = new Date(day_start);
      desired_end.setHours(desired_end.getHours() + i + 1);

      let intercepting_events = await xata.db.events
        .select(["*", "classroom.*", "course.*"])
        .filter({
          $any: [
            {
              $all: [
                {
                  start: {
                    $le: desired_start,
                  },
                },
                {
                  end: {
                    $ge: desired_end,
                  },
                },
              ],
            },
            {
              $all: [
                {
                  start: {
                    $le: desired_start,
                  },
                },
                {
                  end: {
                    $gt: desired_start,
                  },
                },
              ],
            },
            {
              $all: [
                {
                  start: {
                    $lt: desired_end,
                  },
                },
                {
                  end: {
                    $ge: desired_end,
                  },
                },
              ],
            },
          ],
        })
        .sort("classroom.name", "asc")
        .getPaginated({
          pagination: {
            size: 100,
          },
          consistency: "eventual",
        });

      let free_classrooms = classrooms
        .filter((classroom) => {
          let intercepting_event = intercepting_events.records.find(
            (e) => e.classroom?.name === classroom.name
          );

          return !intercepting_event;
        })
        .map((classroom) => classroom.name)
        .sort();

      if (free_classrooms.includes("Auditorio")) {
        free_classrooms = [
          "Auditorio",
          ...free_classrooms.filter((c) => c !== "Auditorio"),
        ];
      }

      return {
        start: desired_start,
        end: desired_end,
        classrooms: free_classrooms,
      };
    })
  );

  let yesterday = new Date(day_start);
  yesterday.setDate(yesterday.getDate() - 1);

  let tomorrow = new Date(day_start);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    free,
    yesterday: yesterday.toISOString().split("T")[0],
    today: day_start.toISOString().split("T")[0],
    tomorrow: tomorrow.toISOString().split("T")[0],
    today_date: day_start,
  };
}
