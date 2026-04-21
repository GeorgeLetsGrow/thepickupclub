'use client';
import React from 'react';
import { ALL_POSITIONS, SKILL_LEVELS } from '@/lib/data';
import { PhoneShell, Avatar, Button, Card, Field, Input, Chip } from './PhoneShell';
import { FieldDiagram, FieldDiagramBoth } from './FieldDiagram';
import { IconBaseball, IconCalendar, IconPin, IconSun, IconCheck, IconShield, IconLock, IconClock } from './Icons';

export function SignupFlow({ theme, players: initialPlayers, game, initialScreen = 'landing', onOpenOrganizer, onBack, initialPos, initialForm }) {
  const t = theme;
  const [screen, setScreen] = React.useState(initialScreen);
  const [players, setPlayers] = React.useState(initialPlayers);
  const defaultPos = initialPos || ALL_POSITIONS.find(p => !initialPlayers.some(pl => pl.position === p.id)) || ALL_POSITIONS[0];
  const [selectedPos, setSelectedPos] = React.useState(defaultPos);
  const [form, setForm] = React.useState(initialForm || { name: 'Alex Morgan', phone: '(555) 867-5309', age: '32', skill: 'casual', waiver: initialScreen === 'payment' || initialScreen === 'confirmed' });

  const filledCount = players.length;
  const capacity = game.playerCap;

  const selectPos = (pos) => {
    const taken = players.find(p => p.position === pos.id);
    if (taken) return;
    setSelectedPos(pos);
    setScreen('info');
  };

  const submit = () => {
    const newPlayer = {
      id: 'p' + Date.now(), name: form.name || 'You', age: +form.age || 30,
      skill: form.skill, position: selectedPos.id, paid: true,
      avatar: t.accent, joinedMinutesAgo: 0,
    };
    setPlayers([...players, newPlayer]);
    setScreen('confirmed');
  };

  if (screen === 'landing') return <SU_Landing theme={t} game={game} players={players} onJoin={() => setScreen('position')} onOpenOrganizer={onOpenOrganizer} onBack={onBack} />;
  if (screen === 'position') return <SU_Position theme={t} game={game} players={players} onBack={() => setScreen('landing')} onPick={selectPos} />;
  if (screen === 'info') return <SU_Info theme={t} game={game} form={form} setForm={setForm} pos={selectedPos} onBack={() => setScreen('position')} onNext={() => setScreen('waiver')} />;
  if (screen === 'waiver') return <SU_Waiver theme={t} game={game} form={form} setForm={setForm} onBack={() => setScreen('info')} onNext={() => setScreen('payment')} />;
  if (screen === 'payment') return <SU_Payment theme={t} game={game} pos={selectedPos} form={form} onBack={() => setScreen('waiver')} onPay={submit} />;
  if (screen === 'confirmed') return <SU_Confirmed theme={t} game={game} pos={selectedPos} players={players} onView={() => setScreen('roster')} />;
  if (screen === 'roster') return <SU_Roster theme={t} game={game} players={players} onBack={() => setScreen('confirmed')} />;
  return null;
}

