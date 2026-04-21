'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  IconBaseball, IconBack, IconChevR,
  IconCalendar, IconClock, IconPin, IconUsers, IconDollar,
  IconCheck, IconShield,
} from '@/components/Icons';

// ─── Sport options ────────────────────────────────────────────────────────────
const SPORTS = [
  { id: 'baseball',  label: 'Baseball',        desc: 'Hardball · standard rules',     swatch: 'bg-navy',       short: 'BB' },
  { id: 'softball',  label: 'Softball',         desc: 'Slow-pitch · recreational',     swatch: 'bg-red',        short: 'SB' },
  { id: 'fastpitch', label: 'Fastpitch',        desc: 'Softball · competitive',        swatch: 'bg-[#4a7c59]', short: 'FP' },
  { id: 'tball',     label: 'T-Ball / Coach',   desc: 'Little kids · ages 4-7',        swatch: 'bg-[#8b6f47]', short: 'TB', impliedAge: 'kids' },
  { id: 'wiffle',    label: 'Wiffle Ball',      desc: 'Backyard · chill',              swatch: 'bg-[#6b5b8e]', short: 'WB' },
];

// ─── Age options ──────────────────────────────────────────────────────────────
const AGE_OPTIONS = [
  { id: '18plus', label: '18+ Adults only',        desc: 'No minors on the field' },
  { id: 'allages', label: 'All ages',               desc: 'Families welcome' },
  { id: 'kids',   label: 'Kids only (under 13)',   desc: 'Youth game' },
];

// Fields are approved separately by the platform/league. Hosts can only pick
// approved fields that have available inventory for the selected game type.
const APPROVED_FIELDS = [
  {
    id: 'bullfrog-d1',
    name: 'Bullfrog Creek Park - Diamond 1',
    address: '13012 Bullfrog Creek Rd, Gibsonton, FL 33534',
    distance: '0.0 mi',
    sports: ['baseball', 'softball', 'fastpitch', 'tball'],
    availability: 'available',
    slot: 'Open after 8:00 AM',
  },
  {
    id: 'bullfrog-d2',
    name: 'Bullfrog Creek Park - Field 2',
    address: '13012 Bullfrog Creek Rd, Gibsonton, FL 33534',
    distance: '0.4 mi',
    sports: ['baseball', 'softball', 'fastpitch'],
    availability: 'available',
    slot: 'Open after 5:00 PM',
  },
  {
    id: 'gibsonton-youth',
    name: 'Gibsonton Youth Baseball',
    address: 'Gibsonton, FL 33534',
    distance: '1.6 mi',
    sports: ['tball', 'baseball'],
    availability: 'available',
    slot: 'Youth fields verified',
  },
  {
    id: 'south-shore',
    name: 'South Shore Sports Complex',
    address: 'Apollo Beach, FL',
    distance: '4.8 mi',
    sports: ['baseball', 'softball'],
    availability: 'pending',
    slot: 'Awaiting permit window',
  },
];

