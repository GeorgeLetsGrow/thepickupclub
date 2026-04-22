'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MOCK_PLAYERS, MOCK_GAME, ALL_POSITIONS } from '@/lib/data';
import { FieldDiagram } from '@/components/FieldDiagram';
import {
  IconCalendar, IconClock, IconPin, IconUsers, IconCheck,
  IconSun, IconCloud, IconBack, IconBaseball, IconShield, IconDollar,
} from '@/components/Icons';

// ─── theme object for FieldDiagram ───────────────────────────────────────────
const FD_THEME = {
  fieldGreen: '#12805c',
  fieldDirt:  '#c9975b',
  primary:    '#111827',
  accent:     '#f04438',
  ink:        '#111827',
  muted:      '#667085',
  display:    'var(--font-oswald), "Arial Narrow", sans-serif',
  radius:     '10px',
};

// ─── position data ────────────────────────────────────────────────────────────
const BASE_POSITIONS = [
  { id: 'P',  name: 'Pitcher',       short: 'P'  },
  { id: 'C',  name: 'Catcher',       short: 'C'  },
  { id: '1B', name: '1st Base',      short: '1B' },
  { id: '2B', name: '2nd Base',      short: '2B' },
  { id: '3B', name: '3rd Base',      short: '3B' },
  { id: 'SS', name: 'Shortstop',     short: 'SS' },
  { id: 'LF', name: 'Left Field',    short: 'LF' },
  { id: 'CF', name: 'Center Field',  short: 'CF' },
  { id: 'RF', name: 'Right Field',   short: 'RF' },
];

const BOTH_TEAMS = [
  ...BASE_POSITIONS.map(p => ({ ...p, id: 'H-' + p.id, team: 'Home' })),
  ...BASE_POSITIONS.map(p => ({ ...p, id: 'A-' + p.id, team: 'Away' })),
];

const SKILL_LEVELS = [
  { id: 'rookie', label: 'Rookie',  desc: 'Just learning the game' },
  { id: 'casual', label: 'Casual',  desc: 'Plays for fun' },
  { id: 'solid',  label: 'Solid',   desc: 'Plays regularly' },
  { id: 'ringer', label: 'Ringer',  desc: 'Competitive level' },
];

const WAIVER_PARAGRAPHS = [
  `I understand and acknowledge that participation in pickup baseball involves inherent risks of physical injury, including but not limited to sprains, fractures, concussions, and other bodily harm. I voluntarily assume all such risks.`,
  `In consideration of being permitted to participate, I hereby release, waive, discharge, and covenant not to sue the game organizer, field owner, their agents, employees, and representatives from any and all liability arising from my participation, including claims of negligence.`,
  `I confirm that I am physically capable of participating in baseball activities, that I have no medical conditions that would prevent safe participation, and that I will follow all field rules and the directions of the game organizer. This waiver is binding upon my heirs and legal representatives.`,
];

const CONFETTI_DOTS = Array.from({ length: 22 }, (_, i) => ({
  top: `${(i * 37) % 100}%`,
  left: `${(i / 22) * 100}%`,
  size: 6 + (i % 3) * 3,
  radius: i % 2 === 0 ? '50%' : 2,
  background: ['#f04438', '#f59e0b', '#fff', '#12805c', '#a0c8e8'][i % 5],
  opacity: 0.55 + (i % 4) * 0.1,
  transform: `rotate(${i * 17}deg)`,
}));

// ─── helpers ──────────────────────────────────────────────────────────────────
function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function Avatar({ name, color, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color || '#667085',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.32, fontWeight: 700,
      flexShrink: 0, border: '2px solid #fff',
    }}>
      {initials(name)}
    </div>
  );
}

function AvatarStack({ players, max = 5 }) {
  const shown = players.slice(0, max);
  const rest = players.length - shown.length;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shown.map((p, i) => (
        <div key={p.id} style={{ marginLeft: i === 0 ? 0 : -10, zIndex: shown.length - i }}>
          <Avatar name={p.name} color={p.avatar} size={34} />
        </div>
      ))}
      {rest > 0 && (
        <div style={{
          marginLeft: -10, zIndex: 0,
          width: 34, height: 34, borderRadius: '50%',
          background: '#d9e2ec', border: '2px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#667085',
        }}>
          +{rest}
        </div>
      )}
    </div>
  );
}

