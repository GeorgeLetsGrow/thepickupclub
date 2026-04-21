'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_PLAYERS, MOCK_GAME } from '@/lib/data';
import { FieldDiagram } from '@/components/FieldDiagram';
import { SideNav } from '@/components/nav/SideNav';
import {
  IconBaseball, IconCalendar, IconClock, IconUsers, IconShare,
  IconPlus, IconMegaphone, IconChevR, IconDollar, IconCheck, IconPin,
} from '@/components/Icons';

// ─── Theme ──────────────────────────────────────────────────────────────────
const theme = {
  fieldGreen: '#4a7c59', fieldDirt: '#c4a882',
  primary: '#1e2a35', accent: '#c4302b',
  ink: '#1e2a35', muted: '#8a8178',
  display: 'var(--font-oswald)', radius: '10px',
  surface: '#fff', line: '#e5e0d8',
  primaryInk: '#fff', accentInk: '#fff',
  success: '#4a7c59', surfaceAlt: '#f5f0e8', inkSoft: '#4a4540',
};

// ─── Position label helper ───────────────────────────────────────────────────
function posLabel(posId) {
  const map = {
    'H-P': 'P', 'H-C': 'C', 'H-1B': '1B', 'H-2B': '2B', 'H-3B': '3B',
    'H-SS': 'SS', 'H-LF': 'LF', 'H-CF': 'CF', 'H-RF': 'RF',
    'A-P': 'P', 'A-C': 'C', 'A-1B': '1B', 'A-2B': '2B', 'A-3B': '3B',
    'A-SS': 'SS', 'A-LF': 'LF', 'A-CF': 'CF', 'A-RF': 'RF',
  };
  return map[posId] || posId;
}

// ─── Avatar initials ─────────────────────────────────────────────────────────
function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

// ─── Mock past games ─────────────────────────────────────────────────────────
const PAST_GAMES = [
  { id: 'pg1', date: 'Apr 12', title: 'Sunday Sluggers', result: 'Home won 12–8',  players: 16 },
  { id: 'pg2', date: 'Apr 5',  title: 'Morning Scrimmage', result: 'Away won 7–4', players: 14 },
  { id: 'pg3', date: 'Mar 29', title: 'Saturday Showdown', result: 'Home won 9–6', players: 18 },
];

// ─── Mock announcements ───────────────────────────────────────────────────────
const MOCK_ANNOUNCEMENTS = [
  { id: 'a1', author: 'Marcus Chen', time: '2h ago', text: 'Weather looking great for Saturday! 74° and sunny.' },
  { id: 'a2', author: 'Marcus Chen', time: '45m ago', text: "We're at 7/18 — share the link with your crew!" },
];

const ROSTER_CAP = 18;
const FILLED_COUNT = 7;
const OPEN_SLOTS = ROSTER_CAP - FILLED_COUNT;