function SU_Landing({ theme: t, game, players, onJoin, onOpenOrganizer, onBack }) {
  const filled = players.length;
  const spotsLeft = game.playerCap - filled;

  return (
    <PhoneShell theme={t} fb onBack={onBack}>
      <div style={{ padding: '10px 12px 14px', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Avatar name={game.host} color={game.hostAvatar} size={40} />
          <div style={{ fontFamily: t.body }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#050505' }}>{game.host}</div>
            <div style={{ fontSize: 12, color: '#65676b' }}>2h · Shared a pickup game</div>
          </div>
        </div>
        <div style={{ fontSize: 14, color: '#050505', marginBottom: 10, lineHeight: 1.4 }}>
          Need 7 more for Saturday's scrimmage at Bullfrog Creek! Grab a spot
        </div>
      </div>

      <div style={{ background: t.bg, paddingBottom: 24 }}>
        <div style={{ margin: '0 12px', background: t.surface, borderRadius: t.radius, overflow: 'hidden', border: `1px solid ${t.line}`, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ background: t.primary, color: t.primaryInk, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconBaseball size={18} />
              <div style={{ fontFamily: t.display, fontSize: 14, letterSpacing: 1.5, textTransform: 'uppercase' }}>TheBaseballClub</div>
            </div>
            <Chip theme={t} tone="accent" size="sm">${game.cost}</Chip>
          </div>

          <div style={{ padding: '18px 18px 14px' }}>
            <div style={{ fontFamily: t.display, fontSize: 26, fontWeight: 600, lineHeight: 1.1, color: t.ink, textTransform: 'uppercase', letterSpacing: -0.3, marginBottom: 8 }}>{game.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: t.inkSoft, fontSize: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><IconCalendar size={15} />{game.date} · {game.time}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><IconPin size={15} />{game.field}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><IconSun size={15} style={{ color: t.warn }} />{game.weather.temp}° {game.weather.condition} · {game.weather.chanceRain}% rain</div>
            </div>
          </div>

          <div style={{ padding: '4px 12px 12px' }}>
            <FieldDiagram theme={t} players={players} height={200} />
          </div>

          <div style={{ padding: '14px 18px', background: t.surfaceAlt, borderTop: `1px solid ${t.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: t.display, fontSize: 32, fontWeight: 600, color: t.ink, lineHeight: 1 }}>
                {filled}<span style={{ color: t.muted, fontSize: 20 }}>/{game.playerCap}</span>
              </div>
              <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>
                {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Waitlist only'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: -6 }}>
              {players.slice(0, 5).map((p, i) => (
                <div key={p.id} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                  <Avatar name={p.name} color={p.avatar} size={28} ring={t.surfaceAlt} />
                </div>
              ))}
              {players.length > 5 && (
                <div style={{ marginLeft: -8, width: 28, height: 28, borderRadius: 14, background: t.ink, color: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, boxShadow: `0 0 0 2px ${t.surfaceAlt}` }}>+{players.length - 5}</div>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: '18px 12px 0' }}>
          <Button theme={t} variant="accent" full size="lg" onClick={onJoin} icon={<IconBaseball size={18} />}>
            Claim My Spot
          </Button>
          <div style={{ textAlign: 'center', fontSize: 12, color: t.muted, marginTop: 10 }}>
            Pick your position · Pay ${game.cost} · You're in
          </div>
        </div>

        <div style={{ padding: '20px 12px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: t.muted, marginBottom: 8 }}>Note from {game.host.split(' ')[0]}</div>
          <Card theme={t} style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.5 }}>{game.notes}</Card>
        </div>

        {onOpenOrganizer && (
          <div style={{ padding: '16px 12px 0', textAlign: 'center' }}>
            <button onClick={onOpenOrganizer} style={{ background: 'transparent', border: 'none', color: t.muted, fontSize: 12, fontFamily: t.body, cursor: 'pointer', textDecoration: 'underline' }}>I'm the host → open organizer view</button>
          </div>
        )}
      </div>
    </PhoneShell>
  );
}

function SU_Position({ theme: t, game, players, onBack, onPick }) {
  const [tab, setTab] = React.useState('home');
  const filteredPos = ALL_POSITIONS.filter(p => p.team === tab);
  const filledBy = {};
  players.forEach(pl => { filledBy[pl.position] = pl; });

  return (
    <PhoneShell theme={t} title="Pick Position" onBack={onBack}>
      <div style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: t.radius, padding: 4, border: `1px solid ${t.line}`, marginBottom: 16 }}>
          {['home', 'away'].map(team => (
            <button key={team} onClick={() => setTab(team)} style={{
              flex: 1, padding: '10px', border: 'none', cursor: 'pointer',
              background: tab === team ? t.primary : 'transparent',
              color: tab === team ? t.primaryInk : t.inkSoft,
              fontFamily: t.display, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase',
              fontWeight: 500, borderRadius: t.radius - 2,
            }}>
              {team} · {players.filter(p => p.position.startsWith(team === 'home' ? 'H-' : 'A-')).length}/9
            </button>
          ))}
        </div>

        <div style={{ background: t.surface, borderRadius: t.radius, border: `1px solid ${t.line}`, padding: 12, marginBottom: 16 }}>
          <FieldDiagram theme={t} players={players.filter(p => p.position.startsWith(tab === 'home' ? 'H-' : 'A-'))} team={tab} onClickPos={onPick} height={260} />
          <div style={{ fontSize: 11, color: t.muted, textAlign: 'center', marginTop: 8 }}>Tap a position to claim it</div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: t.muted, marginBottom: 8 }}>All Positions · {tab}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {filteredPos.map(pos => {
            const filled = filledBy[pos.id];
            return (
              <button key={pos.id} disabled={!!filled} onClick={() => onPick(pos)} style={{
                background: filled ? t.surfaceAlt : t.surface,
                border: `1px solid ${filled ? t.line : t.ink}`,
                borderRadius: t.radius, padding: '10px 12px', textAlign: 'left',
                cursor: filled ? 'not-allowed' : 'pointer', fontFamily: t.body,
                opacity: filled ? 0.55 : 1, display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: filled ? filled.avatar : t.primary, color: '#fff', fontFamily: t.display, fontWeight: 600, fontSize: 11, letterSpacing: 0.5, flexShrink: 0 }}>
                  {filled ? filled.name.split(' ').map(n => n[0]).join('').slice(0,2) : pos.short.replace(/^[HA]-/, '')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{pos.name}</div>
                  <div style={{ fontSize: 11, color: t.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{filled ? filled.name : 'Open'}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </PhoneShell>
  );
}

function SU_Info({ theme: t, pos, form, setForm, onBack, onNext }) {
  const valid = form.name && form.phone && form.age;
  return (
    <PhoneShell theme={t} title="Your Info" onBack={onBack}>
      <div style={{ paddingTop: 16 }}>
        <Card theme={t} style={{ background: t.primary, color: t.primaryInk, marginBottom: 20, borderColor: t.primary, padding: '14px 16px' }}>
          <div style={{ fontFamily: t.display, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.7, marginBottom: 4 }}>Reserving</div>
          <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: 600, letterSpacing: -0.3 }}>{pos.name} · {pos.team === 'home' ? 'Home' : 'Away'}</div>
        </Card>
        <Field theme={t} label="Your name"><Input theme={t} value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="First & last name" /></Field>
        <Field theme={t} label="Phone"><Input theme={t} value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="(555) 555-0123" type="tel" /></Field>
        <Field theme={t} label="Age"><Input theme={t} value={form.age} onChange={v => setForm({ ...form, age: v })} placeholder="e.g. 7 or 34" type="number" /></Field>
        <Field theme={t} label="Skill level">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SKILL_LEVELS.map(s => (
              <button key={s.id} onClick={() => setForm({ ...form, skill: s.id })} style={{
                background: form.skill === s.id ? t.ink : t.surface, color: form.skill === s.id ? t.bg : t.ink,
                border: `1px solid ${form.skill === s.id ? t.ink : t.line}`, borderRadius: t.radius, padding: '10px 12px', textAlign: 'left', cursor: 'pointer', fontFamily: t.body,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{s.desc}</div>
              </button>
            ))}
          </div>
        </Field>
        <div style={{ marginTop: 24 }}>
          <Button theme={t} variant="accent" full size="lg" onClick={onNext} disabled={!valid}>Continue →</Button>
        </div>
      </div>
    </PhoneShell>
  );
}

function SU_Waiver({ theme: t, game, form, setForm, onBack, onNext }) {
  return (
    <PhoneShell theme={t} title="Waiver" onBack={onBack}>
      <div style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, color: t.primary }}>
          <IconShield size={22} />
          <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: 600, letterSpacing: -0.2 }}>Liability Waiver</div>
        </div>
        <Card theme={t} style={{ fontSize: 14, lineHeight: 1.6, color: t.inkSoft, marginBottom: 14, background: t.surfaceAlt }}>{game.waiverText}</Card>
        <button onClick={() => setForm({ ...form, waiver: !form.waiver })} style={{
          width: '100%', padding: '14px 16px', background: form.waiver ? t.ink : t.surface, color: form.waiver ? t.bg : t.ink,
          border: `1.5px solid ${t.ink}`, borderRadius: t.radius, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: t.body, textAlign: 'left',
        }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, flexShrink: 0, border: `2px solid ${form.waiver ? t.bg : t.ink}`, background: form.waiver ? t.bg : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.ink }}>
            {form.waiver && <IconCheck size={16} stroke={3} />}
          </div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>I agree and sign as <b>{form.name || 'Player'}</b></div>
        </button>
        <div style={{ marginTop: 24 }}>
          <Button theme={t} variant="accent" full size="lg" onClick={onNext} disabled={!form.waiver}>Continue to Payment →</Button>
        </div>
        <div style={{ marginTop: 16, padding: '12px 14px', background: t.surfaceAlt, borderRadius: t.radius, fontSize: 12, color: t.muted, display: 'flex', gap: 8, lineHeight: 1.5 }}>
          <IconLock size={14} style={{ flexShrink: 0, marginTop: 2 }} />
          If under 18, a parent/guardian must co-sign at the field with their ID.
        </div>
      </div>
    </PhoneShell>
  );
}

function SU_Payment({ theme: t, game, pos, form, onBack, onPay }) {
  const [method, setMethod] = React.useState('applepay');
  const [paying, setPaying] = React.useState(false);
  const pay = () => { setPaying(true); setTimeout(() => { setPaying(false); onPay(); }, 1200); };
  const fee = 0.50;
  const total = game.cost + fee;
  return (
    <PhoneShell theme={t} title="Pay & Reserve" onBack={onBack}>
      <div style={{ paddingTop: 16 }}>
        <Card theme={t} pad={18} style={{ marginBottom: 16 }}>
          <Row theme={t} left={pos.name} right={<span style={{ fontFamily: t.display, fontSize: 16 }}>${game.cost}.00</span>} />
          <Row theme={t} left="Processing" right={<span style={{ color: t.muted }}>${fee.toFixed(2)}</span>} />
          <div style={{ height: 1, background: t.line, margin: '12px 0' }} />
          <Row theme={t} left={<b style={{ fontFamily: t.display, letterSpacing: 1, textTransform: 'uppercase', fontSize: 13 }}>Total</b>} right={<span style={{ fontFamily: t.display, fontSize: 24, fontWeight: 600 }}>${total.toFixed(2)}</span>} />
        </Card>
        <Field theme={t} label="Payment Method">
          {[
            { id: 'applepay', label: ' Pay', sub: 'iPhone · Face ID' },
            { id: 'card', label: 'Credit/Debit Card', sub: '•••• 4242' },
            { id: 'venmo', label: 'Venmo', sub: '@marcus-c' },
          ].map(m => (
            <button key={m.id} onClick={() => setMethod(m.id)} style={{
              width: '100%', padding: '14px 16px', marginBottom: 8,
              background: method === m.id ? t.surfaceAlt : t.surface, border: `1.5px solid ${method === m.id ? t.ink : t.line}`,
              borderRadius: t.radius, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: t.body, textAlign: 'left',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.ink }}>{m.label}</div>
                <div style={{ fontSize: 12, color: t.muted }}>{m.sub}</div>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${method === m.id ? t.ink : t.line}`, background: method === m.id ? t.ink : 'transparent' }} />
            </button>
          ))}
        </Field>
        <div style={{ marginTop: 20 }}>
          <Button theme={t} variant="accent" full size="lg" onClick={pay} disabled={paying} icon={paying ? null : <IconLock size={16} />}>
            {paying ? 'Processing…' : `Pay $${total.toFixed(2)} & Reserve`}
          </Button>
        </div>
        <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11, color: t.muted, lineHeight: 1.5 }}>Covers field insurance and gear. Refundable up to 24hrs before start.</div>
      </div>
    </PhoneShell>
  );
}

function Row({ theme: t, left, right }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', fontSize: 14, color: t.ink }}>
      <div>{left}</div><div>{right}</div>
    </div>
  );
}

