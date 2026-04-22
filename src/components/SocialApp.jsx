'use client';
import React from 'react';
import { IOSStatusBar } from './IOSFrame';
import { Avatar, Chip, Button, Card } from './PhoneShell';
import {
  IconBaseball, IconPin, IconClock, IconCheck, IconDollar, IconChat, IconShare,
  IconX, IconChevR, IconSun, IconCloud, IconPlus, IconMegaphone,
  IconHome, IconSearch, IconReel, IconCreateTab, IconProfileTab,
  IconHeart, IconComment, IconBookmark, IconMute, IconFilter, IconMap, IconList,
  IconBell, IconTrophy, IconSettings,
} from './Icons';

const MOCK_ME = {
  id: 'me', name: 'You', handle: '@you',
  avatar: '#f97316',
  stats: { games: 14, hits: 28, rbi: 19, innings: 42 },
  positions: ['SS', '2B', 'CF'],
  skill: 'solid',
};

const MOCK_UPCOMING = [
  { id: 'g1', title: 'Saturday Morning Scrimmage', date: 'Sat · Apr 26', time: '10:00 AM',
    field: 'Bullfrog Creek Park · D1', filled: 11, cap: 18, myPos: 'Shortstop', myTeam: 'Home',
    host: 'Marcus Chen', hostAvatar: '#f97316', cost: 10, paid: true,
    weather: { temp: 74, icon: 'sun' } },
  { id: 'g2', title: 'Tuesday Night Pickup', date: 'Tue · Apr 29', time: '6:30 PM',
    field: 'Gibsonton Community Field', filled: 14, cap: 18, myPos: '2nd Base', myTeam: 'Away',
    host: 'Tony Russo', hostAvatar: '#2563eb', cost: 10, paid: true,
    weather: { temp: 71, icon: 'cloud' } },
];

const MOCK_NEARBY = [
  { id: 'n1', title: 'Sunday Fundays', date: 'Sun · Apr 27', time: '9:00 AM',
    field: '13012 Bullfrog Creek Rd', distance: '0.0 mi', filled: 7, cap: 18, cost: 10,
    host: 'Jake P.', hostAvatar: '#a16207', level: 'All levels', tags: ['Kid-friendly', 'Slow-pitch'] },
  { id: 'n2', title: 'Wednesday Wipeout', date: 'Wed · Apr 30', time: '7:00 PM',
    field: 'Bullfrog Creek Park · Field 2', distance: '0.4 mi', filled: 15, cap: 18, cost: 12,
    host: 'Derek W.', hostAvatar: '#1d4ed8', level: 'Ringer', tags: ['Competitive'] },
  { id: 'n3', title: 'Kids Clinic · Ages 6–9', date: 'Sat · Apr 26', time: '8:00 AM',
    field: 'Gibsonton Youth Baseball', distance: '1.6 mi', filled: 9, cap: 20, cost: 5,
    host: 'Coach Martinez', hostAvatar: '#12805c', level: 'Rookie', tags: ['Kids', 'Coached'] },
  { id: 'n4', title: 'Thursday Throwdown', date: 'Thu · May 1', time: '6:00 PM',
    field: 'South Shore Sports Complex', distance: '4.8 mi', filled: 4, cap: 18, cost: 10,
    host: 'Lin W.', hostAvatar: '#b45309', level: 'All levels', tags: ['Co-ed'] },
];

