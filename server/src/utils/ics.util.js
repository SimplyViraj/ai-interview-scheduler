export function createICS(start, end) {
  return `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${start.toISOString().replace(/[-:]/g,"").split(".")[0]}Z
DTEND:${end.toISOString().replace(/[-:]/g,"").split(".")[0]}Z
SUMMARY:Interview
END:VEVENT
END:VCALENDAR
`;
}
