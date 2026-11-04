import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PenLine } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { sendEmailSubmission } from '../lib/emailSubmit';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  location: string;
  submittedAt: string;
}

const STORAGE_KEY = 'wedding_guestbook_v2';

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso));
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [form, setForm] = useState({
    name: '',
    message: '',
    location: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch (err) {
      console.warn('Guestbook could not be loaded', err);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setError('A name and wish are needed to leave a postcard.');
      setSubmitError('');
      return;
    }

    setError('');
    setSubmitError('');
    setStatus('submitting');

    const entry: GuestbookEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: form.name.trim(),
      message: form.message.trim(),
      location: form.location.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      await sendEmailSubmission({
        subject: `New postcard — ${entry.name}`,
        fields: {
          Name: entry.name,
          From: entry.location || '—',
          Postcard: entry.message,
          'Submitted at': entry.submittedAt,
        },
      });

      const next = [entry, ...entries].slice(0, 50);
      setEntries(next);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn('Guestbook could not be saved', err);
      }

      setForm({ name: '', message: '', location: '' });
      setStatus('submitted');

      window.setTimeout(() => setStatus('idle'), 3800);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Your postcard could not be sent. Please try again.',
      );
      setStatus('idle');
    }
  };

  const mailtoHref = `mailto:${weddingConfig.submissions.email}?subject=${encodeURIComponent(
    `Postcard — ${form.name.trim() || 'Guest'}`,
  )}&body=${encodeURIComponent(
    [
      `Name: ${form.name.trim()}`,
      `From: ${form.location.trim() || '—'}`,
      `Postcard: ${form.message.trim()}`,
    ].join('\n'),
  )}`;

  return (
    <section id="wishes" className="relative overflow-hidden py-24 text-milk sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter XI"
          title="Wishes for the Day"
          intro="Leave us a message for the road ahead."
          dark
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="night-panel relative overflow-hidden border border-taupe/30 p-7 sm:p-9"
              noValidate
            >
              <div className="flex items-center gap-3">
                <PenLine size={16} strokeWidth={1.4} className="text-taupe" />
                <p className="eyebrow text-taupe">Leave a postcard</p>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="block">
                  <span className="font-sans text-[0.56rem] uppercase tracking-[0.22em] text-oat/45">
                    Name *
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="mt-2 field text-milk placeholder:text-milk/30"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="font-sans text-[0.56rem] uppercase tracking-[0.22em] text-oat/45">
                    From (optional)
                  </span>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(event) => setForm({ ...form, location: event.target.value })}
                    className="mt-2 field text-milk placeholder:text-milk/30"
                    placeholder="City or place"
                  />
                </label>

                <label className="block">
                  <span className="font-sans text-[0.56rem] uppercase tracking-[0.22em] text-oat/45">
                    Your wish *
                  </span>
                  <textarea
                    rows={6}
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    className="mt-2 field resize-none text-milk placeholder:text-milk/30"
                    placeholder="Fair winds and following seas..."
                  />
                </label>
              </div>

              {error && (
                <p className="mt-4 font-body text-sm leading-relaxed text-oat/60">{error}</p>
              )}

              {submitError && (
                <p role="alert" className="mt-4 font-body text-sm leading-relaxed text-oat/60">
                  {submitError}{' '}
                  <a
                    href={mailtoHref}
                    className="underline decoration-taupe/50 underline-offset-4 transition-colors hover:text-milk"
                  >
                    Email us directly
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="cinematic-link mt-6 w-full justify-between border-taupe/55 text-milk disabled:opacity-40"
              >
                <span>
                  {status === 'submitting'
                    ? 'Sealing the postcard...'
                    : status === 'submitted'
                      ? 'Postcard received'
                      : 'Send your wish'}
                </span>
                <PenLine size={14} strokeWidth={1.5} />
              </button>

              <p className="mt-5 font-sans text-[0.54rem] uppercase tracking-[0.18em] text-oat/35">
                Your postcard is sent privately to the couple.
              </p>
            </form>
          </Reveal>

          <div className="space-y-4">
            {entries.length === 0 ? (
              <Reveal delay={0.1}>
                <div className="border border-taupe/25 px-6 py-12 text-center">
                  <p className="font-display text-4xl text-milk/90">Fair winds.</p>
                  <p className="mt-3 font-body text-lg italic text-oat/55">
                    Be the first to leave a wish.
                  </p>
                </div>
              </Reveal>
            ) : (
              entries.map((entry, index) => (
                <Reveal key={entry.id} delay={index * 0.05}>
                  <motion.article
                    className="paper relative overflow-hidden border border-taupe/30 px-6 py-7 text-charcoal"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="absolute inset-3 border border-mocha/10" />
                    <div className="relative">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-display text-2xl">{entry.name}</p>
                          {entry.location && (
                            <p className="font-sans text-[0.56rem] uppercase tracking-[0.18em] text-mocha/50">
                              {entry.location}
                            </p>
                          )}
                        </div>
                        <p className="font-sans text-[0.54rem] uppercase tracking-[0.18em] text-mocha/40">
                          {formatDate(entry.submittedAt)}
                        </p>
                      </div>
                      <p className="mt-4 max-w-2xl text-pretty font-body text-xl italic leading-relaxed text-mocha">
                        “{entry.message}”
                      </p>
                    </div>
                  </motion.article>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