const MOCK_FEED = [
  { id: 'f1', author: 'Marcus Chen', authorColor: '#f97316', time: '2h',
    gameTitle: 'Saturday Morning Scrimmage', kind: 'highlight',
    caption: 'Derek with an absolute rocket to the gap — easy triple.',
    likes: 47, comments: 8, liked: false,
    mediaTag: 'HIGHLIGHT', mediaBg: '#1d4ed8' },
  { id: 'f2', author: 'Tony Russo', authorColor: '#2563eb', time: '5h',
    gameTitle: 'Tuesday Night Pickup', kind: 'recap',
    caption: 'GG everyone. Home team takes it 8-6. Next week we run it back.',
    likes: 23, comments: 4, liked: true,
    statsLine: 'Final: Home 8 · Away 6', statsBg: '#12805c' },
  { id: 'f3', author: 'Sam Torres', authorColor: '#12805c', time: '1d',
    gameTitle: 'Last Saturday', kind: 'photo',
    caption: "Team pic after a beautiful day at the field. Can't beat this crew.",
    likes: 62, comments: 12, liked: false,
    mediaTag: 'TEAM PHOTO', mediaBg: '#a16207' },
];

const MOCK_REELS = [
  { id: 'r1', author: 'Derek W.', authorColor: '#1d4ed8',
    caption: 'Triple to right-center #ThePickUpClub',
    likes: 234, comments: 18, plays: '2.1K',
    label: 'TRIPLE TO THE GAP', bg: '#1d4ed8', accent: '#f04438' },
  { id: 'r2', author: 'Marcus C.', authorColor: '#f97316',
    caption: 'Diving catch saves the inning',
    likes: 512, comments: 34, plays: '4.8K',
    label: 'WEB GEM', bg: '#12805c', accent: '#dbeafe' },
  { id: 'r3', author: 'Sam T.', authorColor: '#12805c',
    caption: 'First homer of the season for Jake!',
    likes: 891, comments: 67, plays: '12K',
    label: 'GOING, GOING, GONE', bg: '#f04438', accent: '#ffd94a' },
];

const MOCK_ACTIVITY = [
  { id: 'a1', kind: 'signup',  text: 'Derek W. signed up for your game',          time: '12m', color: '#1d4ed8' },
  { id: 'a2', kind: 'waitlist',text: 'Luis O. joined the waitlist',                time: '28m', color: '#ea580c' },
  { id: 'a3', kind: 'message', text: 'Marcus posted in Saturday Scrimmage',        time: '1h',  color: '#f97316' },
  { id: 'a4', kind: 'payment', text: 'Payment from Jake P. received ($10)',        time: '2h',  color: '#12805c' },
];

const POSITIONS_HEAT = [
  { id: 'P',  short: 'P',  x: 50, y: 50 },
  { id: 'C',  short: 'C',  x: 50, y: 82 },
  { id: '1B', short: '1B', x: 74, y: 62 },
  { id: '2B', short: '2B', x: 64, y: 43 },
  { id: '3B', short: '3B', x: 26, y: 62 },
  { id: 'SS', short: 'SS', x: 36, y: 43 },
  { id: 'LF', short: 'LF', x: 18, y: 28 },
  { id: 'CF', short: 'CF', x: 50, y: 18 },
  { id: 'RF', short: 'RF', x: 82, y: 28 },
];

