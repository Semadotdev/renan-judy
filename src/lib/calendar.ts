import { weddingConfig } from '../config/weddingConfig';

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function formatAllDay(date: string): string {
  return date.replace(/-/g, '');
}

function nextDay(date: string): string {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + 1);
  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, '0');
  const day = String(value.getUTCDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function formatTimestamp(value: string): string {
  return `${new Date(value).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
}

export function buildWeddingCalendar(): string {
  const ceremony = weddingConfig.eventDetails.ceremony;
  const location = [ceremony.venue, ceremony.address].filter(Boolean).join(', ');
  const summary = `${weddingConfig.couple.person1} & ${weddingConfig.couple.person2} Wedding`;
  const description = `Join us for the wedding of ${weddingConfig.couple.person1} and ${weddingConfig.couple.person2}. ${weddingConfig.hashtag}`;
  const start = ceremony.calendarStart
    ? `DTSTART:${formatTimestamp(ceremony.calendarStart)}`
    : `DTSTART;VALUE=DATE:${formatAllDay(weddingConfig.date)}`;
  const end = ceremony.calendarStart
    ? `DTEND:${formatTimestamp(new Date(new Date(ceremony.calendarStart).getTime() + 4 * 60 * 60 * 1000).toISOString())}`
    : `DTEND;VALUE=DATE:${nextDay(weddingConfig.date)}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Judy and Renan//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:judy-renan-${weddingConfig.date}@wedding-invitation`,
    `DTSTAMP:${formatTimestamp(new Date().toISOString())}`,
    start,
    end,
    `SUMMARY:${escapeIcsText(summary)}`,
    location ? `LOCATION:${escapeIcsText(location)}` : '',
    `DESCRIPTION:${escapeIcsText(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}
