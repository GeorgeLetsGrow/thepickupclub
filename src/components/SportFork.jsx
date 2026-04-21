'use client';
import React from 'react';
import { PhoneShell, Button, Card, Field } from './PhoneShell';
import { IconUsers, IconPin, IconCheck, IconChevR } from './Icons';
import { IOSStatusBar } from './IOSFrame';

function ToggleRow({ t, on, onToggle, label, sub }) {
  return (
    <div onClick={onToggle} style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: t.radius, padding: 12, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{label}</div>
        <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ width: 40, height: 24, borderRadius: 12, background: on ? t.success : t.line, position: 'relative', transition: 'background 0.15s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 20, height: 20, borderRadius: 10, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.15s' }} />
      </div>
    </div>
  );
}

export function SportForkScreen({ theme: t, onPick, onBack }) {
  const options = [
    { id: 'baseball',      label: 'Baseball',   sub: 'Hardball · standard rules',        icon: '⚾', bg: t.primary, ink: t.primaryInk, tag: 'CLASSIC' },
    { id: 'softball-slow', label: 'Softball',   sub: 'Slow-pitch · recreational',        icon: '🥎', bg: t.accent,  ink: t.accentInk,  tag: 'SOCIAL' },
    { id: 'softball-fast', label: 'Fastpitch',  sub: 'Softball · competitive fast-pitch',icon: '🥎', bg: t.ink,     ink: t.bg,         tag: 'COMPETITIVE' },
    { id: 'tball',         label: 'T-Ball / Coach', sub: 'Little kids · ages 4–7',       icon: '⚾', bg: t.success, ink: '#fff',       tag: 'KIDS' },
    { id: 'wiffle',        label: 'Wiffleball', sub: 'Backyard · chill · no gloves',     icon: '⚾', bg: t.warn,    ink: '#fff',       tag: 'CASUAL' },
  ];
  return (
    <PhoneShell theme={t} title="New Game · 1 of 4" onBack={onBack}>
      <div style={{ paddingTop: 10 }}>
        <div style={{ fontFamily: t.display, fontSize: 26, fontWeight: 600, letterSpacing: -0.4, textTransform: 'uppercase', lineHeight: 1.05, color: t.ink, marginBottom: 6 }}>What kind of<br />game is it?</div>
        <div style={{ fontSize: 13, color: t.inkSoft, marginBottom: 18, lineHeight: 1.4 }}>This sets the rules, equipment and suggested roster size.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {options.map(o => (
            <button key={o.id} onClick={() => onPick(o.id)} style={{ padding: 0, border: `1px solid ${t.line}`, background: t.surface, borderRadius: t.radius, cursor: 'pointer', overflow: 'hidden', textAlign: 'left', display: 'flex', alignItems: 'stretch' }}>
              <div style={{ width: 74, background: o.bg, color: o.ink, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, position: 'relative' }}>
                <div style={{ fontSize: 30 }}>{o.icon}</div>
                <div style={{ fontFamily: t.display, fontSize: 8, letterSpacing: 1, fontWeight: 700, opacity: 0.8 }}>{o.tag}</div>
              </div>
              <div style={{ flex: 1, padding: '12px 14px' }}>
                <div style={{ fontFamily: t.display, fontSize: 17, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.2, color: t.ink }}>{o.label}</div>
                <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 2 }}>{o.sub}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: 14, color: t.muted }}><IconChevR size={18} /></div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 11, color: t.muted, textAlign: 'center', lineHeight: 1.5 }}>You can tweak specifics (innings, pitch count, etc) after.</div>
      </div>
    </PhoneShell>
  );
}

