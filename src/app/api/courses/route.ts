import { parseEvent } from "@/lib/parseEvent";
import { examples } from "@/lib/parseEvent.examples";

export const GET = async () => {
  try {
    let titles = examples;

    let coursesWithName: { [code: string]: string } = {};
    let coursesWithoutName: string[] = [];

    for (let title of titles) {
      let event = parseEvent(title);

      if (event.isCourse) {
        if (event.course.name) {
          if (!coursesWithName[event.course.code]) {
            coursesWithName[event.course.code] = event.course.name;
          }
        } else {
          if (!coursesWithoutName.includes(event.course.code)) {
            coursesWithoutName.push(event.course.code);
          }
        }
      }
    }

    coursesWithoutName = coursesWithoutName
      .filter((course) => !coursesWithName[course])
      .sort();

    return Response.json({ coursesWithName, coursesWithoutName });
  } catch (error) {
    return Response.json({ error: JSON.stringify(error) }, { status: 500 });
  }
};