// ─── Input + Label components ─────────────────────────────────────────────────
function Label({ children }) {
  return (
    <label className="font-display text-xs tracking-widest uppercase text-muted mb-1 block">
      {children}
    </label>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
          {icon}
        </span>
      )}
      <input
        className={`w-full bg-white border border-line rounded-xl py-3 text-sm text-navy placeholder:text-muted focus:border-navy outline-none transition-colors ${icon ? 'pl-9 pr-4' : 'px-4'}`}
        {...props}
      />
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function StepBar({ current, total }) {
  return (
    <div className="flex gap-1.5 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1 rounded-full transition-colors ${i < current ? 'bg-red' : 'bg-line'}`}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CreateGamePage() {
  const router = useRouter();

  const [step, setStep]   = React.useState(1); // 1=sport, 2=age, 3=details
  const [sport, setSport] = React.useState('');
  const [age, setAge]     = React.useState('');
  const [selectedFieldId, setSelectedFieldId] = React.useState('');
  const [draft, setDraft] = React.useState({
    title: '', date: '', time: '', endTime: '',
    field: '', address: '', cost: 10, cap: 18, notes: '',
  });

  function handleBack() {
    if (step === 1) router.push('/host');
    else if (step === 3 && selectedSport?.impliedAge) setStep(1);
    else setStep(s => s - 1);
  }

  function chooseSport(option) {
    setSport(option.id);
    setSelectedFieldId('');
    setDraft(d => ({ ...d, field: '', address: '' }));
    if (option.impliedAge) {
      setAge(option.impliedAge);
      setStep(3);
      return;
    }
    setAge('');
    setStep(2);
  }

  function setField(key, value) {
    setDraft(d => ({ ...d, [key]: value }));
    if (key === 'date' || key === 'time') {
      setSelectedFieldId('');
      setDraft(d => ({ ...d, field: '', address: '' }));
    }
  }

  function chooseField(field) {
    if (field.availability !== 'available') return;
    setSelectedFieldId(field.id);
    setDraft(d => ({ ...d, field: field.name, address: field.address }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.push('/host');
  }

  const selectedSport = SPORTS.find(s => s.id === sport);
  const stepLabels = selectedSport?.impliedAge
    ? ['Sport', 'Game Details']
    : ['Sport', 'Age & Safety', 'Game Details'];
  const visibleStep = selectedSport?.impliedAge && step === 3 ? 2 : step;
  const totalSteps = selectedSport?.impliedAge ? 2 : 3;
  const title = selectedSport?.impliedAge && step === 3 ? 'Game Details' : stepLabels[visibleStep - 1];
  const matchingFields = APPROVED_FIELDS.filter(field => !sport || field.sports.includes(sport));
  const canChooseField = Boolean(draft.date && draft.time);

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-line px-4 py-3 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-cream transition-colors text-navy"
          aria-label="Back"
        >
          <IconBack size={20} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="font-display text-xs tracking-widest uppercase text-muted leading-none mb-0.5">
            New Game · Step {visibleStep} of {totalSteps}
          </div>
          <div className="font-display text-sm font-semibold tracking-wide text-navy uppercase truncate">
            {title}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <IconBaseball size={16} className="text-muted" />
          <span className="font-display text-xs tracking-widest text-muted uppercase hidden sm:block">
            The PickUp Club
          </span>
        </div>
      </header>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <StepBar current={visibleStep} total={totalSteps} />

        {/* ════════════════════════════════════════════════════════
            STEP 1 — Sport selection
        ════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <div>
            <h1 className="font-display text-2xl font-bold tracking-wider text-navy uppercase mb-1">
              What kind of game is it?
            </h1>
            <p className="text-sm text-muted mb-6">
              Choose a sport to configure the right settings.
            </p>

            <ul className="space-y-3">
              {SPORTS.map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => chooseSport(s)}
                    className={`w-full flex items-stretch rounded-xl border overflow-hidden transition-all hover:shadow-md text-left ${sport === s.id ? 'border-navy shadow-md' : 'border-line bg-white'}`}
                  >
                    {/* Sport icon */}
                    <div className={`${s.swatch} flex w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-l-xl text-white`}>
                      <IconBaseball size={22} style={{ color: '#fff' }} />
                      <span className="font-display text-[9px] font-bold tracking-widest">{s.short}</span>
                    </div>
                    {/* Text */}
                    <div className="flex-1 px-4 py-3.5 bg-white">
                      <div className="font-display text-sm font-semibold tracking-wide text-navy uppercase">
                        {s.label}
                      </div>
                      <div className="text-xs text-muted mt-0.5">{s.desc}</div>
                    </div>
                    {/* Chevron */}
                    <div className="flex items-center pr-4 bg-white text-muted">
                      <IconChevR size={18} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════
            STEP 2 — Age & safety
        ════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div>
            <h1 className="font-display text-2xl font-bold tracking-wider text-navy uppercase mb-1">
              Age & Safety Settings
            </h1>
            <p className="text-sm text-muted mb-6">
              Who is this game open to?
            </p>

            <ul className="space-y-3 mb-8">
              {AGE_OPTIONS.map(opt => (
                <li key={opt.id}>
                  <button
                    onClick={() => setAge(opt.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border bg-white transition-all text-left ${age === opt.id ? 'border-navy shadow-sm' : 'border-line hover:border-navy/30'}`}
                  >
                    {/* Radio circle */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${age === opt.id ? 'border-navy' : 'border-line'}`}>
                      {age === opt.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-navy" />
                      )}
                    </div>
                    <div>
                      <div className="font-display text-sm font-semibold tracking-wide text-navy uppercase">
                        {opt.label}
                      </div>
                      <div className="text-xs text-muted mt-0.5">{opt.desc}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setStep(3)}
              disabled={!age}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red text-white rounded-xl font-display text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next: Game Details <IconChevR size={16} />
            </button>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════
            STEP 3 — Game details form
        ════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h1 className="font-display text-2xl font-bold tracking-wider text-navy uppercase mb-1">
              Game Details
            </h1>
            <p className="text-sm text-muted mb-6">
              Fill in the info your players will see.
            </p>
            {selectedSport?.impliedAge && (
              <div className="mb-5 rounded-xl border border-line bg-white px-4 py-3 text-sm text-muted">
                <span className="font-display text-[11px] font-semibold tracking-widest text-navy uppercase">
                  {selectedSport.label}
                </span>
                <span className="ml-2">
                  is set as a kids-only game automatically.
                </span>
              </div>
            )}

            <div className="space-y-4">
              {/* Title */}
              <div>
                <Label>Game Title</Label>
                <Input
                  type="text"
                  placeholder="e.g. Saturday Morning Scrimmage"
                  value={draft.title}
                  onChange={e => setField('title', e.target.value)}
                  required
                />
              </div>

              {/* Date */}
              <div>
                <Label><span className="inline-flex items-center gap-1"><IconCalendar size={12} /> Date</span></Label>
                <Input
                  type="date"
                  value={draft.date}
                  onChange={e => setField('date', e.target.value)}
                  required
                />
              </div>

              {/* Start / End time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label><span className="inline-flex items-center gap-1"><IconClock size={12} /> Start Time</span></Label>
                  <Input
                    type="time"
                    value={draft.time}
                    onChange={e => setField('time', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={draft.endTime}
                    onChange={e => setField('endTime', e.target.value)}
                  />
                </div>
              </div>

              {/* Approved field selector */}
              <div>
                <Label><span className="inline-flex items-center gap-1"><IconPin size={12} /> Approved Field</span></Label>
                <div className="rounded-xl border border-line bg-white p-3">
                  <div className="mb-3 flex items-start gap-2 rounded-lg bg-cream px-3 py-2 text-xs text-muted">
                    <IconShield size={14} />
                    <span>
                      Fields are registered and approved separately. Only approved fields with available time windows can be selected here.
                    </span>
                  </div>
                  {!canChooseField && (
                    <div className="rounded-lg border border-line px-3 py-2 text-sm text-muted">
                      Choose a date and start time to check field availability.
                    </div>
                  )}
                  {canChooseField && (
                    <div className="space-y-2">
                      {matchingFields.map(field => {
                        const selected = selectedFieldId === field.id;
                        const available = field.availability === 'available';
                        return (
                          <button
                            key={field.id}
                            type="button"
                            disabled={!available}
                            onClick={() => chooseField(field)}
                            className={`w-full rounded-xl border px-3 py-3 text-left transition-all ${
                              selected
                                ? 'border-navy bg-cream shadow-sm'
                                : available
                                  ? 'border-line hover:border-navy/40'
                                  : 'border-line bg-cream/60 opacity-60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-display text-sm font-semibold tracking-wide text-navy uppercase">
                                    {field.name}
                                  </span>
                                  {selected && <IconCheck size={14} style={{ color: '#4a7c59' }} />}
                                </div>
                                <div className="mt-0.5 text-xs text-muted">{field.address}</div>
                              </div>
                              <span className="shrink-0 text-xs text-muted">{field.distance}</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-3">
                              <span className="text-xs text-muted">{field.slot}</span>
                              <span className={`rounded-full px-2 py-0.5 font-display text-[9px] font-semibold tracking-widest uppercase ${
                                available ? 'bg-green text-white' : 'bg-line text-muted'
                              }`}>
                                {available ? 'Available' : 'Pending'}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <button
                    type="button"
                    className="mt-3 w-full rounded-xl border border-dashed border-line px-3 py-2.5 font-display text-[11px] font-semibold tracking-widest text-muted uppercase transition-colors hover:border-navy hover:text-navy"
                  >
                    Request approval for another field
                  </button>
                </div>
              </div>

              {/* Cost + Cap */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label><span className="inline-flex items-center gap-1"><IconDollar size={12} /> Cost per Player ($)</span></Label>
                  <Input
                    type="number"
                    min="0"
                    value={draft.cost}
                    onChange={e => setField('cost', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label><span className="inline-flex items-center gap-1"><IconUsers size={12} /> Max Players</span></Label>
                  <Input
                    type="number"
                    min="2"
                    max="50"
                    value={draft.cap}
                    onChange={e => setField('cap', Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label>Notes for Players <span className="normal-case font-sans tracking-normal text-muted">(optional)</span></Label>
                <textarea
                  rows={3}
                  placeholder="Bring your own glove. Balls + bases provided…"
                  value={draft.notes}
                  onChange={e => setField('notes', e.target.value)}
                  className="w-full bg-white border border-line rounded-xl px-4 py-3 text-sm text-navy placeholder:text-muted focus:border-navy outline-none resize-none transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full py-4 bg-red text-white rounded-xl font-display text-sm tracking-widest uppercase hover:opacity-90 transition-opacity shadow-sm"
            >
              Create Game &amp; Get Share Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