export function AgeLimitScreen({ theme: t, sport, onBack, onNext }) {
  const presets = [
    { id: 'open',    label: 'Open / All Ages',   min: null, max: null, sub: 'Anyone can sign up' },
    { id: 'adults',  label: 'Adults Only (18+)', min: 18,   max: null, sub: 'Rec leagues, beer-league' },
    { id: 'kids79',  label: 'Kids · Ages 7–9',   min: 7,    max: 9,    sub: 'Little-league style' },
    { id: 'kids1012',label: 'Kids · Ages 10–12', min: 10,   max: 12,   sub: 'Upper little-league' },
    { id: 'teens',   label: 'Teens · 13–17',     min: 13,   max: 17,   sub: 'High-school / JV' },
    { id: 'custom',  label: 'Custom range…',     min: null, max: null, sub: 'Set your own limits' },
  ];
  const [pick, setPick] = React.useState(sport === 'tball' ? 'kids79' : 'open');
  const [min, setMin] = React.useState(7);
  const [max, setMax] = React.useState(50);
  const [requireParent, setRequireParent] = React.useState(sport === 'tball');
  const [requireWaiver, setRequireWaiver] = React.useState(true);

  const preset = presets.find(p => p.id === pick);
  const rangeLabel = pick === 'open' ? 'All ages welcome' : pick === 'custom' ? `Ages ${min}–${max}` : preset.max ? `Ages ${preset.min}–${preset.max}` : `${preset.min}+ only`;

  return (
    <PhoneShell theme={t} title="New Game · 2 of 4" onBack={onBack}>
      <div style={{ paddingTop: 10 }}>
        <div style={{ fontFamily: t.display, fontSize: 26, fontWeight: 600, letterSpacing: -0.4, textTransform: 'uppercase', lineHeight: 1.05, color: t.ink, marginBottom: 6 }}>Who can<br />play?</div>
        <div style={{ fontSize: 13, color: t.inkSoft, marginBottom: 16, lineHeight: 1.4 }}>Signups outside this range will be blocked.</div>
        <Card theme={t} pad={12} style={{ background: t.surfaceAlt, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: t.ink, color: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconUsers size={20} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>Age eligibility</div>
              <div style={{ fontFamily: t.display, fontSize: 16, fontWeight: 600, color: t.ink }}>{rangeLabel}</div>
            </div>
          </div>
        </Card>
        <Field theme={t} label="Preset">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {presets.map(p => (
              <button key={p.id} onClick={() => setPick(p.id)} style={{ padding: '10px 12px', textAlign: 'left', cursor: 'pointer', background: pick === p.id ? t.ink : t.surface, color: pick === p.id ? t.bg : t.ink, border: `1px solid ${pick === p.id ? t.ink : t.line}`, borderRadius: t.radius }}>
                <div style={{ fontFamily: t.display, fontSize: 13, fontWeight: 600, textTransform: 'uppercase' }}>{p.label}</div>
                <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{p.sub}</div>
              </button>
            ))}
          </div>
        </Field>
        {pick === 'custom' && (
          <Card theme={t} pad={14} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div><div style={{ fontSize: 10, color: t.muted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Min</div><div style={{ fontFamily: t.display, fontSize: 22, fontWeight: 600, color: t.ink }}>{min}</div></div>
              <div style={{ textAlign: 'right' }}><div style={{ fontSize: 10, color: t.muted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Max</div><div style={{ fontFamily: t.display, fontSize: 22, fontWeight: 600, color: t.ink }}>{max}</div></div>
            </div>
            <input type="range" min={4} max={80} value={min} onChange={e => setMin(Math.min(+e.target.value, max - 1))} style={{ width: '100%', accentColor: t.accent }} />
            <input type="range" min={4} max={80} value={max} onChange={e => setMax(Math.max(+e.target.value, min + 1))} style={{ width: '100%', accentColor: t.accent, marginTop: 6 }} />
          </Card>
        )}
        <Field theme={t} label="Required for minors">
          <ToggleRow t={t} on={requireParent} onToggle={() => setRequireParent(!requireParent)} label="Parent/Guardian signature" sub="Under-18 signups need a parent phone + consent" />
          <ToggleRow t={t} on={requireWaiver} onToggle={() => setRequireWaiver(!requireWaiver)} label="Liability waiver" sub="Standard release of liability language" />
        </Field>
        <Button theme={t} variant="accent" full size="lg" onClick={() => onNext({ pick, min, max, requireParent, requireWaiver })}>Continue</Button>
      </div>
    </PhoneShell>
  );
}

export function LocationPermissionScreen({ theme: t }) {
  return (
    <div style={{ width: 402, height: 874, borderRadius: 48, overflow: 'hidden', position: 'relative', background: t.bg, boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)', fontFamily: t.body, color: t.ink, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar dark={t.bg === '#0f1419'} /></div>
      <div style={{ flex: 1, paddingTop: 80, padding: '80px 24px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 120, height: 120, borderRadius: 60, background: t.accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: t.accent, position: 'relative' }}>
            <IconPin size={54} stroke={1.6} />
            <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: 80, border: `1px solid ${t.accent}44` }} />
            <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100, border: `1px solid ${t.accent}22` }} />
          </div>
          <div style={{ fontFamily: t.display, fontSize: 30, fontWeight: 600, letterSpacing: -0.5, textTransform: 'uppercase', lineHeight: 1.05, color: t.ink, marginBottom: 10 }}>Find games<br />near you.</div>
          <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.5, maxWidth: 300 }}>Share your location so we can show pickup games at fields within your driving distance. We never post your location publicly.</div>
          <div style={{ marginTop: 24, display: 'flex', gap: 6 }}>
            {[{mi:5,n:3},{mi:10,n:7,active:true},{mi:25,n:14},{mi:50,n:22}].map(r => (
              <div key={r.mi} style={{ padding: '10px 14px', borderRadius: t.radius, background: r.active ? t.ink : t.surface, color: r.active ? t.bg : t.ink, border: `1px solid ${r.active ? t.ink : t.line}`, textAlign: 'center' }}>
                <div style={{ fontFamily: t.display, fontSize: 14, fontWeight: 600 }}>{r.mi} mi</div>
                <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{r.n} games</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
          <Button theme={t} variant="accent" full size="lg" icon={<IconPin size={18} />}>Allow Location</Button>
          <Button theme={t} variant="ghost" full size="sm" style={{ color: t.muted }}>Enter ZIP code manually</Button>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60, height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 8, pointerEvents: 'none' }}>
        <div style={{ width: 139, height: 5, borderRadius: 100, background: t.bg === '#0f1419' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)' }} />
      </div>
    </div>
  );
}