// ─── step progress indicator ──────────────────────────────────────────────────
const STEPS = ['landing', 'position', 'info', 'waiver', 'payment', 'confirmed'];
const STEP_LABELS = ['Game', 'Position', 'Info', 'Waiver', 'Payment', 'Done'];

function StepDots({ screen }) {
  const idx = STEPS.indexOf(screen);
  if (idx <= 0 || screen === 'confirmed') return null;
  const active = STEPS.slice(1, 5); // position → payment
  const activeIdx = active.indexOf(screen);
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {active.map((s, i) => (
        <div key={s} style={{
          width: i === activeIdx ? 20 : 8, height: 8, borderRadius: 4,
          background: i === activeIdx ? '#f04438' : i < activeIdx ? '#12805c' : '#d9e2ec',
          transition: 'all 0.2s',
        }} />
      ))}
    </div>
  );
}

// ─── page header ──────────────────────────────────────────────────────────────
function PageHeader({ game, screen, onBack }) {
  const showBack = screen !== 'landing';
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: '#111827', color: '#fff',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 16px', height: 56,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.1)', border: 'none',
            borderRadius: 8, width: 36, height: 36, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', flexShrink: 0,
          }}
          aria-label="Back"
        >
          <IconBack size={18} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display, "Arial Narrow", sans-serif)',
            fontWeight: 700, fontSize: 17, letterSpacing: 0.3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {game.title}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>
            Hosted by {game.host}
          </div>
        </div>
        <StepDots screen={screen} />
      </div>
    </header>
  );
}

