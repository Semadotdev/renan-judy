import { weddingConfig, type EventDetail } from '../config/weddingConfig';

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

interface CalendarEventOptions {
  uid: string;
  summary: string;
  description: string;
}

function buildEvent(detail: EventDetail, options: CalendarEventOptions): string[] {
  const location = [detail.venue, detail.address].filter(Boolean).join(', ');
  const start = detail.calendarStart
    ? `DTSTART:${formatTimestamp(detail.calendarStart)}`
    : `DTSTART;VALUE=DATE:${formatAllDay(weddingConfig.date)}`;
  const end = detail.calendarStart
    ? `DTEND:${formatTimestamp(new Date(new Date(detail.calendarStart).getTime() + 4 * 60 * 60 * 1000).toISOString())}`
    : `DTEND;VALUE=DATE:${nextDay(weddingConfig.date)}`;

  return [
    'BEGIN:VEVENT',
    `UID:${options.uid}@wedding-invitation`,
    `DTSTAMP:${formatTimestamp(new Date().toISOString())}`,
    start,
    end,
    `SUMMARY:${escapeIcsText(options.summary)}`,
    location ? `LOCATION:${escapeIcsText(location)}` : '',
    `DESCRIPTION:${escapeIcsText(options.description)}`,
    'END:VEVENT',
  ].filter(Boolean);
}

export function buildWeddingCalendar(): string {
  const { ceremony, reception } = weddingConfig.eventDetails;
  const couple = `${weddingConfig.couple.person1} & ${weddingConfig.couple.person2}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Judy and Renan//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...buildEvent(ceremony, {
      uid: `judy-renan-ceremony-${weddingConfig.date}`,
      summary: `${couple} Wedding Ceremony`,
      description: `Join us for the wedding ceremony of ${weddingConfig.couple.person1} and ${weddingConfig.couple.person2}. ${weddingConfig.hashtag}`,
    }),
    ...buildEvent(reception, {
      uid: `judy-renan-reception-${weddingConfig.date}`,
      summary: `${couple} Wedding Reception`,
      description: `Join us for the wedding reception of ${weddingConfig.couple.person1} and ${weddingConfig.couple.person2}. ${weddingConfig.hashtag}`,
    }),
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}
