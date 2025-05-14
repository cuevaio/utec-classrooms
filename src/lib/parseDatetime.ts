export function parseDatetime(rawDatetime: string): Date {
  const [day, month, year, hour, minute] = rawDatetime.split(/[\/: ]/);
  const options = { timeZone: "America/Lima" };
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
  return new Date(date.toLocaleString("en-US", options));
}
