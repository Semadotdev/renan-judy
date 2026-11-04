import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Mail } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { formatWeddingDate } from '../lib/date';
import { sendEmailSubmission } from '../lib/emailSubmit';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

type Attending = 'yes' | 'no' | '';

interface RSVPData {
  name: string;
  attending: Attending;
  guests: number;
  message: string;
}

interface RSVPErrors {
  name?: string;
  attending?: string;
  guests?: string;
}

const STORAGE_KEY = 'wedding_rsvps';

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPData>({
    name: '',
    attending: '',
    guests: 1,
    message: '',
  });
  const [errors, setErrors] = useState<RSVPErrors>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const attendingLabel =
    formData.attending === 'yes' ? 'Joyfully accepting' : 'Regretfully declining';
  const mailtoHref = `mailto:${weddingConfig.submissions.email}?subject=${encodeURIComponent(
    `RSVP — ${formData.name.trim() || 'Guest'}`,
  )}&body=${encodeURIComponent(
    [
      `Name: ${formData.name.trim()}`,
      `Attending: ${attendingLabel}`,
      `Guests: ${formData.attending === 'yes' ? formData.guests : 0}`,
      `Message: ${formData.message.trim() || '—'}`,
    ].join('\n'),
  )}`;

  const validateStep = (index: number): boolean => {
    const nextErrors: RSVPErrors = {};

    if (index === 0) {
      if (!formData.name.trim()) nextErrors.name = 'Please share your name.';
      if (!formData.attending) nextErrors.attending = 'Please confirm your attendance.';
    }

    if (index === 1 && formData.attending === 'yes' && formData.guests < 1) {
      nextErrors.guests = 'At least one guest is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setStep((current) => Math.min(current + 1, 1));
    }
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateStep(1)) return;

    setIsSubmitting(true);
    setSubmitError('');

    const submittedAt = new Date().toISOString();

    try {
      await sendEmailSubmission({
        subject: `New RSVP — ${formData.name.trim()} (${attendingLabel})`,
        fields: {
          Name: formData.name.trim(),
          Attending: attendingLabel,
          Guests: formData.attending === 'yes' ? formData.guests : 0,
          Message: formData.message.trim() || '—',
          'Submitted at': submittedAt,
        },
      });

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const existing = saved ? JSON.parse(saved) : [];
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify([
            ...existing,
            {
              ...formData,
              submittedAt,
            },
          ]),
        );
      } catch (err) {
        console.warn('RSVP could not be saved', err);
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Your reply could not be sent. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!weddingConfig.rsvp.enabled) return null;

  return (
    <section id="rsvp" className="relative overflow-hidden bg-milk py-24 text-charcoal sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter X"
          title="Reply"
          intro="Let us know if you will be joining us for the celebration."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
          <Reveal>
            <div className="night-panel flex h-full flex-col justify-between border border-taupe/25 p-7 text-milk sm:p-9">
              <div>
                <p className="eyebrow text-taupe">Your response</p>
                <p className="mt-5 font-script text-5xl leading-none text-milk">Judy &amp; Renan</p>
                <p className="mt-5 max-w-sm font-body text-lg leading-relaxed text-oat/65">
                  {weddingConfig.rsvp.deadline
                    ? `Please reply by ${formatWeddingDate(weddingConfig.rsvp.deadline)}.`
                    : 'Please reply as soon as you can so we can prepare your place at the table.'}
                </p>
              </div>

              <div className="mt-10 space-y-4 border-t border-taupe/25 pt-6">
                <div className="flex items-center gap-3 text-oat/60">
                  <Mail size={15} strokeWidth={1.4} className="text-taupe" />
                  <p className="font-body text-base">
                    Your response is sent privately to the couple.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-oat/60">
                  <Check size={15} strokeWidth={1.4} className="text-taupe" />
                  <p className="font-body text-base">
                    {formatWeddingDate(weddingConfig.date)}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="paper relative h-full border border-taupe/30 p-7 shadow-paper sm:p-10">
              <div className="absolute inset-4 border border-mocha/10" />

              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="success"
                    className="relative flex min-h-[28rem] flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#C0AB94_0%,#A39382_46%,#776858_100%)] shadow-lg"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 12 }}
                    >
                      <Check size={30} strokeWidth={1.4} className="text-charcoal" />
                    </motion.div>
                    <p className="eyebrow mt-7 text-mocha/55">Reply received</p>
                    <h3 className="mt-4 text-4xl leading-tight text-charcoal sm:text-5xl">
                      Your place is saved.
                    </h3>
                    <p className="mt-4 max-w-sm font-body text-lg leading-relaxed text-mocha">
                      Thank you, {formData.name.split(' ')[0]}. We cannot wait to share the day with you.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setStep(0);
                        setSubmitError('');
                      }}
                      className="mt-8 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-mocha/60 underline decoration-taupe/50 underline-offset-8 transition-colors hover:text-charcoal"
                    >
                      Edit response
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="relative"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    noValidate
                  >
                    <div className="flex items-center justify-between">
                      <p className="eyebrow text-mocha/55">Reply card</p>
                      <div className="flex items-center gap-2">
                        {[0, 1].map((index) => (
                          <span
                            key={index}
                            className={`h-1.5 w-1.5 rounded-full ${step === index ? 'bg-taupe' : 'bg-mocha/20'}`}
                          />
                        ))}
                        <span className="ml-2 font-sans text-[0.54rem] uppercase tracking-[0.18em] text-mocha/40">
                          {step + 1} / 2
                        </span>
                      </div>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                      {step === 0 ? (
                        <motion.div
                          key="step-one"
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -18 }}
                          transition={{ duration: 0.35 }}
                          className="mt-7 space-y-6"
                        >
                          <label className="block">
                            <span className="font-sans text-[0.58rem] uppercase tracking-[0.22em] text-mocha/60">
                              Full name *
                            </span>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                              className="mt-2 field"
                              placeholder="Your name"
                              aria-invalid={Boolean(errors.name)}
                              aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
                            />
                            {errors.name && (
                              <span id="rsvp-name-error" className="mt-2 block font-body text-sm italic text-mocha">
                                {errors.name}
                              </span>
                            )}
                          </label>

                          <fieldset>
                            <legend className="font-sans text-[0.58rem] uppercase tracking-[0.22em] text-mocha/60">
                              Will you be attending? *
                            </legend>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              {[
                                { value: 'yes', label: 'Joyfully accepting' },
                                { value: 'no', label: 'Regretfully declining' },
                              ].map((option) => (
                                <label
                                  key={option.value}
                                  className={`cursor-pointer border px-4 py-4 transition-colors focus-within:ring-2 focus-within:ring-taupe ${
                                    formData.attending === option.value
                                      ? 'border-taupe bg-taupe/10'
                                      : 'border-mocha/20 hover:border-taupe/60'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="attending"
                                    value={option.value}
                                    checked={formData.attending === option.value}
                                    onChange={(event) =>
                                      setFormData({
                                        ...formData,
                                        attending: event.target.value as Attending,
                                      })
                                    }
                                    className="sr-only"
                                  />
                                  <span className="font-body text-lg text-charcoal">{option.label}</span>
                                </label>
                              ))}
                            </div>
                            {errors.attending && (
                              <span className="mt-2 block font-body text-sm italic text-mocha">
                                {errors.attending}
                              </span>
                            )}
                          </fieldset>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="step-two"
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -18 }}
                          transition={{ duration: 0.35 }}
                          className="mt-7 space-y-6"
                        >
                          <div className="border border-mocha/15 bg-oat/30 px-4 py-3">
                            <p className="font-sans text-[0.54rem] uppercase tracking-[0.18em] text-mocha/45">
                              Replying as
                            </p>
                            <p className="mt-1 font-body text-lg text-charcoal">{formData.name}</p>
                          </div>

                          {formData.attending === 'yes' && (
                            <label className="block">
                              <span className="font-sans text-[0.58rem] uppercase tracking-[0.22em] text-mocha/60">
                                Number of guests
                              </span>
                              <input
                                type="number"
                                min={1}
                                max={10}
                                value={formData.guests}
                                onChange={(event) =>
                                  setFormData({
                                    ...formData,
                                    guests: Math.max(1, Number(event.target.value) || 1),
                                  })
                                }
                                className="mt-2 field"
                                aria-invalid={Boolean(errors.guests)}
                                aria-describedby={errors.guests ? 'rsvp-guests-error' : undefined}
                              />
                              {errors.guests && (
                                <span
                                  id="rsvp-guests-error"
                                  className="mt-2 block font-body text-sm italic text-mocha"
                                >
                                  {errors.guests}
                                </span>
                              )}
                            </label>
                          )}

                          <label className="block">
                            <span className="font-sans text-[0.58rem] uppercase tracking-[0.22em] text-mocha/60">
                              A note for the couple (optional)
                            </span>
                            <textarea
                              rows={5}
                              value={formData.message}
                              onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                              className="mt-2 field resize-none"
                              placeholder="A wish, a memory, or a note for the day..."
                            />
                          </label>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-8 flex items-center justify-between gap-4">
                      {step > 0 ? (
                        <button
                          type="button"
                          onClick={goBack}
                          className="inline-flex items-center gap-2 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-mocha/60 transition-colors hover:text-charcoal"
                        >
                          <ArrowLeft size={14} strokeWidth={1.4} /> Back
                        </button>
                      ) : (
                        <span />
                      )}

                      {step === 0 ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            goNext();
                          }}
                          className="cinematic-link border-mocha/30 text-charcoal hover:bg-mocha/5"
                        >
                          Continue <ArrowRight size={14} strokeWidth={1.4} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="cinematic-link border-mocha/30 text-charcoal hover:bg-mocha/5 disabled:opacity-40"
                        >
                          {isSubmitting ? 'Sending reply...' : 'Send reply'}{' '}
                          <ArrowRight size={14} strokeWidth={1.4} />
                        </button>
                      )}
                    </div>

                    {submitError && (
                      <p role="alert" className="mt-5 font-body text-sm italic leading-relaxed text-mocha">
                        {submitError}{' '}
                        <a
                          href={mailtoHref}
                          className="underline decoration-taupe/50 underline-offset-4 transition-colors hover:text-charcoal"
                        >
                          Email us directly
                        </a>
                        .
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
