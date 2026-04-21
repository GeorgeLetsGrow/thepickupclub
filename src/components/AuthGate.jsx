'use client';

import React from 'react';
import { IconBaseball, IconCheck, IconLock, IconPin, IconUser } from '@/components/Icons';

const STORAGE_KEY = 'the-pickup-club:user';
const POSITION_OPTIONS = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF'];

function readStoredUser() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function subscribeToAuthStore(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('pickupclub-auth', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('pickupclub-auth', callback);
  };
}

function BrandMark() {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-navy">
        <IconBaseball size={19} />
      </span>
      <span className="mobile-brand font-display font-bold text-navy uppercase sm:text-base sm:tracking-widest">
        The <span className="text-red">PickUp</span> Club
      </span>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[11px] font-semibold tracking-widest text-muted uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function inputClass(extra = '') {
  return `w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-navy outline-none transition-colors placeholder:text-muted focus:border-navy focus:ring-2 focus:ring-navy/10 ${extra}`;
}

export function AuthGate({ children }) {
  const user = React.useSyncExternalStore(subscribeToAuthStore, readStoredUser, () => null);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [form, setForm] = React.useState({
    name: '',
    contact: '',
    zip: '33534',
    accountType: 'player',
    positions: ['SS'],
  });

  function togglePosition(pos) {
    setForm(prev => {
      const exists = prev.positions.includes(pos);
      const positions = exists
        ? prev.positions.filter(item => item !== pos)
        : [...prev.positions, pos].slice(0, 3);
      return { ...prev, positions };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setStatusMessage('');

    const nextUser = {
      ...form,
      name: form.name.trim(),
      contact: form.contact.trim(),
      zip: form.zip.trim(),
      createdAt: new Date().toISOString(),
    };
    if (!nextUser.name || !nextUser.contact || !nextUser.zip || nextUser.positions.length === 0) {
      setError('Complete the required profile fields before continuing.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextUser),
      });
      const responseText = await response.text();
      let data = {};
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { error: responseText };
        }
      }

      if (!response.ok) {
        throw new Error(data?.error || 'Could not create your account.');
      }

      const savedUser = {
        ...nextUser,
        ...data.user,
        dbPersisted: Boolean(data.persisted),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedUser));
      if (data.message) setStatusMessage(data.message);
      window.dispatchEvent(new Event('pickupclub-auth'));
    } catch (err) {
      setError(err.message || 'Could not create your account.');
    } finally {
      setSubmitting(false);
    }
  }

  if (user) return children;

  return (
    <main className="min-h-screen bg-cream text-navy">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <header className="flex items-center justify-between">
          <BrandMark />
          <span className="hidden items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 font-display text-[11px] font-semibold tracking-widest text-muted uppercase sm:inline-flex">
            <IconLock size={13} /> Account Required
          </span>
        </header>

        <section className="grid flex-1 items-start gap-5 py-5 sm:gap-8 sm:py-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-12">
          <div className="order-2 space-y-4 sm:space-y-6 lg:order-1">
            <div className="max-w-xl">
              <p className="font-display text-xs font-semibold tracking-widest text-red uppercase">
                Pick-up starts with a real roster
              </p>
              <h1 className="mt-2 font-display text-3xl font-black leading-none tracking-wide text-navy uppercase sm:mt-3 sm:text-5xl">
                Create your player profile before joining a game.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-muted sm:mt-4 sm:text-base sm:leading-7">
                The PickUp Club uses signed-in player profiles for registrations, payments, host messages, and cancellation rules.
              </p>
            </div>

            <div className="mobile-slider -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
              {[
                ['Verified roster', 'Hosts know who is showing up.'],
                ['Saved positions', 'Register faster next time.'],
                ['Game messages', 'Keep every host thread in one place.'],
              ].map(([title, copy]) => (
                <div key={title} className="mobile-card w-[78%] shrink-0 rounded-xl border border-line bg-white p-4 sm:w-auto">
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-green/10 text-green">
                    <IconCheck size={15} />
                  </span>
                  <h2 className="font-display text-sm font-bold tracking-wider text-navy uppercase">{title}</h2>
                  <p className="mt-1 text-sm leading-5 text-muted">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mobile-card order-1 rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-6 lg:order-2">
            <div className="mb-4 flex items-start justify-between gap-4 sm:mb-5">
              <div>
                <p className="font-display text-[11px] font-semibold tracking-widest text-red uppercase">
                  Player Sign Up
                </p>
                <h2 className="mt-1 font-display text-xl font-black tracking-wide text-navy uppercase sm:text-2xl">
                  Join The PickUp Club
                </h2>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-navy">
                <IconUser size={20} />
              </span>
            </div>

            <div className="space-y-3.5 sm:space-y-4">
              <Field label="Full name">
                <input
                  className={inputClass()}
                  value={form.name}
                  onChange={event => setForm(prev => ({ ...prev, name: event.target.value }))}
                  placeholder="Jamie Rodriguez"
                  autoComplete="name"
                  required
                />
              </Field>

              <Field label="Email or phone">
                <input
                  className={inputClass()}
                  value={form.contact}
                  onChange={event => setForm(prev => ({ ...prev, contact: event.target.value }))}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-[1fr_1.25fr]">
                <Field label="Home ZIP">
                  <div className="relative">
                    <IconPin size={15} style={{ position: 'absolute', left: 14, top: 16, color: '#8a8178' }} />
                    <input
                      className={inputClass('pl-10')}
                      value={form.zip}
                      onChange={event => setForm(prev => ({ ...prev, zip: event.target.value }))}
                      placeholder="33534"
                      inputMode="numeric"
                      required
                    />
                  </div>
                </Field>

              <Field label="Signing up as">
                <div className="grid grid-cols-2 rounded-xl border border-line bg-cream p-1">
                    {[
                      ['player', 'Player'],
                      ['host', 'Player + Host'],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, accountType: value }))}
                        className={`min-h-11 rounded-lg px-3 py-2 font-display text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                          form.accountType === value ? 'bg-navy text-white shadow-sm' : 'text-muted hover:text-navy'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field label="Primary positions, up to 3">
                <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-9">
                  {POSITION_OPTIONS.map(pos => {
                    const active = form.positions.includes(pos);
                    return (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => togglePosition(pos)}
                        className={`min-h-11 rounded-lg border font-display text-[11px] font-bold tracking-wide transition-colors sm:aspect-square sm:min-h-0 ${
                          active
                            ? 'border-navy bg-navy text-white'
                            : 'border-line bg-cream text-muted hover:text-navy'
                        }`}
                      >
                        {pos}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red px-5 py-3.5 font-display text-sm font-bold tracking-widest text-white uppercase shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Creating Account...' : 'Create Account'} <IconCheck size={16} />
              </button>

              {error && (
                <p className="rounded-xl border border-red/30 bg-red/5 px-3 py-2 text-sm leading-5 text-red">
                  {error}
                </p>
              )}

              {statusMessage && (
                <p className="rounded-xl border border-sand bg-cream px-3 py-2 text-sm leading-5 text-muted">
                  {statusMessage}
                </p>
              )}

              <p className="text-center text-xs leading-5 text-muted">
                Your profile is saved securely when a database is configured, and mirrored on this device for the prototype.
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