function SU_Confirmed({ theme: t, game, pos, players, onView }) {
  return (
    <PhoneShell theme={t} hideStatus={false}>
      <div style={{ paddingTop: 80, textAlign: 'center' }}>
        <div style={{ width: 140, height: 140, borderRadius: 70, margin: '0 auto 24px', background: `conic-gradient(from 0deg, ${t.primary}, ${t.accent}, ${t.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8, boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary }}>
            <IconBaseball size={64} />
          </div>
        </div>
        <div style={{ fontFamily: t.display, fontSize: 13, letterSpacing: 2.5, textTransform: 'uppercase', color: t.muted, marginBottom: 8 }}>You're in</div>
        <div style={{ fontFamily: t.display, fontSize: 38, fontWeight: 600, letterSpacing: -0.8, color: t.ink, lineHeight: 1.05, marginBottom: 14, textTransform: 'uppercase' }}>See you<br/>Saturday.</div>
        <Card theme={t} pad={18} style={{ textAlign: 'left', marginBottom: 20 }}>
          <Row theme={t} left={<span style={{ color: t.muted, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Position</span>} right={<b style={{ fontFamily: t.display, fontSize: 15 }}>{pos.name}</b>} />
          <Row theme={t} left={<span style={{ color: t.muted, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Team</span>} right={<b>{pos.team === 'home' ? 'Home' : 'Away'}</b>} />
          <Row theme={t} left={<span style={{ color: t.muted, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>When</span>} right={<b>{game.date}, {game.time}</b>} />
          <Row theme={t} left={<span style={{ color: t.muted, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Where</span>} right={<b style={{ textAlign: 'right' }}>{game.field}</b>} />
        </Card>
        <Button theme={t} variant="primary" full size="lg" onClick={onView}>View Full Roster</Button>
        <div style={{ marginTop: 10 }}>
          <Button theme={t} variant="ghost" full size="md" icon={<IconCalendar size={16} />}>Add to Calendar</Button>
        </div>
      </div>
    </PhoneShell>
  );
}

function SU_Roster({ theme: t, game, players, onBack }) {
  const home = players.filter(p => p.position.startsWith('H-'));
  const away = players.filter(p => p.position.startsWith('A-'));
  return (
    <PhoneShell theme={t} title="Roster" onBack={onBack}>
      <div style={{ paddingTop: 16 }}>
        <FieldDiagramBoth theme={t} players={players} />
        <div style={{ marginTop: 24 }}>
          <TeamRoster theme={t} label="Home" players={home} />
          <TeamRoster theme={t} label="Away" players={away} />
        </div>
      </div>
    </PhoneShell>
  );
}

function TeamRoster({ theme: t, label, players }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: t.display, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: t.muted, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        {label} · <span style={{ color: t.ink }}>{players.length}/9</span>
        <div style={{ flex: 1, height: 1, background: t.line }} />
      </div>
      <div style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: t.radius, overflow: 'hidden' }}>
        {players.map((p, i) => (
          <div key={p.id} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < players.length - 1 ? `1px solid ${t.line}` : 'none' }}>
            <Avatar name={p.name} color={p.avatar} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.ink }}>{p.name}</div>
              <div style={{ fontSize: 12, color: t.muted }}>{ALL_POSITIONS.find(ap => ap.id === p.position)?.name}</div>
            </div>
            <Chip theme={t} tone="default" size="sm">{p.position.replace(/^[HA]-/, '')}</Chip>
          </div>
        ))}
      </div>
    </div>
  );
}