export function SocialApp({ theme, initialTab = 'home', reelIndex = 0, onGameClick, onNewGame, onHostDashboard }) {
  const [tab, setTab] = React.useState(initialTab);
  const [createOpen, setCreateOpen] = React.useState(initialTab === 'create');

  return (
    <div style={{
      width: 402, height: 874, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: theme.bg,
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: theme.body, color: theme.ink,
      WebkitFontSmoothing: 'antialiased',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar dark={theme.bg === '#0f1419'} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {tab === 'home'    && <HomeTab    theme={theme} onGameClick={onGameClick} onHostDashboard={onHostDashboard} />}
        {tab === 'find'    && <FindTab    theme={theme} onGameClick={onGameClick} />}
        {tab === 'reel'    && <ReelTab    theme={theme} initialIndex={reelIndex} />}
        {tab === 'profile' && <ProfileTab theme={theme} onHostDashboard={onHostDashboard} />}
      </div>
      {createOpen && <CreateSheet theme={theme} onClose={() => { setCreateOpen(false); setTab('home'); }} onNewGame={onNewGame} />}
      <TabBar theme={theme} tab={tab} setTab={setTab} onCreate={() => setCreateOpen(true)} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60, height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 8, pointerEvents: 'none' }}>
        <div style={{ width: 139, height: 5, borderRadius: 100, background: theme.bg === '#0f1419' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)' }} />
      </div>
    </div>
  );
}

function TabBar({ theme: t, tab, setTab, onCreate }) {
  const items = [
    { id: 'home',    label: 'Home',   Icon: IconHome },
    { id: 'find',    label: 'Find',   Icon: IconSearch },
    { id: 'create',  label: 'Create', Icon: IconCreateTab, isCreate: true },
    { id: 'reel',    label: 'Reel',   Icon: IconReel },
    { id: 'profile', label: 'Me',     Icon: IconProfileTab },
  ];
  return (
    <div style={{ position: 'relative', zIndex: 40, paddingBottom: 30, paddingTop: 8, background: t.bg, borderTop: `1px solid ${t.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      {items.map(item => {
        const active = tab === item.id;
        if (item.isCreate) {
          return (
            <button key={item.id} onClick={onCreate} style={{ width: 44, height: 44, borderRadius: 12, border: 'none', background: t.accent, color: t.accentInk, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${t.accent}55` }}>
              <IconPlus size={26} stroke={2.4} />
            </button>
          );
        }
        return (
          <button key={item.id} onClick={() => setTab(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 8px', color: active ? t.ink : t.muted }}>
            <item.Icon size={24} filled={active} />
            <div style={{ fontSize: 10, fontFamily: t.display, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: active ? 600 : 400, opacity: active ? 1 : 0.7 }}>{item.label}</div>
          </button>
        );
      })}
    </div>
  );
}

