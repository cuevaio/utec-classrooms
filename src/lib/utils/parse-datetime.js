/**
 * Creates a Date instance from a raw datetime string in the format DD/MM/YYYY HH:mm.
 * @param {string} rawDateTime - The raw datetime string.
 * @returns {Date} A Date instance representing the local time in Lima.
 */
export function parseDatetime(rawDateTime) {
	const [day, month, year, hour, minute] = rawDateTime.split(/[\/: ]/);
	const options = { timeZone: 'America/Lima' };
	const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
	return new Date(date.toLocaleString('en-US', options));
}
