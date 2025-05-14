import { expect, test } from "vitest";
import { parseEvent } from "./parseEvent";

test("Parsing event with name and host", () => {
  const event = ":Mantenimiento SSGG - Victor Enciso";
  const result = parseEvent(event);
  expect(result).toEqual({
    name: "Mantenimiento SSGG",
    host: "Victor Enciso",
    isCourse: false,
  });
});

test("Parsing event with name only", () => {
  const event = ":Soporte TI";
  const result = parseEvent(event);
  expect(result).toEqual({
    name: "Soporte TI",
    host: undefined,
    isCourse: false,
  });
});

test("Parsing event with name only", () => {
  const event = ":Cambio de Clases ";
  const result = parseEvent(event);
  expect(result).toEqual({
    name: "Cambio de Clases",
    host: undefined,
    isCourse: false,
  });
});

test("Parsing event with name only", () => {
  const event = ":MANTENIMIENTO AUDIOVISUAL TI 2024-I";
  const result = parseEvent(event);
  expect(result).toEqual({
    name: "MANTENIMIENTO AUDIOVISUAL TI 2024-I",
    host: undefined,
    isCourse: false,
  });
});

test("Parsing event with name and host", () => {
  const event = ":Centro Pre - Jimena Torres";
  const result = parseEvent(event);
  expect(result).toEqual({
    name: "Centro Pre",
    host: "Jimena Torres",
    isCourse: false,
  });
});

test("Parsing event with course details and host", () => {
  const event =
    "IN8006-Análisis y Diseño de Sistemas de Manufactura y Servicios - Sec.1 - TEO - Grupo 1 - Docente\tGeorge Gonzalez";
  const result = parseEvent(event);
  expect(result).toEqual({
    course: {
      code: "IN8006",
      name: "Análisis y Diseño de Sistemas de Manufactura y Servicios",
      section: 1,
      type: "TEO",
      group: 1,
      isEvaluation: false,
      isMentorship: false,
    },
    host: "George Gonzalez",
    isCourse: true,
  });
});

test("Parsing event with course details and host", () => {
  const event =
    "GI3101-Finanzas Empresariales - Sec.1 - TEO - Grupo 1.07 - Docente\tCesar Alfredo Bezada";
  const result = parseEvent(event);
  expect(result).toEqual({
    course: {
      code: "GI3101",
      name: "Finanzas Empresariales",
      section: 1,
      type: "TEO",
      group: 7,
      isEvaluation: false,
      isMentorship: false,
    },
    host: "Cesar Alfredo Bezada",
    isCourse: true,
  });
});

test("Parsing event with course details", () => {
  const event = "CC1101-Cálculo de una variable - Sec.3 - TEO - Grupo 3.05 -  ";
  const result = parseEvent(event);
  expect(result).toEqual({
    course: {
      code: "CC1101",
      name: "Cálculo de una variable",
      section: 3,
      type: "TEO",
      group: 5,
      isEvaluation: false,
      isMentorship: false,
    },
    host: undefined,
    isCourse: true,
  });
});

// ExF Ecuaciones Diferenciales - Teoría 1.00
test("Parsing event with course details", () => {
  const event = "ExF Ecuaciones Diferenciales - Teoría 1.00";
  const result = parseEvent(event);
  expect(result).toEqual({
    course: {
      code: "CC2101",
      isEvaluation: true,
      isMentorship: false,
    },
    isCourse: true,
  });
});

//   ":MANTENIMIENTO AUDIOVISUAL TI 2024-I  --  Anthony Davila"

test("Parsing event with name and host", () => {
  const event = ":MANTENIMIENTO AUDIOVISUAL TI 2024-I  --  Anthony Davila";
  const result = parseEvent(event);
  expect(result).toEqual({
    name: "MANTENIMIENTO AUDIOVISUAL TI 2024-I",
    host: "Anthony Davila",
    isCourse: false,
  });
});

// ":ExF Álgebra Lineal"
test("Parsing event with name only", () => {
  const event = ":ExF Álgebra Lineal";
  const result = parseEvent(event);
  expect(result).toEqual({
    course: {
      code: "CC1103",
      isEvaluation: true,
      isMentorship: false,
    },
    isCourse: true,
  });
});

// ":EL3014 Introducción a Sistemas Embebidos Teoría 1,00 - Camacho Jiménez, Francisco José"
test("Parsing event with course details and host", () => {
  const event =
    ":EL3014 Introducción a Sistemas Embebidos Teoría 1,00 - Camacho Jiménez, Francisco José";
  const result = parseEvent(event);
  expect(result).toEqual({
    course: {
      code: "EL3014",
      isEvaluation: false,
      isMentorship: false,
    },
    isCourse: true,
  });
});