function HomeTab({ theme: t, onGameClick, onHostDashboard }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingTop: 54 }}>
      <div style={{ padding: '10px 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: t.display, fontSize: 24, fontWeight: 600, letterSpacing: -0.4, textTransform: 'uppercase', color: t.ink }}>
          The <span style={{ color: t.accent }}>PickUp</span> Club
        </div>
        <div style={{ display: 'flex', gap: 6, color: t.ink }}>
          <IconBtn t={t}><IconBell size={22} /></IconBtn>
          <IconBtn t={t} dot={t.accent}><IconChat size={22} /></IconBtn>
        </div>
      </div>

      <div style={{ padding: '10px 0 0' }}>
        <SectionLabel t={t} label="Your Next Games" pad />
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 18px 16px', scrollSnapType: 'x mandatory' }}>
          {MOCK_UPCOMING.map(g => <UpcomingCard key={g.id} t={t} g={g} onGameClick={onGameClick} />)}
        </div>
      </div>

      <div style={{ padding: '4px 18px 8px' }}>
        <SectionLabel t={t} label="Activity" />
        <Card theme={t} pad={0}>
          {MOCK_ACTIVITY.map((a, i) => (
            <div key={a.id} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < MOCK_ACTIVITY.length - 1 ? `1px solid ${t.line}` : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                {a.kind === 'signup'   && <IconCheck size={18} />}
                {a.kind === 'waitlist' && <IconClock size={18} />}
                {a.kind === 'message'  && <IconChat size={18} />}
                {a.kind === 'payment'  && <IconDollar size={18} />}
              </div>
              <div style={{ flex: 1, fontSize: 13, color: t.ink, lineHeight: 1.3 }}>{a.text}</div>
              <div style={{ fontSize: 11, color: t.muted }}>{a.time}</div>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ padding: '12px 0 20px' }}>
        <SectionLabel t={t} label="From Your Games" pad />
        {MOCK_FEED.map(p => <FeedPost key={p.id} t={t} p={p} />)}
      </div>
    </div>
  );
}

function UpcomingCard({ t, g, onGameClick }) {
  const pct = Math.round((g.filled / g.cap) * 100);
  return (
    <div onClick={() => onGameClick && onGameClick(g.id)} style={{ minWidth: 300, background: t.surface, border: `1px solid ${t.line}`, borderRadius: t.radius, padding: 14, scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', gap: 10, cursor: onGameClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontFamily: t.display, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: t.accent, fontWeight: 600 }}>{g.date} · {g.time}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: t.muted }}>
          {g.weather.icon === 'sun' ? <IconSun size={14} /> : <IconCloud size={14} />}
          <span style={{ fontSize: 11, fontWeight: 600 }}>{g.weather.temp}°</span>
        </div>
      </div>
      <div style={{ fontFamily: t.display, fontSize: 20, fontWeight: 600, letterSpacing: -0.2, textTransform: 'uppercase', lineHeight: 1.1, color: t.ink }}>{g.title}</div>
      <div style={{ fontSize: 12, color: t.inkSoft, display: 'flex', alignItems: 'center', gap: 4 }}><IconPin size={13} /> {g.field}</div>
      <div style={{ padding: 10, borderRadius: 8, background: t.surfaceAlt, border: `1px solid ${t.line}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: t.ink, color: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.display, fontSize: 14, fontWeight: 600 }}>{g.myPos.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: t.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>You're playing</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{g.myPos} · {g.myTeam}</div>
        </div>
        {g.paid && <Chip theme={t} tone="success" size="sm">Paid</Chip>}
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: t.muted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Roster</span>
          <span style={{ color: t.ink, fontWeight: 600 }}>{g.filled}/{g.cap}</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: t.line, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: t.accent }} />
        </div>
      </div>
    </div>
  );
}

function FeedPost({ t, p }) {
  return (
    <div style={{ borderBottom: `1px solid ${t.line}`, padding: '14px 0 10px' }}>
      <div style={{ padding: '0 18px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={p.author} color={p.authorColor} size={32} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{p.author}</div>
          <div style={{ fontSize: 11, color: t.muted }}>{p.gameTitle} · {p.time}</div>
        </div>
      </div>
      <div style={{ aspectRatio: '4 / 5', background: p.mediaBg || p.statsBg, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,.05) 0 12px, rgba(255,255,255,.02) 12px 24px)` }} />
        {p.kind === 'recap' ? (
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontFamily: t.display, fontSize: 12, letterSpacing: 2, opacity: 0.7, marginBottom: 8 }}>FINAL</div>
            <div style={{ fontFamily: t.display, fontSize: 56, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>8 <span style={{ opacity: 0.6, fontSize: 28, margin: '0 10px' }}>—</span> 6</div>
          </div>
        ) : (
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontFamily: t.display, fontSize: 10, letterSpacing: 3, opacity: 0.5 }}>{p.mediaTag}</div>
            <div style={{ marginTop: 16, width: 72, height: 72, borderRadius: 36, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px auto', border: '2px solid rgba(255,255,255,0.35)' }}>
              <div style={{ width: 0, height: 0, borderLeft: '18px solid #fff', borderTop: '11px solid transparent', borderBottom: '11px solid transparent', marginLeft: 4 }} />
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: '10px 14px 2px', display: 'flex', alignItems: 'center', gap: 14, color: t.ink }}>
        <IconHeart size={24} filled={p.liked} style={{ color: p.liked ? t.accent : t.ink, cursor: 'pointer' }} />
        <IconComment size={22} />
        <IconShare size={22} />
        <div style={{ flex: 1 }} />
        <IconBookmark size={22} />
      </div>
      <div style={{ padding: '4px 18px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{p.likes.toLocaleString()} likes</div>
        <div style={{ fontSize: 13, color: t.ink, lineHeight: 1.4, marginTop: 4 }}><span style={{ fontWeight: 600 }}>{p.author}</span> {p.caption}</div>
        <div style={{ fontSize: 12, color: t.muted, marginTop: 4, cursor: 'pointer' }}>View all {p.comments} comments</div>
      </div>
    </div>
  );
}

function FindTab({ theme: t, onGameClick }) {
  const [view, setView] = React.useState('list');
  const [filter, setFilter] = React.useState('all');
  const filters = [
    { id: 'all', label: 'All' }, { id: 'today', label: 'Today' },
    { id: 'kids', label: 'Kids' }, { id: 'casual', label: 'Casual' },
    { id: 'comp', label: 'Competitive' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 54 }}>
      <div style={{ padding: '8px 18px 10px' }}>
        <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: 600, letterSpacing: -0.3, textTransform: 'uppercase', color: t.ink, marginBottom: 10 }}>Find a Game</div>
        <div style={{ background: t.surfaceAlt, border: `1px solid ${t.line}`, borderRadius: t.radius, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconSearch size={18} style={{ color: t.muted }} />
          <div style={{ flex: 1, fontSize: 13, color: t.muted }}>Search by field, host, or city…</div>
          <IconFilter size={18} style={{ color: t.muted }} />
        </div>
      </div>
      <div style={{ padding: '0 18px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', flex: 1 }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '6px 12px', borderRadius: 999, whiteSpace: 'nowrap', background: filter === f.id ? t.ink : t.surface, color: filter === f.id ? t.bg : t.inkSoft, border: `1px solid ${filter === f.id ? t.ink : t.line}`, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: t.body }}>{f.label}</button>
          ))}
        </div>
        <button onClick={() => setView(view === 'list' ? 'map' : 'list')} style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: t.ink, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontFamily: t.body }}>
          {view === 'list' ? <><IconMap size={16} /> Map</> : <><IconList size={16} /> List</>}
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: view === 'map' ? 0 : '0 18px 20px' }}>
        {view === 'list' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MOCK_NEARBY.map(n => <NearbyCard key={n.id} t={t} n={n} onGameClick={onGameClick} />)}
          </div>
        ) : <MapView t={t} onGameClick={onGameClick} />}
      </div>
    </div>
  );
}

