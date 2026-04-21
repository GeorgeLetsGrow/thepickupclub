'use client';
import React from 'react';
import { MOCK_MESSAGES, ALL_POSITIONS } from '@/lib/data';
import { PhoneShell, Avatar, Button, Card, Field, Input, Chip } from './PhoneShell';
import { FieldDiagram } from './FieldDiagram';
import { IconBaseball, IconCalendar, IconClock, IconUsers, IconShare, IconPlus, IconMegaphone, IconChevR, IconCheck, IconShield, IconPin, IconSun, IconDollar, IconDots, IconSend, IconBack } from './Icons';

function DashAction({ label, icon, onClick, t, last }) {
  return (
    <button onClick={onClick} style={{ flex: 1, padding: '14px 8px', background: 'transparent', border: 'none', borderRight: last ? 'none' : '1px solid rgba(255,255,255,0.15)', color: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, fontFamily: t.display, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase' }}>
      {icon}{label}
    </button>
  );
}

function StepLabel({ theme: t, num, title, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: t.display, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: t.accent, marginBottom: 4 }}>Step {num}</div>
      <div style={{ fontFamily: t.display, fontSize: 28, fontWeight: 600, color: t.ink, letterSpacing: -0.4, lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontSize: 14, color: t.muted, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function MapStripes({ theme: t }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 140" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
      <rect width="300" height="140" fill={t.surfaceAlt} />
      <line x1="0" y1="40" x2="300" y2="50" stroke={t.line} strokeWidth="8" />
      <line x1="100" y1="0" x2="120" y2="140" stroke={t.line} strokeWidth="6" />
      <line x1="200" y1="0" x2="190" y2="140" stroke={t.line} strokeWidth="4" />
      <line x1="0" y1="110" x2="300" y2="100" stroke={t.line} strokeWidth="4" />
      <rect x="130" y="55" width="70" height="50" fill={t.fieldGreen} opacity="0.4" />
    </svg>
  );
}

function OR_Dashboard({ theme: t, players, game, onCreate, onManage, onMessages, onOpenSignup }) {
  const filled = players.length;
  const spotsLeft = game.playerCap - filled;
  return (
    <PhoneShell theme={t} hideStatus={false} scroll={true}>
      <div style={{ padding: '60px 20px 16px', background: t.bg }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconBaseball size={22} style={{ color: t.accent }} />
            <div style={{ fontFamily: t.display, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase', color: t.ink }}>The PickUp Club</div>
          </div>
          <Avatar name={game.host} color={game.hostAvatar} size={36} />
        </div>
        <div style={{ fontSize: 13, color: t.muted }}>Welcome back, {game.host.split(' ')[0]}</div>
        <div style={{ fontFamily: t.display, fontSize: 32, fontWeight: 600, color: t.ink, letterSpacing: -0.5, textTransform: 'uppercase', lineHeight: 1.05, marginTop: 4 }}>Your Games.</div>
      </div>
      <div style={{ padding: '0 16px 24px' }}>
        <div style={{ background: t.primary, color: t.primaryInk, borderRadius: t.radius, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ padding: '16px 18px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.75 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: t.accent }} />
              Live signup · {spotsLeft} spots left
            </div>
            <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: 600, lineHeight: 1.1, letterSpacing: -0.3, textTransform: 'uppercase', marginBottom: 12 }}>{game.title}</div>
            <div style={{ display: 'flex', gap: 14, fontSize: 13, opacity: 0.85, marginBottom: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><IconCalendar size={13} />{game.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><IconClock size={13} />{game.time}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)', overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ width: `${(filled / game.playerCap) * 100}%`, height: '100%', background: t.accent }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.7 }}>
              <span>{filled} signed up</span><span>{game.playerCap} spots total</span>
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <DashAction label="Roster" icon={<IconUsers size={16} />} onClick={onManage} t={t} />
            <DashAction label="Message" icon={<IconMegaphone size={16} />} onClick={onMessages} t={t} />
            <DashAction label="Share" icon={<IconShare size={16} />} onClick={onOpenSignup} t={t} last />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <Card theme={t} pad={14}>
            <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: 1 }}>Paid</div>
            <div style={{ fontFamily: t.display, fontSize: 28, fontWeight: 600, color: t.ink }}>${filled * game.cost}</div>
            <div style={{ fontSize: 11, color: t.success }}>↑ {filled} × ${game.cost}</div>
          </Card>
          <Card theme={t} pad={14}>
            <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: 1 }}>Weather</div>
            <div style={{ fontFamily: t.display, fontSize: 28, fontWeight: 600, color: t.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
              <IconSun size={24} style={{ color: t.warn }} /> {game.weather.temp}°
            </div>
            <div style={{ fontSize: 11, color: t.muted }}>{game.weather.condition} · {game.weather.chanceRain}% rain</div>
          </Card>
        </div>
        <Button theme={t} variant="accent" full size="lg" icon={<IconPlus size={18} stroke={2.4} />} onClick={onCreate}>Create New Game</Button>
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: t.muted, marginBottom: 10 }}>Past Games</div>
          <Card theme={t} pad={0}>
            {[
              { title: 'Spring Opener', date: 'Apr 19', players: 16, won: 'Home' },
              { title: 'Thursday Night Game', date: 'Apr 10', players: 14, won: 'Away' },
              { title: 'Easter Weekend', date: 'Apr 5', players: 18, won: 'Home' },
            ].map((g, i, arr) => (
              <div key={i} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < arr.length - 1 ? `1px solid ${t.line}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.display, fontSize: 10, fontWeight: 600, color: t.muted, textTransform: 'uppercase', letterSpacing: 0.5, flexDirection: 'column', lineHeight: 1.1 }}>
                  <div style={{ fontSize: 13, color: t.ink }}>{g.date.split(' ')[1]}</div>
                  <div>{g.date.split(' ')[0]}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: t.muted }}>{g.players} players · {g.won} won</div>
                </div>
                <IconChevR size={16} style={{ color: t.muted }} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </PhoneShell>
  );
}

function OR_Create({ theme: t, step, setStep, draft, setDraft, onBack, onDone }) {
  const total = 3;
  const next = () => step < total ? setStep(step + 1) : onDone();
  const back = () => step > 1 ? setStep(step - 1) : onBack();
  return (
    <PhoneShell theme={t} title={`Create · ${step}/${total}`} onBack={back}>
      <div style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {[1,2,3].map(i => (<div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? t.accent : t.line }} />))}
        </div>
        {step === 1 && (
          <>
            <StepLabel theme={t} num="01" title="The Basics" sub="Name, date, time" />
            <Field theme={t} label="Game name"><Input theme={t} value={draft.title} onChange={v => setDraft({ ...draft, title: v })} placeholder="e.g. Saturday Scrimmage" /></Field>
            <Field theme={t} label="Date"><Input theme={t} value={draft.date} onChange={v => setDraft({ ...draft, date: v })} placeholder="Sat, Apr 26" /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field theme={t} label="Start"><Input theme={t} value={draft.time} onChange={v => setDraft({ ...draft, time: v })} placeholder="10:00 AM" /></Field>
              <Field theme={t} label="End"><Input theme={t} value={draft.endTime} onChange={v => setDraft({ ...draft, endTime: v })} placeholder="12:30 PM" /></Field>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <StepLabel theme={t} num="02" title="Location" sub="Where's it happening?" />
            <Field theme={t} label="Field name"><Input theme={t} value={draft.field} onChange={v => setDraft({ ...draft, field: v })} placeholder="Bullfrog Creek Park — Diamond 1" /></Field>
            <Field theme={t} label="Address"><Input theme={t} value={draft.address} onChange={v => setDraft({ ...draft, address: v })} placeholder="13012 Bullfrog Creek Rd" /></Field>
            <div style={{ height: 140, borderRadius: t.radius, background: t.surfaceAlt, border: `1px solid ${t.line}`, position: 'relative', overflow: 'hidden', marginTop: 6 }}>
              <MapStripes theme={t} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', color: t.accent }}><IconPin size={32} /></div>
              <div style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 11, color: t.muted, background: t.surface, padding: '4px 8px', borderRadius: 4, border: `1px solid ${t.line}` }}>Preview · tap to set pin</div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <StepLabel theme={t} num="03" title="Rules & Cost" sub="Capacity, fee, waiver" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field theme={t} label="Cost per player"><Input theme={t} value={draft.cost} onChange={v => setDraft({ ...draft, cost: v })} placeholder="10" type="number" /></Field>
              <Field theme={t} label="Player cap"><Input theme={t} value={draft.cap} onChange={v => setDraft({ ...draft, cap: v })} placeholder="18" type="number" /></Field>
            </div>
            <Field theme={t} label="Notes for players">
              <textarea value={draft.notes || ''} onChange={e => setDraft({ ...draft, notes: e.target.value })} placeholder="Bring your own glove. Balls + bases provided." style={{ width: '100%', background: t.surface, border: `1px solid ${t.line}`, borderRadius: t.radius, padding: '12px 14px', fontSize: 14, color: t.ink, fontFamily: t.body, boxSizing: 'border-box', outline: 'none', resize: 'vertical', minHeight: 80 }} />
            </Field>
            <Card theme={t} style={{ background: t.surfaceAlt, display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 6 }}>
              <IconShield size={18} style={{ color: t.primary, flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, marginBottom: 2 }}>Liability waiver included</div>
                <div style={{ fontSize: 12, color: t.muted, lineHeight: 1.5 }}>Standard pickup-game waiver auto-attached. Players sign on signup.</div>
              </div>
            </Card>
          </>
        )}
        <div style={{ marginTop: 24 }}>
          <Button theme={t} variant="accent" full size="lg" onClick={next}>{step < total ? 'Continue →' : 'Create & Get Link'}</Button>
        </div>
      </div>
    </PhoneShell>
  );
}

function OR_Share({ theme: t, draft, game, onBack, onDone }) {
  const [copied, setCopied] = React.useState(false);
  const link = 'tbbc.co/g/' + (draft.title || game.title).toLowerCase().replace(/\s+/g, '-').slice(0, 24);
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <PhoneShell theme={t} title="Share" onBack={onBack}>
      <div style={{ paddingTop: 16 }}>
        <div style={{ textAlign: 'center', padding: '20px 0 28px' }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, margin: '0 auto 14px', background: t.success + '22', color: t.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconCheck size={36} stroke={3} /></div>
          <div style={{ fontFamily: t.display, fontSize: 28, fontWeight: 600, color: t.ink, letterSpacing: -0.4, textTransform: 'uppercase' }}>Game Created</div>
          <div style={{ fontSize: 14, color: t.muted, marginTop: 6 }}>Share this link anywhere</div>
        </div>
        <Card theme={t} pad={14} style={{ marginBottom: 16, background: t.surfaceAlt }}>
          <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Signup link</div>
          <div style={{ fontFamily: 'ui-monospace, "SF Mono", monospace', fontSize: 15, fontWeight: 600, color: t.ink, wordBreak: 'break-all' }}>{link}</div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <Button theme={t} variant="primary" size="md" onClick={copy}>{copied ? 'Copied!' : 'Copy Link'}</Button>
          <Button theme={t} variant="outline" size="md" icon={<IconShare size={16} />}>Share Sheet</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12 }}>
          {[
            { label: 'Facebook', bg: '#1877f2', fg: '#fff', letter: 'f' },
            { label: 'Messages', bg: '#4cd964', fg: '#fff', letter: '✉' },
            { label: 'WhatsApp', bg: '#25d366', fg: '#fff', letter: '🟢' },
            { label: 'Email', bg: t.ink, fg: t.bg, letter: '@' },
          ].map(ch => (
            <button key={ch.label} style={{ padding: '14px 6px', background: t.surface, border: `1px solid ${t.line}`, borderRadius: t.radius, cursor: 'pointer', fontFamily: t.body, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: ch.bg, color: ch.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, fontFamily: 'Helvetica, Arial, sans-serif' }}>{ch.letter}</div>
              <div style={{ fontSize: 10, color: t.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5 }}>{ch.label}</div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 24 }}><Button theme={t} variant="ghost" full size="md" onClick={onDone}>Done</Button></div>
      </div>
    </PhoneShell>
  );
}

function OR_Manage({ theme: t, players, game, onBack, onMessages }) {
  const [tab, setTab] = React.useState('home');
  const teamPlayers = players.filter(p => p.position.startsWith(tab === 'home' ? 'H-' : 'A-'));
  const openCount = 9 - teamPlayers.length;
  return (
    <PhoneShell theme={t} title="Live Roster" onBack={onBack} trailing={
      <button onClick={onMessages} style={{ background: 'transparent', border: 'none', color: t.ink, cursor: 'pointer' }}><IconMegaphone size={22} /></button>
    }>
      <div style={{ paddingTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: t.surfaceAlt, borderRadius: t.radius, border: `1px solid ${t.line}`, marginBottom: 14, fontSize: 12, color: t.muted }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: t.accent }} />
          Last signup <b style={{ color: t.ink }}>Jordan Lee</b> · 3m ago
        </div>
        <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: t.radius, padding: 4, border: `1px solid ${t.line}`, marginBottom: 14 }}>
          {['home', 'away'].map(team => (
            <button key={team} onClick={() => setTab(team)} style={{ flex: 1, padding: '10px', border: 'none', cursor: 'pointer', background: tab === team ? t.primary : 'transparent', color: tab === team ? t.primaryInk : t.inkSoft, fontFamily: t.display, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500, borderRadius: t.radius - 2 }}>
              {team} · {players.filter(p => p.position.startsWith(team === 'home' ? 'H-' : 'A-')).length}/9
            </button>
          ))}
        </div>
        <div style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: t.radius, padding: 10, marginBottom: 16 }}>
          <FieldDiagram theme={t} players={teamPlayers} team={tab} height={220} />
        </div>
        <div style={{ background: t.surface, borderRadius: t.radius, border: `1px solid ${t.line}`, overflow: 'hidden' }}>
          {teamPlayers.length === 0 && <div style={{ padding: 20, textAlign: 'center', color: t.muted, fontSize: 13 }}>No one signed up for this team yet</div>}
          {teamPlayers.map((p, i, arr) => (
            <div key={p.id} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < arr.length - 1 ? `1px solid ${t.line}` : 'none' }}>
              <Avatar name={p.name} color={p.avatar} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {p.name}
                  {p.paid && <div title="Paid" style={{ width: 14, height: 14, borderRadius: 7, background: t.success, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconCheck size={10} stroke={3.5} /></div>}
                </div>
                <div style={{ fontSize: 11, color: t.muted, display: 'flex', gap: 8 }}>
                  <span>{ALL_POSITIONS.find(ap => ap.id === p.position)?.name}</span>
                  <span>·</span><span>Age {p.age}</span>
                  <span>·</span><span style={{ textTransform: 'capitalize' }}>{p.skill}</span>
                </div>
              </div>
              <button style={{ background: 'transparent', border: 'none', color: t.muted, cursor: 'pointer', padding: 6, borderRadius: 6 }}><IconDots size={18} /></button>
            </div>
          ))}
          {openCount > 0 && (
            <div style={{ padding: '12px 14px', background: t.surfaceAlt, borderTop: `1px solid ${t.line}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 19, border: `2px dashed ${t.muted}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.muted }}><IconPlus size={18} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{openCount} open spots</div>
                <div style={{ fontSize: 11, color: t.muted }}>Share the link to fill them</div>
              </div>
              <Button theme={t} variant="outline" size="sm" icon={<IconShare size={13} />}>Share</Button>
            </div>
          )}
        </div>
      </div>
    </PhoneShell>
  );
}

function OR_Messages({ theme: t, players, game, onBack }) {
  const [text, setText] = React.useState('');
  const [messages, setMessages] = React.useState(MOCK_MESSAGES);
  const send = () => {
    if (!text.trim()) return;
    setMessages([...messages, { id: 'm' + Date.now(), author: game.host, time: 'now', text: text.trim(), host: true }]);
    setText('');
  };
  return (
    <PhoneShell theme={t} title="Messages" onBack={onBack} scroll={false}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '12px 16px', background: t.surfaceAlt, borderBottom: `1px solid ${t.line}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primaryInk }}><IconMegaphone size={18} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{game.title}</div>
            <div style={{ fontSize: 11, color: t.muted }}>{players.length} players · visible to all</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {messages.map(m => (
            <div key={m.id} style={{ marginBottom: 14, display: 'flex', gap: 10, justifyContent: m.host ? 'flex-end' : 'flex-start' }}>
              {!m.host && <Avatar name={m.author} color={t.primary} size={28} />}
              <div style={{ maxWidth: '75%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, fontSize: 11, color: t.muted, justifyContent: m.host ? 'flex-end' : 'flex-start' }}>
                  {m.host && <Chip theme={t} tone="accent" size="sm">Host</Chip>}
                  <span>{m.author}</span><span>·</span><span>{m.time}</span>
                </div>
                <div style={{ background: m.host ? t.primary : t.surface, color: m.host ? t.primaryInk : t.ink, border: m.host ? 'none' : `1px solid ${t.line}`, borderRadius: t.radius, padding: '10px 14px', fontSize: 14, lineHeight: 1.45, borderBottomRightRadius: m.host ? 4 : t.radius, borderBottomLeftRadius: !m.host ? 4 : t.radius }}>{m.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 12px 14px', borderTop: `1px solid ${t.line}`, background: t.bg, display: 'flex', gap: 8, alignItems: 'center' }}>
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Announce to all players…" style={{ flex: 1, background: t.surface, border: `1px solid ${t.line}`, borderRadius: 999, padding: '10px 16px', fontSize: 14, color: t.ink, fontFamily: t.body, outline: 'none' }} />
          <button onClick={send} disabled={!text.trim()} style={{ width: 40, height: 40, borderRadius: 20, background: text.trim() ? t.accent : t.line, color: text.trim() ? t.accentInk : t.muted, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconSend size={18} /></button>
        </div>
      </div>
    </PhoneShell>
  );
}

export function OrganizerFlow({ theme, players, game, initialScreen = 'dashboard', initialCreateStep = 1, initialDraft, onOpenSignup }) {
  const t = theme;
  const [screen, setScreen] = React.useState(initialScreen);
  const [createStep, setCreateStep] = React.useState(initialCreateStep);
  const [draft, setDraft] = React.useState(initialDraft || { title: '', date: '', time: '', field: '', cost: 10, cap: 18 });

  if (screen === 'dashboard') return <OR_Dashboard theme={t} players={players} game={game} onCreate={() => { setCreateStep(1); setScreen('create'); }} onManage={() => setScreen('manage')} onMessages={() => setScreen('messages')} onOpenSignup={onOpenSignup} />;
  if (screen === 'create') return <OR_Create theme={t} step={createStep} setStep={setCreateStep} draft={draft} setDraft={setDraft} onBack={() => setScreen('dashboard')} onDone={() => setScreen('share')} />;
  if (screen === 'share') return <OR_Share theme={t} draft={draft} game={game} onBack={() => setScreen('dashboard')} onDone={() => setScreen('dashboard')} />;
  if (screen === 'manage') return <OR_Manage theme={t} players={players} game={game} onBack={() => setScreen('dashboard')} onMessages={() => setScreen('messages')} />;
  if (screen === 'messages') return <OR_Messages theme={t} players={players} game={game} onBack={() => setScreen('dashboard')} />;
  return null;
}
