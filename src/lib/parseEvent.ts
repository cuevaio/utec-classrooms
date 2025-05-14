let coursesHashMap: { [key: string]: string } = {
  "calculo vect": "CC1104",
  "ecuaciones dif": "CC2101",
  "estadistica y prob": "IN2005",
  "metodos num": "CC2104",
  "optica & ond": "CC1123",
  "optica y ondas": "CC1123",
  "sistemas embeb": "EL3014",
  "algebra lin": "CC1103",
  "mecanica de solid": "CI2011",
  "mecanica de suel": "CI0012",
  "electricidad y magnet": "CC1122",
  "ciencia de los mat": "CC1143",
  "ciencia de mat": "CC1143",
  "intro a la mecanica": "CC1121",
  "introduccion a la mecanica": "CC1121",
  "investigacion de operaciones ii": "IN3011",
  "investigacion de operaciones i": "IN2003",
  "calculo de una variable": "CC1101",
  "dibujo y diseño para ingenieria": "ME2011",
  "estadistica aplicada": "IN2005",
  "curso vivencial css": "AM0018",
  termodinamica: "CC2121",
};

let evaluationKeywords = [
  "evaluacion",
  "examen",
  "pc",
  "exf",
  "practica calificada",
];

let mentorshipKeywords = ["asesoria", "tutoria", "mentoria"];

type Event = { host?: string; isCourse: boolean } & (
  | {
      isCourse: true;
      course: {
        code: string;
        name?: string;
        section?: number;
        type?: string;
        group?: number;
        isEvaluation: boolean;
        isMentorship: boolean;
      };
    }
  | { name: string; isCourse: false }
);

/**
 * Parses a string representing an event into an Event object.
 * @param event - The string representing the event to be parsed.
 * @returns An Event object representing the parsed event.
 */
export function parseEvent(event: string): Event {
  // Initialize variables to hold parsed data
  let host: string | undefined;
  let name = event.replace(/^:/, "").replace(/--/g, "-");

  let normalizedName = name
    .normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "");

  let isEvaluation = false;

  for (let keyword of evaluationKeywords) {
    if (normalizedName.includes(keyword)) {
      isEvaluation = true;
      break;
    }
  }

  let isMentorship = false;
  for (let keyword of mentorshipKeywords) {
    if (normalizedName.includes(keyword)) {
      isMentorship = true;
      break;
    }
  }

  // If the event includes " - ", it's considered a non-course event
  if (name.includes(" - ")) {
    const parts = name.split(" - ");

    // If the event has 5 parts, it includes detailed course information
    if (parts.length === 5) {
      let [course, section, type, group, hostName] = parts;
      let [code, courseName] = course.split("-");
      name = courseName.trim();
      host = hostName.replace("Docente", "").trim();
      code = code.trim();
      let parsedGroup: number | undefined = undefined;

      // Parse group number if it includes a dot or not
      if (group.includes(".")) {
        const [_, groupNum] = group.split(".");
        parsedGroup = parseInt(groupNum);
      } else {
        parsedGroup = parseInt(group.replace("Grupo", "").trim());
      }

      // Extract course details and return the parsed event object
      return {
        course: {
          code,
          name,
          section: parseInt(section.replace("Sec.", "").trim()),
          type,
          group: parsedGroup,
          isEvaluation: false,
          isMentorship: false,
        },
        host: host === "" ? undefined : host,
        isCourse: true,
      };
    }
  }

  let courseHashMapKeys = Object.keys(coursesHashMap);
  let courseHashMapValues = Object.values(coursesHashMap);

  for (let value of courseHashMapValues) {
    if (normalizedName.includes(value.toLowerCase())) {
      return {
        course: {
          code: value,
          isEvaluation,
          isMentorship,
        },
        isCourse: true,
      };
    }
  }

  for (let key of courseHashMapKeys) {
    if (normalizedName.includes(key)) {
      return {
        course: {
          code: coursesHashMap[key],
          isEvaluation,
          isMentorship,
        },
        isCourse: true,
      };
    }
  }

  if (name.includes(" - ")) {
    const parts = name.split(" - ");

    if (parts.length === 2) {
      const [eventName, hostName] = parts;
      name = eventName.trim();
      host = hostName.trim();

      // Return the parsed non-course event object
      return {
        name,
        host,
        isCourse: false,
      };
    }
  }

  // If the event doesn't match any specific pattern, treat it as a non-course event
  return {
    name: name.trim(),
    host: undefined,
    isCourse: false,
  };
}