// ─── SCREEN: landing ──────────────────────────────────────────────────────────
function LandingScreen({ game, players, onNext }) {
  const spotsLeft = game.playerCap - players.length;
  const pct = Math.round((players.length / game.playerCap) * 100);

  return (
    <div>
      {/* Hero band */}
      <div style={{ background: '#111827', color: '#fff', padding: '28px 0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <IconBaseball size={16} style={{ color: '#f04438', opacity: 0.9 }} />
                <span style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-display, sans-serif)' }}>
                  Pickup Game
                </span>
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display, "Arial Narrow", sans-serif)',
                fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 700,
                letterSpacing: 0.5, lineHeight: 1.1, margin: '0 0 16px',
              }}>
                {game.title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px' }}>
                {[
                  { icon: <IconCalendar size={14} />, text: game.date },
                  { icon: <IconClock size={14} />,    text: `${game.time} – ${game.endTime}` },
                  { icon: <IconPin size={14} />,      text: game.field },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
                    {icon} {text}
                  </div>
                ))}
              </div>
            </div>
            {/* Weather badge */}
            <div style={{
              background: 'rgba(255,255,255,0.1)', borderRadius: 10,
              padding: '10px 14px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3, flexShrink: 0,
            }}>
              {game.weather.condition === 'Sunny'
                ? <IconSun size={22} style={{ color: '#f59e0b' }} />
                : <IconCloud size={22} style={{ color: '#a0b8c8' }} />
              }
              <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display, sans-serif)' }}>
                {game.weather.temp}°
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 }}>
                {game.weather.condition}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px 60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr)',
          gap: 24,
        }}
          className="landing-grid"
        >
          {/* Left: field */}
          <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #d9e2ec' }}>
            <div style={{
              padding: '14px 16px 10px',
              fontFamily: 'var(--font-display, sans-serif)', fontSize: 11,
              letterSpacing: 1.2, textTransform: 'uppercase',
              color: '#667085', borderBottom: '1px solid #d9e2ec',
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span>Live Field</span>
              <span style={{ color: '#12805c', fontWeight: 700 }}>
                {players.length} on the diamond
              </span>
            </div>
            <FieldDiagram
              theme={FD_THEME}
              players={players}
              team="home"
              compact={false}
              height={320}
            />
          </div>

          {/* Right: info + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Roster count card */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', border: '1px solid #d9e2ec' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display, sans-serif)',
                    fontSize: 52, fontWeight: 700, lineHeight: 1, color: '#111827',
                  }}>
                    {players.length}
                    <span style={{ fontSize: 22, color: '#667085', fontWeight: 400 }}>/{game.playerCap}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#667085', marginTop: 2 }}>players signed up</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    background: spotsLeft <= 3 ? '#fff1f2' : '#ecfdf5',
                    color: spotsLeft <= 3 ? '#f04438' : '#12805c',
                    borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 700,
                    border: `1px solid ${spotsLeft <= 3 ? '#fecdd3' : '#bbf7d0'}`,
                  }}>
                    {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ background: '#edf2f7', borderRadius: 4, height: 6, marginBottom: 14 }}>
                <div style={{
                  width: `${pct}%`, height: '100%', borderRadius: 4,
                  background: pct > 80 ? '#f04438' : '#12805c',
                  transition: 'width 0.3s',
                }} />
              </div>

              {/* Avatar stack */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <AvatarStack players={players} max={6} />
                <div style={{ fontSize: 12, color: '#667085' }}>
                  {game.skill}
                </div>
              </div>
            </div>

            {/* Host card */}
            <div style={{
              background: '#fff', borderRadius: 14, padding: '16px 20px',
              border: '1px solid #d9e2ec', display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <Avatar name={game.host} color={game.hostAvatar} size={44} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#667085', marginBottom: 2 }}>Organized by</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{game.host}</div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#f6f7fb', borderRadius: 8, padding: '6px 12px',
              }}>
                <IconDollar size={14} style={{ color: '#12805c' }} />
                <span style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>${game.cost}</span>
                <span style={{ fontSize: 11, color: '#667085' }}>per player</span>
              </div>
            </div>

            {/* Notes */}
            {game.notes && (
              <div style={{
                background: '#f8fafc', borderRadius: 12, padding: '14px 16px',
                border: '1px solid #dbeafe', fontSize: 13, color: '#475467', lineHeight: 1.6,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: '#667085', marginBottom: 6 }}>
                  Notes from the host
                </div>
                {game.notes}
              </div>
            )}

            {/* CTA */}
            <button
              onClick={onNext}
              style={{
                background: '#f04438', color: '#fff',
                border: 'none', borderRadius: 12, padding: '16px 28px',
                fontFamily: 'var(--font-display, sans-serif)',
                fontSize: 17, fontWeight: 700, letterSpacing: 1.5,
                textTransform: 'uppercase', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '0 4px 16px rgba(196,48,43,0.35)',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(196,48,43,0.42)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(196,48,43,0.35)';
              }}
            >
              <IconBaseball size={18} />
              Claim My Spot
            </button>

            <div style={{ textAlign: 'center', fontSize: 12, color: '#667085' }}>
              <IconPin size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {game.fieldAddress}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive grid style */}
      <style>{`
        @media (min-width: 768px) {
          .landing-grid {
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── SCREEN: position ─────────────────────────────────────────────────────────
function PositionScreen({ players, selectedPos, onSelect, onNext, onBack }) {
  const takenIds = new Set(players.map(p => p.position));

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '28px 20px 100px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{
          fontFamily: 'var(--font-display, sans-serif)',
          fontSize: 28, fontWeight: 700, color: '#111827',
          letterSpacing: 0.3, margin: '0 0 8px',
        }}>
          Pick Your Position
        </h2>
        <p style={{ color: '#667085', fontSize: 14, margin: 0 }}>
          Select an open spot on the field
        </p>
      </div>

      {['Home', 'Away'].map(team => (
        <div key={team} style={{ marginBottom: 28 }}>
          <div style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
            textTransform: 'uppercase', color: '#667085',
            marginBottom: 10, paddingLeft: 2,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: team === 'Home' ? '#f04438' : '#111827',
            }} />
            {team} Team
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
          }}>
            {BOTH_TEAMS.filter(p => p.team === team).map(pos => {
              const taken = takenIds.has(pos.id);
              const takenPlayer = taken ? players.find(p => p.position === pos.id) : null;
              const isSelected = selectedPos?.id === pos.id;

              return (
                <button
                  key={pos.id}
                  disabled={taken}
                  onClick={() => !taken && onSelect(pos)}
                  style={{
                    background: isSelected ? '#111827' : taken ? '#f6f7fb' : '#fff',
                    border: `2px solid ${isSelected ? '#111827' : taken ? '#d9e2ec' : '#d9e2ec'}`,
                    borderRadius: 10, padding: '12px 10px',
                    cursor: taken ? 'not-allowed' : 'pointer',
                    textAlign: 'left', transition: 'all 0.15s',
                    opacity: taken ? 0.7 : 1,
                    boxShadow: isSelected ? '0 2px 10px rgba(30,42,53,0.18)' : '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => {
                    if (!taken && !isSelected) {
                      e.currentTarget.style.borderColor = '#111827';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(30,42,53,0.12)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!taken && !isSelected) {
                      e.currentTarget.style.borderColor = '#d9e2ec';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <span style={{
                      fontFamily: 'var(--font-display, sans-serif)',
                      fontSize: 20, fontWeight: 700,
                      color: isSelected ? '#fff' : taken ? '#667085' : '#111827',
                    }}>
                      {pos.short}
                    </span>
                    {isSelected && (
                      <span style={{
                        background: '#f04438', borderRadius: '50%',
                        width: 20, height: 20, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <IconCheck size={11} style={{ color: '#fff' }} />
                      </span>
                    )}
                    {taken && takenPlayer && (
                      <Avatar name={takenPlayer.name} color={takenPlayer.avatar} size={22} />
                    )}
                  </div>
                  <div style={{
                    fontSize: 12, fontWeight: 500,
                    color: isSelected ? 'rgba(255,255,255,0.8)' : taken ? '#667085' : '#475467',
                  }}>
                    {pos.name}
                  </div>
                  <div style={{ marginTop: 5, fontSize: 11 }}>
                    {taken ? (
                      <span style={{ color: '#f04438', fontWeight: 600 }}>
                        Taken {takenPlayer ? `· ${takenPlayer.name.split(' ')[0]}` : ''}
                      </span>
                    ) : (
                      <span style={{ color: '#12805c', fontWeight: 600 }}>
                        ✓ Open
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Confirm bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: selectedPos ? '#111827' : '#fff',
        borderTop: '1px solid #d9e2ec',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        transition: 'background 0.2s',
        zIndex: 40,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: `1px solid ${selectedPos ? 'rgba(255,255,255,0.25)' : '#d9e2ec'}`,
            borderRadius: 8, padding: '10px 16px', cursor: 'pointer',
            color: selectedPos ? '#fff' : '#667085', fontSize: 13,
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <IconBack size={14} /> Back
        </button>

        {selectedPos ? (
          <button
            onClick={onNext}
            style={{
              flex: 1, maxWidth: 340,
              background: '#f04438', color: '#fff',
              border: 'none', borderRadius: 10, padding: '12px 20px',
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: 15, fontWeight: 700, letterSpacing: 0.8,
              textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            Play {selectedPos.name}? → Continue
          </button>
        ) : (
          <div style={{ color: '#667085', fontSize: 13 }}>
            Select a position above
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: info ─────────────────────────────────────────────────────────────
function InfoScreen({ form, onChange, onNext, onBack }) {
  const valid = form.name.trim().length > 1 && form.phone.trim().length > 6 && form.age;

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '32px 20px 60px' }}>
      <div style={{
        background: '#fff', borderRadius: 16, border: '1px solid #d9e2ec',
        padding: '28px 28px 32px', boxShadow: '0 2px 12px rgba(30,42,53,0.06)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display, sans-serif)',
          fontSize: 26, fontWeight: 700, color: '#111827',
          margin: '0 0 6px', letterSpacing: 0.3,
        }}>
          Your Info
        </h2>
        <p style={{ color: '#667085', fontSize: 13, margin: '0 0 24px' }}>
          Tell the organizer a bit about yourself
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Full Name */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#475467', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Full Name *
            </span>
            <input
              type="text"
              value={form.name}
              onChange={e => onChange({ name: e.target.value })}
              placeholder="e.g. Jordan Lee"
              style={inputStyle(form.name)}
            />
          </label>

          {/* Phone */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#475467', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Phone Number *
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={e => onChange({ phone: e.target.value })}
              placeholder="(555) 000-0000"
              style={inputStyle(form.phone)}
            />
            <span style={{ fontSize: 11, color: '#667085' }}>Used to send game-day updates</span>
          </label>

          {/* Age */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#475467', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Age *
            </span>
            <input
              type="number"
              value={form.age}
              onChange={e => onChange({ age: e.target.value })}
              placeholder="Your age"
              min={13} max={99}
              style={{ ...inputStyle(form.age), maxWidth: 120 }}
            />
          </label>

          {/* Skill Level */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#475467', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
              Skill Level *
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {SKILL_LEVELS.map(s => {
                const selected = form.skill === s.id;
                return (
                  <label
                    key={s.id}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 2,
                      background: selected ? '#111827' : '#f6f7fb',
                      border: `2px solid ${selected ? '#111827' : '#d9e2ec'}`,
                      borderRadius: 10, padding: '10px 12px',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    <input
                      type="radio"
                      name="skill"
                      value={s.id}
                      checked={selected}
                      onChange={() => onChange({ skill: s.id })}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-display, sans-serif)',
                      fontSize: 15, fontWeight: 700,
                      color: selected ? '#fff' : '#111827',
                    }}>
                      {s.label}
                    </span>
                    <span style={{ fontSize: 11, color: selected ? 'rgba(255,255,255,0.65)' : '#667085' }}>
                      {s.desc}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
          <button onClick={onBack} style={backBtnStyle}>
            <IconBack size={14} /> Back
          </button>
          <button
            onClick={onNext}
            disabled={!valid}
            style={{
              ...nextBtnStyle,
              opacity: valid ? 1 : 0.45,
              cursor: valid ? 'pointer' : 'not-allowed',
            }}
          >
            Next: Waiver →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: waiver ───────────────────────────────────────────────────────────
function WaiverScreen({ form, onChange, onNext, onBack }) {
  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '32px 20px 60px' }}>
      <div style={{
        background: '#fff', borderRadius: 16, border: '1px solid #d9e2ec',
        padding: '28px 28px 32px', boxShadow: '0 2px 12px rgba(30,42,53,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <IconShield size={22} style={{ color: '#f04438' }} />
          <h2 style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: 26, fontWeight: 700, color: '#111827',
            margin: 0, letterSpacing: 0.3,
          }}>
            Liability Waiver
          </h2>
        </div>
        <p style={{ color: '#667085', fontSize: 13, margin: '0 0 20px' }}>
          Please read and agree before continuing
        </p>

        <div style={{
          background: '#f6f7fb', borderRadius: 10, padding: '18px 20px',
          border: '1px solid #d9e2ec', marginBottom: 20,
          maxHeight: 260, overflowY: 'auto',
        }}>
          {WAIVER_PARAGRAPHS.map((p, i) => (
            <p key={i} style={{
              fontSize: 13, color: '#475467', lineHeight: 1.7,
              margin: i === 0 ? 0 : '14px 0 0',
            }}>
              {p}
            </p>
          ))}
        </div>

        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          cursor: 'pointer', padding: '14px 16px',
          background: form.waiver ? '#ecfdf5' : '#f8fafc',
          border: `2px solid ${form.waiver ? '#12805c' : '#d9e2ec'}`,
          borderRadius: 10, marginBottom: 24,
          transition: 'all 0.15s',
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6, flexShrink: 0,
            background: form.waiver ? '#12805c' : '#fff',
            border: `2px solid ${form.waiver ? '#12805c' : '#cbd5e1'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 1, transition: 'all 0.15s',
          }}>
            {form.waiver && <IconCheck size={13} style={{ color: '#fff' }} />}
          </div>
          <input
            type="checkbox"
            checked={form.waiver}
            onChange={e => onChange({ waiver: e.target.checked })}
            style={{ display: 'none' }}
          />
          <span style={{ fontSize: 13, color: '#475467', lineHeight: 1.5 }}>
            I have read and agree to the liability waiver above. I understand the risks involved in participating in this pickup game.
          </span>
        </label>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onBack} style={backBtnStyle}>
            <IconBack size={14} /> Back
          </button>
          <button
            onClick={onNext}
            disabled={!form.waiver}
            style={{
              ...nextBtnStyle,
              opacity: form.waiver ? 1 : 0.45,
              cursor: form.waiver ? 'pointer' : 'not-allowed',
            }}
          >
            Agree &amp; Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: payment ──────────────────────────────────────────────────────────
