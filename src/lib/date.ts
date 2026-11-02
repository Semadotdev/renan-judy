export function parseWeddingDate(date: string): Date {
  return new Date(`${date}T12:00:00+08:00`);
}

export function formatWeddingDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Manila',
  }).format(parseWeddingDate(date));
}

export function formatWeddingDay(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone: 'Asia/Manila',
  }).format(parseWeddingDate(date));
}

export function formatWeddingMonth(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    timeZone: 'Asia/Manila',
  }).format(parseWeddingDate(date));
}

export function getWeddingDateParts(date: string): {
  day: string;
  month: string;
  year: string;
} {
  const [year, month, day] = date.split('-');
  return { day, month, year: year.slice(-2) };
}

export function getFirstName(fullName: string): string {
  return fullName.split(' ')[0];
}