function NearbyCard({ t, n, onGameClick }) {
  const pct = Math.round((n.filled / n.cap) * 100);
  const almostFull = pct >= 80;
  return (
    <div onClick={() => onGameClick && onGameClick(n.id)} style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: t.radius, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, cursor: onGameClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: t.display, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: t.accent, fontWeight: 600, marginBottom: 2 }}>{n.date} · {n.time}</div>
          <div style={{ fontFamily: t.display, fontSize: 17, fontWeight: 600, textTransform: 'uppercase', letterSpacing: -0.1, color: t.ink }}>{n.title}</div>
          <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 2 }}>{n.field} · {n.distance}</div>
        </div>
        <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: 600, color: almostFull ? t.accent : t.ink }}>${n.cost}</div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {n.tags.map(tag => (
          <span key={tag} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, background: t.surfaceAlt, color: t.inkSoft, border: `1px solid ${t.line}`, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 8, borderTop: `1px solid ${t.line}` }}>
        <Avatar name={n.host} color={n.hostAvatar} size={24} />
        <div style={{ fontSize: 12, color: t.inkSoft, flex: 1 }}>Hosted by <b style={{ color: t.ink }}>{n.host}</b></div>
        <div style={{ fontSize: 11, color: almostFull ? t.accent : t.muted, fontWeight: 600 }}>
          {almostFull ? `Only ${n.cap - n.filled} spots!` : `${n.filled}/${n.cap} signed up`}
        </div>
      </div>
    </div>
  );
}