function PaymentScreen({ game, selectedPos, form, onNext, onBack }) {
  const [loading, setLoading] = React.useState(false);

  function handlePay() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext();
    }, 1400);
  }

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '32px 20px 60px' }}>
      <div style={{
        background: '#fff', borderRadius: 16, border: '1px solid #d9e2ec',
        padding: '28px 28px 32px', boxShadow: '0 2px 12px rgba(30,42,53,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <IconDollar size={22} style={{ color: '#12805c' }} />
          <h2 style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: 26, fontWeight: 700, color: '#111827',
            margin: 0, letterSpacing: 0.3,
          }}>
            Reserve Your Spot
          </h2>
        </div>
        <p style={{ color: '#667085', fontSize: 13, margin: '0 0 24px' }}>
          One payment locks in your position
        </p>

        {/* Summary card */}
        <div style={{
          background: '#f6f7fb', borderRadius: 12, border: '1px solid #d9e2ec',
          overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #d9e2ec' }}>
            <div style={{ fontSize: 12, color: '#667085', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
              Order Summary
            </div>
            {[
              { label: 'Game', value: game.title },
              { label: 'Date', value: `${game.date} · ${game.time}` },
              { label: 'Position', value: selectedPos?.name || '—' },
              { label: 'Player', value: form.name || '—' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: '#667085' }}>{label}</span>
                <span style={{ color: '#111827', fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{
            padding: '14px 18px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontWeight: 700, color: '#111827', fontSize: 15 }}>Total</span>
            <span style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: 26, fontWeight: 700, color: '#111827',
            }}>
              ${game.cost}
            </span>
          </div>
        </div>

        {/* Stripe-style input area */}
        <div style={{
          background: '#f8fafc', borderRadius: 10, border: '1px solid #d9e2ec',
          padding: '16px 18px', marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, color: '#667085', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>
            Payment Method
          </div>
          <div style={{
            background: '#fff', borderRadius: 8, border: '1px solid #cbd5e1',
            padding: '11px 14px', fontSize: 13, color: '#667085',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span>Card number</span>
            <div style={{ display: 'flex', gap: 5, opacity: 0.5 }}>
              {['VISA', 'MC', 'AMEX'].map(b => (
                <span key={b} style={{
                  fontSize: 9, fontWeight: 800, border: '1px solid #ccc',
                  borderRadius: 3, padding: '1px 4px', color: '#475467',
                }}>
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
            {['Expiry (MM/YY)', 'CVC'].map(p => (
              <div key={p} style={{
                background: '#fff', borderRadius: 8, border: '1px solid #cbd5e1',
                padding: '11px 14px', fontSize: 13, color: '#667085',
              }}>
                {p}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#667085' }}>
            <IconShield size={12} />
            Secured by Stripe. Your info is never stored.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onBack} style={backBtnStyle} disabled={loading}>
            <IconBack size={14} /> Back
          </button>
          <button
            onClick={handlePay}
            disabled={loading}
            style={{
              ...nextBtnStyle,
              background: loading ? '#667085' : '#f04438',
              opacity: 1,
              cursor: loading ? 'wait' : 'pointer',
              gap: 8,
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 14, height: 14, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderTopColor: '#fff',
                  display: 'inline-block',
                  animation: 'spin 0.7s linear infinite',
                }} />
                Processing…
              </>
            ) : (
              <>Pay ${game.cost} &amp; Reserve Spot</>
            )}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── SCREEN: confirmed ────────────────────────────────────────────────────────
function ConfirmedScreen({ game, selectedPos, form }) {
  return (
    <div>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #111827 0%, #243447 50%, #12805c 100%)',
        color: '#fff', textAlign: 'center',
        padding: '56px 20px 48px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Confetti dots */}
        {CONFETTI_DOTS.map((dot, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            borderRadius: dot.radius,
            background: dot.background,
            opacity: dot.opacity,
            transform: dot.transform,
          }} />
        ))}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: '#12805c', border: '4px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', position: 'relative', zIndex: 1,
        }}>
          <IconCheck size={36} style={{ color: '#fff' }} />
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display, sans-serif)',
          fontSize: 'clamp(36px, 8vw, 60px)', fontWeight: 700,
          letterSpacing: 2, margin: '0 0 10px',
          position: 'relative', zIndex: 1,
        }}>
          YOU&rsquo;RE IN!
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', margin: 0, position: 'relative', zIndex: 1 }}>
          Your spot is confirmed. See you on the diamond{form.name ? `, ${form.name.split(' ')[0]}` : ''}!
        </p>
      </div>

      {/* Details card */}
      <div style={{ maxWidth: 520, margin: '-20px auto 0', padding: '0 20px 60px', position: 'relative', zIndex: 2 }}>
        <div style={{
          background: '#fff', borderRadius: 16, border: '1px solid #d9e2ec',
          padding: '24px 26px', boxShadow: '0 4px 20px rgba(30,42,53,0.1)',
        }}>
          <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: '#667085', marginBottom: 16 }}>
            Game Details
          </div>
          {[
            { icon: <IconBaseball size={16} />,  label: game.title },
            { icon: <IconCalendar size={16} />, label: `${game.date} · ${game.time}` },
            { icon: <IconPin size={16} />,       label: game.field },
            { icon: <IconUsers size={16} />,     label: `Position: ${selectedPos?.name || '—'}` },
            { icon: <IconDollar size={16} />,    label: `$${game.cost} paid` },
          ].map(({ icon, label }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 0', borderBottom: '1px solid #edf2f7',
              fontSize: 14, color: '#111827',
            }}>
              <span style={{ color: '#667085', flexShrink: 0 }}>{icon}</span>
              {label}
            </div>
          ))}

          {/* Add to calendar / view roster */}
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button style={{
              flex: 1, background: '#f6f7fb', border: '1px solid #d9e2ec',
              borderRadius: 10, padding: '11px 14px', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, color: '#475467',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <IconCalendar size={14} /> Add to Calendar
            </button>
            <button style={{
              flex: 1, background: '#111827', border: 'none',
              borderRadius: 10, padding: '11px 14px', cursor: 'pointer',
              fontSize: 13, fontWeight: 700, color: '#fff',
              fontFamily: 'var(--font-display, sans-serif)',
              letterSpacing: 0.5,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <IconUsers size={14} /> View Roster
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#667085' }}>
          A confirmation will be sent to your phone number on file.
        </div>
      </div>
    </div>
  );
}

// ─── shared button styles ─────────────────────────────────────────────────────
const backBtnStyle = {
  background: '#f6f7fb', border: '1px solid #d9e2ec',
  borderRadius: 10, padding: '11px 16px', cursor: 'pointer',
  fontSize: 13, fontWeight: 600, color: '#475467',
  display: 'flex', alignItems: 'center', gap: 6,
  flexShrink: 0,
};
const nextBtnStyle = {
  flex: 1,
  background: '#f04438', color: '#fff', border: 'none',
  borderRadius: 10, padding: '12px 20px', cursor: 'pointer',
  fontFamily: 'var(--font-display, sans-serif)',
  fontSize: 15, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
};
function inputStyle(val) {
  return {
    width: '100%', padding: '11px 14px',
    border: `1.5px solid ${val ? '#111827' : '#cbd5e1'}`,
    borderRadius: 9, fontSize: 14, color: '#111827',
    background: '#fff', outline: 'none',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
  };
}

// ─── ROOT PAGE ────────────────────────────────────────────────────────────────
export default function GamePage() {
  const router = useRouter();
  const params = useParams();

  const game = { ...MOCK_GAME, id: params?.id };
  const players = MOCK_PLAYERS.slice(0, 7);

  const [screen, setScreen] = React.useState('landing');
  const [selectedPos, setSelectedPos] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', phone: '', age: '', skill: 'casual', waiver: false });

  function patchForm(patch) {
    setForm(prev => ({ ...prev, ...patch }));
  }

  function handleBack() {
    const prev = {
      landing:  null,
      position: 'landing',
      info:     'position',
      waiver:   'info',
      payment:  'waiver',
      confirmed: null,
    }[screen];
    if (prev) setScreen(prev);
    else router.push('/');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fb' }}>
      {screen !== 'confirmed' && (
        <PageHeader game={game} screen={screen} onBack={handleBack} />
      )}

      {screen === 'landing' && (
        <LandingScreen
          game={game}
          players={players}
          onNext={() => setScreen('position')}
        />
      )}

      {screen === 'position' && (
        <PositionScreen
          players={players}
          selectedPos={selectedPos}
          onSelect={setSelectedPos}
          onNext={() => setScreen('info')}
          onBack={handleBack}
        />
      )}

      {screen === 'info' && (
        <InfoScreen
          form={form}
          onChange={patchForm}
          onNext={() => setScreen('waiver')}
          onBack={handleBack}
        />
      )}

      {screen === 'waiver' && (
        <WaiverScreen
          form={form}
          onChange={patchForm}
          onNext={() => setScreen('payment')}
          onBack={handleBack}
        />
      )}

      {screen === 'payment' && (
        <PaymentScreen
          game={game}
          selectedPos={selectedPos}
          form={form}
          onNext={() => setScreen('confirmed')}
          onBack={handleBack}
        />
      )}

      {screen === 'confirmed' && (
        <ConfirmedScreen
          game={game}
          selectedPos={selectedPos}
          form={form}
        />
      )}
    </div>
  );
}
