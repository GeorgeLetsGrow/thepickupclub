'use client';
import React from 'react';
import { POSITIONS, SKILL_LEVELS } from '@/lib/data';
import { PhoneShell, Avatar, Button, Card, Field, Input, Chip } from './PhoneShell';
import { FieldDiagramBoth } from './FieldDiagram';
import { IconBaseball, IconCalendar, IconPin, IconPlus, IconChevR, IconUsers, IconCheck, IconLock } from './Icons';

function SimpleLanding({ theme: t, game, players, onSignUp, onViewField }) {
  const filled = players.length;
  const spotsLeft = game.playerCap - filled;
  return (
    <PhoneShell theme={t} fb>
      <div style={{ padding: '10px 12px 14px', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Avatar name={game.host} color={game.hostAvatar} size={38} />
          <div style={{ fontFamily: t.body }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#050505' }}>{game.host}</div>
            <div style={{ fontSize: 11, color: '#65676b' }}>2h · Pickup game</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#050505', lineHeight: 1.4 }}>Need {spotsLeft} more for Saturday's pickup game! 👇</div>
      </div>
      <div style={{ background: t.bg, paddingTop: 24, paddingBottom: 24 }}>
        <div style={{ margin: '0 14px 20px', padding: '26px 22px', background: t.surface, borderRadius: t.radius * 1.4, border: `1px solid ${t.line}`, textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, padding: '4px 10px', borderRadius: 999, background: t.accent + '18', color: t.accent, fontFamily: t.display, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            <IconBaseball size={12} /> {game.date.split(',')[0]}'s Game
          </div>
          <div style={{ fontFamily: t.display, fontSize: 32, fontWeight: 600, color: t.ink, letterSpacing: -0.5, lineHeight: 1.05, textTransform: 'uppercase', marginBottom: 10 }}>{game.title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', color: t.inkSoft, fontSize: 15, marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IconCalendar size={15} />{game.date} · {game.time}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IconPin size={15} />{game.field}</div>
          </div>
        </div>
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={onSignUp} style={{ width: '100%', padding: '22px 20px', background: t.accent, color: t.accentInk, border: 'none', borderRadius: t.radius * 1.2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', boxShadow: '0 4px 14px rgba(196,48,43,0.25)', fontFamily: t.body }}>
            <div style={{ width: 50, height: 50, borderRadius: 25, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconPlus size={26} stroke={2.5} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: 600, letterSpacing: -0.3, textTransform: 'uppercase', lineHeight: 1 }}>Sign Up</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Add your kid (or yourself) · ${game.cost}</div>
            </div>
            <IconChevR size={22} />
          </button>
          <button onClick={onViewField} style={{ width: '100%', padding: '22px 20px', background: t.surface, color: t.ink, border: `1.5px solid ${t.ink}`, borderRadius: t.radius * 1.2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', fontFamily: t.body }}>
            <div style={{ width: 50, height: 50, borderRadius: 25, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: t.primary }}><IconUsers size={26} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: 600, letterSpacing: -0.3, textTransform: 'uppercase', lineHeight: 1 }}>View Field</div>
              <div style={{ fontSize: 13, color: t.muted, marginTop: 4 }}>See who's playing · {filled}/{game.playerCap} so far</div>
            </div>
            <IconChevR size={22} />
          </button>
        </div>
        <div style={{ margin: '20px 14px 0', padding: '12px 14px', background: t.surfaceAlt, borderRadius: t.radius, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex' }}>
            {players.slice(0, 4).map((p, i) => (<div key={p.id} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar name={p.name} color={p.avatar} size={26} ring={t.surfaceAlt} /></div>))}
          </div>
          <div style={{ fontSize: 12, color: t.inkSoft, lineHeight: 1.35 }}>
            <b style={{ color: t.ink }}>{players[0]?.name.split(' ')[0]}, {players[1]?.name.split(' ')[0]}</b> and {filled - 2} others are in
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function SimpleSignup({ theme: t, game, players, onBack, onDone }) {
  const [form, setForm] = React.useState({ name: '', age: '', phone: '', positions: [], openToOther: true, skill: 'casual', parent: '', waiver: false });
  const MAX_POS = 3;
  const togglePos = (id) => setForm(f => {
    const has = f.positions.includes(id);
    if (has) return { ...f, positions: f.positions.filter(p => p !== id) };
    if (f.positions.length >= MAX_POS) return f;
    return { ...f, positions: [...f.positions, id] };
  });
  const [step, setStep] = React.useState('form');
  const isKid = +form.age > 0 && +form.age < 18;
  const takenIds = new Set(players.map(p => p.position));
  const openPositions = POSITIONS.filter(p => {
    const hTaken = takenIds.has('H-' + p.id);
    const aTaken = takenIds.has('A-' + p.id);
    return !(hTaken && aTaken);
  });
  const canSubmit = form.name && form.age && form.phone && form.positions.length > 0 && form.waiver && (!isKid || form.parent);
  const submit = () => { if (!canSubmit) return; setStep('pay'); setTimeout(() => setStep('done'), 1400); };

  if (step === 'done') {
    return (
      <PhoneShell theme={t} hideStatus={false}>
        <div style={{ paddingTop: 90, textAlign: 'center' }}>
          <div style={{ width: 120, height: 120, borderRadius: 60, margin: '0 auto 22px', background: t.success, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}><IconCheck size={60} stroke={3} /></div>
          <div style={{ fontFamily: t.display, fontSize: 13, letterSpacing: 2.5, textTransform: 'uppercase', color: t.muted, marginBottom: 8 }}>You're in</div>
          <div style={{ fontFamily: t.display, fontSize: 40, fontWeight: 600, letterSpacing: -0.8, color: t.ink, lineHeight: 1.05, marginBottom: 16, textTransform: 'uppercase' }}>See you<br/>Saturday!</div>
          <Card theme={t} pad={18} style={{ textAlign: 'left', marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: t.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Player</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: t.ink, marginBottom: 10 }}>{form.name}</div>
            <div style={{ fontSize: 13, color: t.inkSoft, lineHeight: 1.5 }}>{game.date} · {game.time}<br/>{game.field}</div>
          </Card>
          <Button theme={t} variant="primary" full size="lg">View Field & Roster</Button>
        </div>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell theme={t} title={step === 'pay' ? 'Paying…' : 'Sign Up'} onBack={onBack}>
      <div style={{ paddingTop: 12 }}>
        <div style={{ padding: '12px 14px', background: t.primary, color: t.primaryInk, borderRadius: t.radius, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: t.display, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.7 }}>Signing up for</div>
            <div style={{ fontFamily: t.display, fontSize: 16, fontWeight: 600, letterSpacing: -0.2 }}>{game.title}</div>
          </div>
          <Chip theme={t} tone="accent" size="sm">${game.cost}</Chip>
        </div>
        <Field theme={t} label="Player name"><Input theme={t} value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Full name" /></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10 }}>
          <Field theme={t} label="Age"><Input theme={t} value={form.age} onChange={v => setForm({ ...form, age: v })} placeholder="7" type="number" /></Field>
          <Field theme={t} label="Phone"><Input theme={t} value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="(555) 555-0123" type="tel" /></Field>
        </div>
        {isKid && <Field theme={t} label="Parent/Guardian name"><Input theme={t} value={form.parent} onChange={v => setForm({ ...form, parent: v })} placeholder="Parent's name (required under 18)" /></Field>}
        <Field theme={t} label={<span>Positions they play <span style={{ opacity: 0.6, textTransform: 'none', fontWeight: 400 }}>— pick up to 3</span></span>}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {openPositions.map(pos => {
              const selected = form.positions.includes(pos.id);
              const full = form.positions.length >= MAX_POS && !selected;
              const rank = selected ? form.positions.indexOf(pos.id) + 1 : null;
              return (
                <button key={pos.id} onClick={() => togglePos(pos.id)} disabled={full} style={{ padding: '10px 6px', position: 'relative', background: selected ? t.ink : t.surface, color: selected ? t.bg : t.ink, border: `1px solid ${selected ? t.ink : t.line}`, borderRadius: t.radius, cursor: full ? 'not-allowed' : 'pointer', fontFamily: t.body, fontSize: 12, fontWeight: 600, textAlign: 'center', lineHeight: 1.2, opacity: full ? 0.4 : 1 }}>
                  <div style={{ fontFamily: t.display, fontSize: 15, fontWeight: 600 }}>{pos.short}</div>
                  <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.3, marginTop: 2 }}>{pos.name.split(' ')[0]}</div>
                  {rank && <div style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: 8, background: t.accent, color: t.accentInk, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{rank}</div>}
                </button>
              );
            })}
          </div>
          <div style={{ fontSize: 11, color: t.muted, marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
            <span>Numbers show preference order (1 = top choice)</span>
            <span>{form.positions.length}/{MAX_POS}</span>
          </div>
        </Field>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: t.surfaceAlt, borderRadius: t.radius, cursor: 'pointer', marginBottom: 14 }}>
          <input type="checkbox" checked={form.openToOther} onChange={e => setForm({ ...form, openToOther: e.target.checked })} style={{ width: 18, height: 18, accentColor: t.accent, flexShrink: 0 }} />
          <div style={{ fontSize: 13, color: t.ink, lineHeight: 1.4 }}><b>Open to other positions</b><div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>Coach can swap if needed</div></div>
        </label>
        <Field theme={t} label="Experience">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {SKILL_LEVELS.map(s => (
              <button key={s.id} onClick={() => setForm({ ...form, skill: s.id })} style={{ padding: '8px 4px', background: form.skill === s.id ? t.primary : t.surface, color: form.skill === s.id ? t.primaryInk : t.ink, border: `1px solid ${form.skill === s.id ? t.primary : t.line}`, borderRadius: t.radius, cursor: 'pointer', fontFamily: t.body, fontSize: 11, fontWeight: 600, textAlign: 'center' }}>{s.label}</button>
            ))}
          </div>
        </Field>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: form.waiver ? t.ink + '08' : t.surface, border: `1.5px solid ${form.waiver ? t.ink : t.line}`, borderRadius: t.radius, cursor: 'pointer', marginBottom: 16 }}>
          <input type="checkbox" checked={form.waiver} onChange={e => setForm({ ...form, waiver: e.target.checked })} style={{ width: 20, height: 20, accentColor: t.ink, flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 13, color: t.ink, lineHeight: 1.45 }}>I agree to the <b>liability waiver</b> and understand baseball involves risk of injury.{isKid && <span style={{ color: t.muted, display: 'block', fontSize: 11, marginTop: 2 }}>Parent signs for kids under 18.</span>}</div>
        </label>
        <Button theme={t} variant="accent" full size="lg" onClick={submit} disabled={!canSubmit || step === 'pay'} icon={step === 'pay' ? null : <IconLock size={16} />}>
          {step === 'pay' ? 'Processing…' : `Pay $${game.cost} & Sign Up`}
        </Button>
        <div style={{ textAlign: 'center', fontSize: 11, color: t.muted, marginTop: 10, lineHeight: 1.4 }}>Pay with Apple Pay, card, or Venmo on next tap.<br/>Refundable up to 24hrs before.</div>
      </div>
    </PhoneShell>
  );
}

function SimpleViewField({ theme: t, game, players, onBack, onSignUp }) {
  return (
    <PhoneShell theme={t} title="Field & Roster" onBack={onBack}>
      <div style={{ paddingTop: 14 }}>
        <Card theme={t} pad={14} style={{ marginBottom: 14 }}>
          <FieldDiagramBoth theme={t} players={players} height={320} />
        </Card>
        <div style={{ padding: '12px 14px', background: t.surfaceAlt, borderRadius: t.radius, marginBottom: 14, fontSize: 13, color: t.inkSoft, lineHeight: 1.5 }}>
          <b style={{ color: t.ink }}>{players.length} of {game.playerCap}</b> signed up · <b style={{ color: t.accent }}> {game.playerCap - players.length} spots open</b>
        </div>
        <Button theme={t} variant="accent" full size="lg" onClick={onSignUp} icon={<IconPlus size={18} stroke={2.4} />}>Sign Up — ${game.cost}</Button>
      </div>
    </PhoneShell>
  );
}

export function SimpleFlow({ theme, players, game, initialScreen = 'landing' }) {
  const [screen, setScreen] = React.useState(initialScreen);
  if (screen === 'landing') return <SimpleLanding theme={theme} players={players} game={game} onSignUp={() => setScreen('signup')} onViewField={() => setScreen('view')} />;
  if (screen === 'view') return <SimpleViewField theme={theme} players={players} game={game} onBack={() => setScreen('landing')} onSignUp={() => setScreen('signup')} />;
  if (screen === 'signup') return <SimpleSignup theme={theme} players={players} game={game} onBack={() => setScreen('landing')} onDone={() => setScreen('landing')} />;
  return null;
}