function MapView({ t, onGameClick }) {
  return (
    <div style={{ position: 'relative', height: '100%', background: t.surfaceAlt, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${t.line} 1px, transparent 1px), linear-gradient(90deg, ${t.line} 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.5 }} />
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <path d="M0 200 Q 200 180 402 220" stroke={t.line} strokeWidth="18" fill="none" opacity="0.5" />
        <path d="M150 0 L 180 500 L 120 800" stroke={t.line} strokeWidth="14" fill="none" opacity="0.5" />
        <path d="M0 450 L 402 430" stroke={t.line} strokeWidth="12" fill="none" opacity="0.5" />
      </svg>
      {[
        { x: 80,  y: 180, game: MOCK_NEARBY[0] },
        { x: 200, y: 320, game: MOCK_NEARBY[1], highlight: true },
        { x: 300, y: 150, game: MOCK_NEARBY[2] },
        { x: 120, y: 450, game: MOCK_NEARBY[3] },
      ].map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: p.highlight ? 48 : 36, height: p.highlight ? 48 : 36, borderRadius: p.highlight ? 14 : 10, background: p.highlight ? t.accent : t.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.display, fontSize: p.highlight ? 14 : 12, fontWeight: 600, boxShadow: '0 4px 10px rgba(0,0,0,0.25)' }}>${p.game.cost}</div>
          <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `8px solid ${p.highlight ? t.accent : t.ink}` }} />
        </div>
      ))}
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12 }}>
        <NearbyCard t={t} n={MOCK_NEARBY[1]} onGameClick={onGameClick} />
      </div>
    </div>
  );
}