export default function HostPage() {
  const router = useRouter();
  const [showMessage, setShowMessage] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState('');
  const [announcements, setAnnouncements] = React.useState(MOCK_ANNOUNCEMENTS);
  const [copied, setCopied] = React.useState(false);
  const players = MOCK_PLAYERS.slice(0, FILLED_COUNT);

  function handleShare() {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText('https://thepickupclub.app/game/g-8429').catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSendAnnouncement(e) {
    e.preventDefault();
    if (!announcement.trim()) return;
    setAnnouncements(prev => [
      ...prev,
      { id: `a${Date.now()}`, author: 'Marcus Chen', time: 'just now', text: announcement.trim() },
    ]);
    setAnnouncement('');
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* ── Sidebar (desktop) ─────────────────────────────────── */}
      <SideNav activeKey="home" backHref="/" backLabel="Home" />

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-line px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <IconBaseball size={18} />
            <span className="font-display text-sm font-semibold tracking-widest text-navy uppercase leading-none">
              The <span className="text-red">PickUp</span> Club
            </span>
          </Link>
          <Link
            href="/host/create"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red text-white rounded-lg font-display text-xs tracking-widest uppercase"
          >
            <IconPlus size={14} stroke={2.5} /> New
          </Link>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-6 pb-24 lg:pb-8">

          {/* ── Header row ──────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-display text-3xl font-bold tracking-wider text-navy uppercase">
              Your Games
            </h1>
            <Link
              href="/host/create"
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-red text-white rounded-xl font-display text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              <IconPlus size={15} stroke={2.5} /> New Game
            </Link>
          </div>

          {/* ── Active game card ────────────────────────────────── */}
          <div className="bg-navy text-white rounded-2xl p-6 mb-4">
            {/* Live badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="font-display text-xs tracking-widest uppercase text-green-400">
                Live Signup · {OPEN_SLOTS} Spots Left
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-2xl font-bold tracking-wide uppercase mb-3">
              {MOCK_GAME.title}
            </h2>

            {/* Date / time / field */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/70 text-sm mb-4">
              <span className="flex items-center gap-1.5">
                <IconCalendar size={14} /> {MOCK_GAME.date}
              </span>
              <span className="flex items-center gap-1.5">
                <IconClock size={14} /> {MOCK_GAME.time} – {MOCK_GAME.endTime}
              </span>
              <span className="flex items-center gap-1.5">
                <IconPin size={14} /> {MOCK_GAME.field}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-white/60 font-display tracking-widest uppercase mb-1.5">
                <span>{FILLED_COUNT} signed up</span>
                <span>{ROSTER_CAP} max</span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-red transition-all"
                  style={{ width: `${(FILLED_COUNT / ROSTER_CAP) * 100}%` }}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-stretch divide-x divide-white/20 border border-white/20 rounded-xl overflow-hidden">
              <a
                href="#roster"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 font-display text-xs tracking-widest uppercase text-white/80 hover:bg-white/10 transition-colors"
              >
                <IconUsers size={15} /> Roster
              </a>
              <button
                onClick={() => setShowMessage(v => !v)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 font-display text-xs tracking-widest uppercase text-white/80 hover:bg-white/10 transition-colors"
              >
                <IconMegaphone size={15} /> Message
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 font-display text-xs tracking-widest uppercase text-white/80 hover:bg-white/10 transition-colors"
              >
                {copied ? <IconCheck size={15} /> : <IconShare size={15} />}
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
          </div>

          {/* ── Quick message panel ─────────────────────────────── */}
          {showMessage && (
            <div className="bg-white border border-line rounded-2xl p-4 mb-4">
              <h3 className="font-display text-xs tracking-widest uppercase text-muted mb-3">
                Send to all players
              </h3>
              <form onSubmit={handleSendAnnouncement} className="flex gap-2">
                <input
                  type="text"
                  value={announcement}
                  onChange={e => setAnnouncement(e.target.value)}
                  placeholder="e.g. Bring extra water today…"
                  className="flex-1 bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-navy placeholder:text-muted focus:border-navy outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-red text-white rounded-xl font-display text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {/* ── Stats row ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { icon: <IconDollar size={16} />, label: 'Paid', value: '$70', sub: '7 × $10' },
              { icon: <IconUsers size={16} />,  label: 'Spots', value: `${FILLED_COUNT}/${ROSTER_CAP}`, sub: `${OPEN_SLOTS} open` },
              { icon: <span className="text-base">🌤</span>,   label: 'Weather', value: '74°', sub: 'Sunny' },
              { icon: <IconCalendar size={16} />, label: 'Days Away', value: '5', sub: 'Sat Apr 26' },
            ].map(({ icon, label, value, sub }) => (
              <div key={label} className="bg-white border border-line rounded-2xl px-4 py-3 flex items-center gap-3">
                <span className="text-muted">{icon}</span>
                <div>
                  <div className="font-display text-xs tracking-widest uppercase text-muted leading-none mb-0.5">
                    {label}
                  </div>
                  <div className="font-display text-lg font-bold text-navy leading-none">
                    {value}
                  </div>
                  <div className="text-xs text-muted mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Field diagram ───────────────────────────────────── */}
          <div id="roster" className="bg-white border border-line rounded-2xl overflow-hidden mb-4">
            <div className="px-5 pt-5 pb-2 flex items-center justify-between">
              <h2 className="font-display text-sm tracking-widest uppercase text-navy">
                Field View
              </h2>
              <span className="font-display text-xs tracking-widest uppercase text-muted">
                Home side
              </span>
            </div>
            <FieldDiagram
              theme={theme}
              players={players}
              team="home"
              height={280}
            />
          </div>

          {/* ── Roster ──────────────────────────────────────────── */}
          <div className="bg-white border border-line rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-line flex items-center justify-between">
              <h2 className="font-display text-sm tracking-widest uppercase text-navy">
                Roster · {FILLED_COUNT}/{ROSTER_CAP}
              </h2>
              <span className="font-display text-xs tracking-widest uppercase text-muted">
                {OPEN_SLOTS} open
              </span>
            </div>

            <ul className="divide-y divide-line">
              {players.map(player => (
                <li key={player.id} className="flex items-center gap-3 px-5 py-3">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: player.avatar }}
                  >
                    {initials(player.name)}
                  </div>
                  {/* Name */}
                  <span className="flex-1 text-sm font-medium text-navy truncate">
                    {player.name}
                  </span>
                  {/* Position badge */}
                  <span className="font-display text-xs tracking-widest uppercase px-2 py-0.5 bg-cream text-ink-soft rounded-md border border-line">
                    {posLabel(player.position)}
                  </span>
                  {/* Paid badge */}
                  {player.paid && (
                    <span className="flex items-center gap-1 font-display text-xs tracking-widest uppercase text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
                      <IconCheck size={11} stroke={2.5} /> Paid
                    </span>
                  )}
                </li>
              ))}

              {/* Open slots */}
              {Array.from({ length: OPEN_SLOTS }).map((_, i) => (
                <li
                  key={`open-${i}`}
                  className="flex items-center gap-3 px-5 py-3 opacity-40"
                >
                  <div className="w-9 h-9 rounded-full border-2 border-dashed border-line shrink-0" />
                  <span className="text-sm text-muted italic">— Open slot</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Announcements ───────────────────────────────────── */}
          <div className="bg-white border border-line rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-line">
              <h2 className="font-display text-sm tracking-widest uppercase text-navy">
                Announcements
              </h2>
            </div>

            {/* Message list */}
            <ul className="divide-y divide-line px-5">
              {announcements.map(msg => (
                <li key={msg.id} className="py-3">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-display text-xs tracking-widest uppercase text-navy">
                      {msg.author}
                    </span>
                    <span className="text-xs text-muted shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">{msg.text}</p>
                </li>
              ))}
            </ul>

            {/* Compose */}
            <div className="px-5 py-4 border-t border-line">
              <form onSubmit={handleSendAnnouncement} className="flex gap-2">
                <input
                  type="text"
                  value={announcement}
                  onChange={e => setAnnouncement(e.target.value)}
                  placeholder="Send an update to all players…"
                  className="flex-1 bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-navy placeholder:text-muted focus:border-navy outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-navy text-white rounded-xl font-display text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* ── Past games ──────────────────────────────────────── */}
          <div className="bg-white border border-line rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-line">
              <h2 className="font-display text-sm tracking-widest uppercase text-navy">
                Past Games
              </h2>
            </div>
            <ul className="divide-y divide-line">
              {PAST_GAMES.map(game => (
                <li key={game.id}>
                  <button
                    onClick={() => router.push(`/game/${game.id}`)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-cream transition-colors text-left"
                  >
                    {/* Date badge */}
                    <div className="shrink-0 w-12 text-center">
                      <div className="bg-navy text-white rounded-lg px-2 py-1.5">
                        <div className="font-display text-xs tracking-widest uppercase leading-none text-white/60">
                          {game.date.split(' ')[0]}
                        </div>
                        <div className="font-display text-lg font-bold leading-none">
                          {game.date.split(' ')[1]}
                        </div>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm font-semibold tracking-wide text-navy uppercase truncate">
                        {game.title}
                      </div>
                      <div className="text-xs text-muted mt-0.5">{game.result}</div>
                    </div>
                    {/* Players */}
                    <div className="flex items-center gap-1.5 text-xs text-muted shrink-0">
                      <IconUsers size={13} /> {game.players}
                    </div>
                    <IconChevR size={16} className="text-muted shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </main>
      </div>
    </div>
  );
}
