'use client';

import { useState, FormEvent } from 'react';
import { submitContact } from '@/lib/api';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';

const BUDGETS = ['< $500', '$500 – $1,000', '$1,000 – $5,000', '$5,000+', "Let's talk"];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
}

export function ContactSection({ profile }: { profile: any }) {
  const email = profile?.email || 'hello@adilashrafi.com';
  const phone = profile?.phone || '+880 1853 837221'; // Phone might need adding to profile fetch
  const location = profile?.location || 'Mohammadpur, Dhaka';
  const linkedin = profile?.social?.linkedin || 'https://www.linkedin.com/in/al-adil-ashrafi/';

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setFeedback('Please fill in Name, Email, and Message.');
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }
    if (form.message.length < 10) {
      setStatus('error');
      setFeedback('Message is too short. Please provide a bit more detail (at least 10 characters).');
      return;
    }
    setStatus('sending');
    const res = await submitContact(form);
    setStatus(res.success ? 'success' : 'error');
    setFeedback(res.message);
    if (res.success) setForm({ name: '', email: '', subject: '', message: '', budget: '' });
  };

  const inputCls =
    'w-full bg-dark border border-[rgba(1,156,255,0.15)] px-4 py-3 text-text font-body text-[0.9rem] outline-none transition-colors duration-200 focus:border-blue placeholder:text-muted';

  return (
    <section id="contact" className="px-6 lg:px-16 py-24 bg-dark-2">
      <div className="max-w-[720px] mx-auto">
        <RevealWrapper>
          <div className="text-center">
            <SectionHeader
              label="Contact"
              title="Ready to Accelerate"
              titleAccent="your growth?"
              centered
            />
          </div>
        </RevealWrapper>

        <RevealWrapper delay={80}>
          <p className="text-muted text-center mt-4 mb-4">
            Whether you need to scale organic traffic, launch a high-converting campaign, or build something entirely new — let's talk about what's possible.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={160}>
          <div className="flex justify-center gap-12 mt-8 flex-wrap">
            <div className="text-center">
              <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted mb-1">
                Phone
              </p>
              <p className="text-[0.92rem] text-text font-medium">{phone}</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted mb-1">
                Location
              </p>
              <p className="text-[0.92rem] text-text font-medium">{location}</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted mb-1">
                Status
              </p>
              <p className="text-[0.92rem] text-green font-medium">Available</p>
            </div>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={200}>
          <div className="flex gap-3 justify-center mt-8 flex-wrap">
            <a
              href={`mailto:${email}`}
              className="btn-clip inline-flex items-center gap-2 bg-blue text-white font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all duration-200 hover:bg-[#0088e0] hover:-translate-y-px"
              style={{ borderRadius: '2px' }}
            >
              Email Directly
            </a>
            <a
              href="https://markimist.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-orange text-orange font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all duration-200 hover:bg-orange hover:text-white"
              style={{ borderRadius: '2px' }}
            >
              Markimist →
            </a>
          </div>
        </RevealWrapper>

        {/* Contact Form */}
        <RevealWrapper delay={250}>
          <div className="mt-8 text-left">
            {status === 'success' ? (
              <div className="bg-[rgba(45,206,137,0.1)] border border-[rgba(45,206,137,0.25)] text-green p-4 text-center text-[0.85rem]" style={{ borderRadius: '2px' }}>
                ✓ {feedback || 'Thanks! Your message has been sent.'}
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted block mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={set('name')}
                      className={inputCls}
                      style={{ borderRadius: '2px' }}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={set('email')}
                      className={inputCls}
                      style={{ borderRadius: '2px' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted block mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={set('subject')}
                      className={inputCls}
                      style={{ borderRadius: '2px' }}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted block mb-2">
                      Budget
                    </label>
                    <select
                      value={form.budget}
                      onChange={set('budget')}
                      className={`${inputCls} cursor-pointer`}
                      style={{ borderRadius: '2px', appearance: 'none' }}
                    >
                      <option value="">Select a range</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b} style={{ background: '#0b1622' }}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted block mb-2">
                    Message *
                  </label>
                  <textarea
                    placeholder="Tell me about your project, goals, or challenge…"
                    value={form.message}
                    onChange={set('message')}
                    rows={5}
                    className={`${inputCls} resize-none`}
                    style={{ borderRadius: '2px', height: '120px' }}
                  />
                </div>

                {status === 'error' && (
                  <div
                    className="bg-[rgba(254,84,1,0.1)] border border-[rgba(254,84,1,0.25)] text-orange p-3 text-center text-[0.85rem] mb-4"
                    style={{ borderRadius: '2px' }}
                  >
                    ✗ {feedback}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-clip w-full bg-blue text-white font-mono text-[0.72rem] tracking-[0.1em] uppercase py-3.5 transition-all duration-200 hover:bg-[#0088e0] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderRadius: '2px' }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </RevealWrapper>

        {/* Social Links */}
        <RevealWrapper delay={300}>
          <div className="flex justify-center gap-6 mt-10 pt-8 border-t border-[rgba(1,156,255,0.08)]">
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-muted border-b border-transparent pb-0.5 transition-all duration-200 hover:text-blue hover:border-blue"
            >
              LinkedIn
            </a>
            <a
              href="https://markimist.com"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-muted border-b border-transparent pb-0.5 transition-all duration-200 hover:text-blue hover:border-blue"
            >
              Markimist
            </a>
            <a
              href="https://banglatrack.com"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-muted border-b border-transparent pb-0.5 transition-all duration-200 hover:text-blue hover:border-blue"
            >
              Bangla Track
            </a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