function ReelTab({ theme: t, initialIndex = 0 }) {
  const [idx, setIdx] = React.useState(initialIndex);
  const reel = MOCK_REELS[idx] || MOCK_REELS[0];
  return (
    <div style={{ flex: 1, background: '#000', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: reel.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,.04) 0 12px, rgba(255,255,255,.01) 12px 24px)` }} />
        <div style={{ width: 180, height: 180, borderRadius: 90, border: `3px solid ${reel.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', opacity: 0.18 }}>
          <div style={{ width: 130, height: 130, borderRadius: 65, border: `2px solid ${reel.accent}` }} />
        </div>
        <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontFamily: t.display, fontSize: 12, letterSpacing: 3, opacity: 0.7, marginBottom: 6 }}>
            {reel.id === 'r3' ? 'BOTTOM OF THE 7TH' : reel.id === 'r2' ? 'DEEP TO CENTER' : 'LINE DRIVE · RIGHT'}
          </div>
          <div style={{ fontFamily: t.display, fontSize: 40, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>{reel.label}</div>
        </div>
        <div style={{ width: 70, height: 70, borderRadius: 35, background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ width: 0, height: 0, borderLeft: '20px solid #fff', borderTop: '13px solid transparent', borderBottom: '13px solid transparent', marginLeft: 5 }} />
        </div>
        <div style={{ position: 'absolute', top: 50, left: 12, right: 12, display: 'flex', gap: 4 }}>
          {MOCK_REELS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 2, borderRadius: 1, background: i === idx ? '#fff' : 'rgba(255,255,255,0.35)' }} />
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
        <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: 600, color: '#fff', letterSpacing: 0.5, textTransform: 'uppercase' }}>Reel</div>
        <div style={{ display: 'flex', gap: 6, color: '#fff' }}>
          <div style={{ padding: 6 }}><IconMute size={20} /></div>
          <div style={{ padding: 6 }}><IconSearch size={20} /></div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 16, bottom: 120, right: 80, color: '#fff', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Avatar name={reel.author} color={reel.authorColor} size={34} ring="#fff" />
          <div style={{ fontSize: 14, fontWeight: 600 }}>{reel.author}</div>
          <div style={{ padding: '4px 10px', border: '1.5px solid #fff', borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, cursor: 'pointer' }}>Follow</div>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.4, marginBottom: 8, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{reel.caption}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: 999, fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          <IconBaseball size={12} /> {reel.plays} plays
        </div>
      </div>
      <div style={{ position: 'absolute', right: 12, bottom: 120, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center', color: '#fff', zIndex: 5 }}>
        <div style={{ textAlign: 'center' }}>
          <IconHeart size={28} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }} />
          <div style={{ fontSize: 11, marginTop: 3, fontWeight: 600 }}>{reel.likes}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <IconComment size={26} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }} />
          <div style={{ fontSize: 11, marginTop: 3, fontWeight: 600 }}>{reel.comments}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <IconShare size={26} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }} />
          <div style={{ fontSize: 11, marginTop: 3, fontWeight: 600 }}>Share</div>
        </div>
        <div><IconBookmark size={26} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }} /></div>
      </div>
      <div style={{ position: 'absolute', right: 12, top: '45%', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 5 }}>
        <button onClick={() => setIdx(Math.max(0, idx - 1))} style={{ width: 32, height: 32, borderRadius: 16, background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-90deg)' }}><IconChevR size={18} /></button>
        <button onClick={() => setIdx(Math.min(MOCK_REELS.length - 1, idx + 1))} style={{ width: 32, height: 32, borderRadius: 16, background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(90deg)' }}><IconChevR size={18} /></button>
      </div>
    </div>
  );
}

function ProfileTab({ theme: t, onHostDashboard }) {
  const me = MOCK_ME;
  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingTop: 54 }}>
      <div style={{ padding: '10px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: t.display, fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{me.handle}</div>
        <IconBtn t={t}><IconSettings size={20} /></IconBtn>
      </div>
      <div style={{ padding: '18px 18px 8px', display: 'flex', gap: 18, alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Avatar name="You Y" color={me.avatar} size={86} />
          <div style={{ position: 'absolute', bottom: -2, right: -2, width: 28, height: 28, borderRadius: 14, background: t.accent, color: '#fff', border: `3px solid ${t.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.display, fontSize: 11, fontWeight: 700 }}>14</div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around' }}>
          {[{ v: me.stats.games, l: 'Games' }, { v: me.stats.hits, l: 'Hits' }, { v: me.stats.rbi, l: 'RBI' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: 600, color: t.ink }}>{s.v}</div>
              <div style={{ fontSize: 10, color: t.muted, textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 18px 16px' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.ink }}>Jamie Rodriguez</div>
        <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 2 }}>Gibsonton, FL · Plays casual-to-solid</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {me.positions.map(p => (
            <span key={p} style={{ fontFamily: t.display, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6, background: t.ink, color: t.bg, letterSpacing: 0.5 }}>{p}</span>
          ))}
          <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6, background: t.surfaceAlt, color: t.inkSoft, border: `1px solid ${t.line}`, letterSpacing: 0.3, textTransform: 'uppercase' }}>{me.stats.innings} innings</span>
        </div>
      </div>
      <div style={{ padding: '0 18px 16px', display: 'flex', gap: 8 }}>
        <Button theme={t} variant="surface" size="sm" style={{ flex: 1, border: `1px solid ${t.line}` }}>Edit Profile</Button>
        {onHostDashboard && (
          <Button theme={t} variant="primary" size="sm" style={{ flex: 1 }} onClick={onHostDashboard}>My Games</Button>
        )}
      </div>
      <div style={{ padding: '0 18px 16px' }}>
        <SectionLabel t={t} label="Positions Played" />
        <PositionHeatmap t={t} />
      </div>
      <ProfileGrid t={t} />
    </div>
  );
}

function PositionHeatmap({ t }) {
  const heat = { P: 2, C: 0, '1B': 1, '2B': 6, '3B': 0, SS: 8, LF: 0, CF: 4, RF: 1 };
  const max = Math.max(...Object.values(heat));
  return (
    <Card theme={t} pad={14}>
      <div style={{ position: 'relative', aspectRatio: '3/2', background: t.fieldGreen, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-30%', left: '50%', width: '90%', height: '90%', transform: 'translateX(-50%)', borderRadius: '50%', background: t.fieldDirt }} />
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 12, height: 12, background: '#fff' }} />
        {POSITIONS_HEAT.map(p => {
          const count = heat[p.id] || 0;
          const intensity = count / max;
          return (
            <div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)', width: 30 + intensity * 20, height: 30 + intensity * 20, borderRadius: '50%', background: count > 0 ? t.accent : 'rgba(255,255,255,0.7)', color: count > 0 ? '#fff' : t.muted, opacity: count > 0 ? (0.4 + intensity * 0.6) : 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.display, fontSize: 10, fontWeight: 600, border: count > 0 ? `2px solid ${t.accent}` : `1.5px solid rgba(255,255,255,0.8)` }}>{p.short}</div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: t.muted }}>
        <span>Most played: <b style={{ color: t.ink }}>Shortstop (8)</b></span>
        <span>Across 14 games</span>
      </div>
    </Card>
  );
}

function ProfileGrid({ t }) {
  const [sub, setSub] = React.useState('grid');
  const colors = ['#1d4ed8', '#12805c', '#f04438', '#a16207', '#0891b2', '#2563eb', '#ea580c', '#475569', '#15803d'];
  const labels = ['APR 20', 'APR 13', 'APR 6', 'MAR 30', 'MAR 23', 'MAR 16', 'MAR 9', 'MAR 2', 'FEB 23'];
  return (
    <>
      <div style={{ display: 'flex', borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, marginTop: 4 }}>
        {[{ id: 'grid', label: 'Games' }, { id: 'highlights', label: 'Highlights' }, { id: 'saved', label: 'Saved' }].map(s => (
          <button key={s.id} onClick={() => setSub(s.id)} style={{ flex: 1, padding: '12px 0', background: 'transparent', border: 'none', borderBottom: sub === s.id ? `2px solid ${t.ink}` : '2px solid transparent', cursor: 'pointer', color: sub === s.id ? t.ink : t.muted, fontFamily: t.display, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, padding: 2 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{ aspectRatio: '1', background: colors[i], position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 6, color: '#fff', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,.05) 0 8px, rgba(255,255,255,.02) 8px 16px)` }} />
            <div style={{ position: 'relative', fontFamily: t.display, fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{labels[i]}</div>
            {i === 0 && (
              <div style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: 10, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>▶</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function CreateSheet({ theme: t, onClose, onNewGame }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ background: t.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 60 }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: t.line, margin: '8px auto 4px' }} />
        <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Create</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: t.muted, cursor: 'pointer' }}><IconX size={22} /></button>
        </div>
        <div style={{ padding: '0 18px' }}>
          {[
            { icon: <IconBaseball size={22} />, title: 'New Game',    sub: 'Create a pickup game, share the link', accent: true, action: onNewGame },
            { icon: <IconReel size={22} />,     title: 'New Reel',    sub: 'Post a highlight from a game' },
            { icon: <IconChat size={22} />,     title: 'New Post',    sub: 'Photo, recap, or announcement' },
            { icon: <IconMegaphone size={22} />,title: 'Announcement',sub: 'Message players in one of your games' },
          ].map((item, i) => (
            <button key={i} onClick={item.action || undefined} style={{ width: '100%', padding: 14, marginBottom: 8, background: item.accent ? t.accent : t.surface, color: item.accent ? t.accentInk : t.ink, border: `1px solid ${item.accent ? t.accent : t.line}`, borderRadius: t.radius, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', fontFamily: t.body }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: item.accent ? 'rgba(255,255,255,0.2)' : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: t.display, fontSize: 15, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' }}>{item.title}</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>{item.sub}</div>
              </div>
              <IconChevR size={20} style={{ opacity: 0.6 }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function IconBtn({ t, children, dot }) {
  return (
    <div style={{ position: 'relative', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.ink }}>
      {children}
      {dot && <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, background: dot, border: `2px solid ${t.bg}` }} />}
    </div>
  );
}

function SectionLabel({ t, label, pad }) {
  return (
    <div style={{ fontFamily: t.display, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: t.muted, fontWeight: 600, marginBottom: 8, padding: pad ? '0 18px' : 0 }}>{label}</div>
  );
}
