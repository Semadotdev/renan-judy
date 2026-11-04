import { useState } from 'react';
import { CalendarPlus, Check } from 'lucide-react';
import { buildWeddingCalendar } from '../lib/calendar';
import { formatWeddingDate } from '../lib/date';
import { weddingConfig } from '../config/weddingConfig';

export default function AddToCalendar() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([buildWeddingCalendar()], {
      type: 'text/calendar;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'judy-renan-wedding.ics';
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 3200);
  };

  return (
    <div className="night-panel flex h-full flex-col justify-between border border-taupe/25 p-7 text-milk sm:p-8">
      <div>
        <p className="eyebrow text-taupe">Keep the date</p>
        <h3 className="mt-4 text-3xl leading-tight text-milk">Take the date with you.</h3>
        <p className="mt-3 max-w-sm font-body text-lg leading-relaxed text-oat/65">
          Add {formatWeddingDate(weddingConfig.date)} to your calendar so you do not miss the beginning of our celebration.
        </p>
      </div>
      <button
        type="button"
        onClick={handleDownload}
        className="cinematic-link mt-8 w-full justify-between border-taupe/55 text-milk hover:bg-milk/5"
      >
        <span>{downloaded ? 'Calendar saved' : 'Add to calendar'}</span>
        {downloaded ? <Check size={15} strokeWidth={1.5} /> : <CalendarPlus size={15} strokeWidth={1.5} />}
      </button>
    </div>
  );
}
