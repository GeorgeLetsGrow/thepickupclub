'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { SideNav } from '@/components/nav/SideNav';
import { BottomNav } from '@/components/nav/BottomNav';
import {
  MOCK_UPCOMING, MOCK_NEARBY, MOCK_FEED, MOCK_ACTIVITY, MOCK_REELS, MOCK_ME, POSITIONS_HEAT,
} from '@/lib/social-data';
import {
  IconBell, IconChat, IconSearch, IconFilter, IconMap, IconList,
  IconHeart, IconComment, IconShare, IconBookmark, IconMute, IconChevR,
  IconCheck, IconClock, IconDollar, IconPin, IconSun, IconCloud,
  IconBaseball, IconUsers, IconSettings, IconTrophy, IconReel, IconSend, IconX,
} from '@/components/Icons';

/* ─────────────────────────── Helper components ─────────────────────────── */

function Avatar({ name = '', color = '#1e2a35', size = 36 }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-display font-bold text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="font-display text-[11px] font-semibold tracking-widest uppercase text-red mb-3">
      {children}
    </p>
  );
}

function RosterBar({ filled, cap }) {
  const pct = Math.round((filled / cap) * 100);
  const color = pct >= 90 ? '#c4302b' : pct >= 70 ? '#e8a020' : '#4a7c59';
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-display text-[10px] tracking-wider uppercase text-muted">Roster</span>
        <span className="font-display text-[10px] tracking-wider text-navy">{filled}/{cap}</span>
      </div>
      <div className="h-1.5 rounded-full bg-cream overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function GameCard({ g, onManage }) {
  const WeatherIcon = g.weather?.icon === 'sun' ? IconSun : IconCloud;
  return (
    <button
      type="button"
      onClick={onManage}
      className="bg-white rounded-2xl border border-line p-4 flex flex-col gap-2 shadow-sm h-full text-left transition-all hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:ring-offset-cream"
      aria-label={`Manage registration for ${g.title}`}
    >
      {/* Date / time row */}
      <div className="flex items-center justify-between">
        <span className="font-display text-xs font-semibold tracking-widest uppercase text-red">
          {g.date} · {g.time}
        </span>
        {g.weather && (
          <span className="flex items-center gap-1 text-muted text-xs">
            <WeatherIcon size={14} /> {g.weather.temp}°
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-base font-bold text-navy leading-tight">{g.title}</h3>

      {/* Field */}
      <div className="flex items-center gap-1.5 text-muted text-xs">
        <IconPin size={13} />
        <span>{g.field}</span>
      </div>

      {/* Playing info */}
      <div className="flex items-center gap-2 bg-cream rounded-lg px-3 py-2 mt-1">
        <span className="font-display text-[11px] tracking-widest uppercase text-ink-soft">
          You&rsquo;re playing: <strong className="text-navy">{g.myPos}</strong> · {g.myTeam}
        </span>
        {g.paid && (
          <span className="ml-auto flex items-center gap-1 bg-green text-white font-display text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full">
            <IconCheck size={10} /> Paid
          </span>
        )}
      </div>

      <RosterBar filled={g.filled} cap={g.cap} />
      <div className="mt-1 border-t border-line pt-2">
        <span className="inline-flex items-center gap-1 font-display text-[11px] font-semibold tracking-widest uppercase text-red">
          Manage Registration <IconChevR size={13} />
        </span>
      </div>
    </button>
  );
}

function NearbyCard({ n }) {
  const spotsLeft = n.cap - n.filled;
  return (
    <Link
      href={`/game/${n.id}`}
      aria-label={`View and register for ${n.title}`}
      className="block bg-white rounded-2xl border border-line p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:ring-offset-cream"
    >
      {/* Date / time */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="font-display text-[11px] font-semibold tracking-widest uppercase text-red">
          {n.date} · {n.time}
        </span>
        <span className="font-display text-xs font-bold text-navy whitespace-nowrap">${n.cost}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-base font-bold text-navy leading-tight mb-1">{n.title}</h3>

      {/* Field + distance */}
      <div className="flex items-center gap-1.5 text-muted text-xs mb-3">
        <IconPin size={13} />
        <span>{n.field}</span>
        <span className="ml-auto text-[11px] text-muted">{n.distance}</span>
      </div>

      {/* Tags */}
      {n.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {n.tags.map(tag => (
            <span key={tag} className="font-display text-[10px] tracking-wider uppercase bg-cream text-ink-soft px-2.5 py-0.5 rounded-full border border-line">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Host + spots */}
      <div className="flex items-center gap-2">
        <Avatar name={n.host} color={n.hostAvatar} size={26} />
        <span className="text-xs text-muted">{n.host}</span>
        <div className="ml-auto flex items-center gap-1 text-xs text-muted">
          <IconUsers size={13} />
          <span>{n.filled}/{n.cap}</span>
          {spotsLeft <= 3 && (
            <span className="ml-1 font-display text-[9px] tracking-wider uppercase text-red font-semibold">
              {spotsLeft === 0 ? 'Full' : `${spotsLeft} left`}
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end border-t border-line pt-3">
        <span className="inline-flex items-center gap-1 font-display text-[11px] font-semibold tracking-widest uppercase text-red">
          View / Register <IconChevR size={13} />
        </span>
      </div>
    </Link>
  );
}

/* ──────────────────────────────── Tab: Home ────────────────────────────── */

function TabHome() {
  const [managedGame, setManagedGame] = useState(null);
  const [activeGameSlide, setActiveGameSlide] = useState(0);
  const sliderRef = React.useRef(null);

  function handleSliderScroll(event) {
    const { scrollLeft, clientWidth } = event.currentTarget;
    setActiveGameSlide(Math.round(scrollLeft / clientWidth));
  }

  return (
    <div className="space-y-8">
      {/* YOUR NEXT GAMES */}
      <section>
        <SectionLabel>Your Next Games</SectionLabel>
        <div
          ref={sliderRef}
          onScroll={handleSliderScroll}
          className="mobile-slider -mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-4 pb-1 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:px-0 lg:snap-none"
        >
          {MOCK_UPCOMING.map(g => (
            <div key={g.id} className="w-full shrink-0 snap-center pr-3 last:pr-0 lg:w-full lg:shrink lg:pr-0">
              <GameCard g={g} onManage={() => setManagedGame(g)} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2 lg:hidden">
          {MOCK_UPCOMING.map((game, index) => (
            <button
              key={game.id}
              type="button"
              aria-label={`Show ${game.title}`}
              onClick={() => sliderRef.current?.scrollTo({ left: index * sliderRef.current.clientWidth, behavior: 'smooth' })}
              className={`h-2 rounded-full transition-all ${activeGameSlide === index ? 'w-6 bg-navy' : 'w-2 bg-line'}`}
            />
          ))}
        </div>
      </section>

      {/* ACTIVITY */}
      <section>
        <SectionLabel>Activity</SectionLabel>
        <div className="bg-white rounded-2xl border border-line divide-y divide-line overflow-hidden">
          {MOCK_ACTIVITY.map(a => {
            let Icon = IconCheck;
            if (a.kind === 'waitlist') Icon = IconClock;
            if (a.kind === 'message')  Icon = IconChat;
            if (a.kind === 'payment')  Icon = IconDollar;

            return (
              <div key={a.id} className="flex items-center gap-3 px-4 py-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: a.color + '22', color: a.color }}
                >
                  <Icon size={16} />
                </div>
                <p className="flex-1 text-sm text-navy leading-snug">{a.text}</p>
                <span className="font-display text-[10px] tracking-wider text-muted uppercase">{a.time}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* FROM YOUR GAMES */}
      <section>
        <SectionLabel>From Your Games</SectionLabel>
        <div className="space-y-4">
          {MOCK_FEED.map(post => <FeedPost key={post.id} post={post} />)}
        </div>
      </section>

      {managedGame && (
        <ManageRegistrationDialog game={managedGame} onClose={() => setManagedGame(null)} />
      )}
    </div>
  );
}

function ManageRegistrationDialog({ game, onClose }) {
  const [confirmCancel, setConfirmCancel] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 px-4 pb-4 pt-16 lg:items-center lg:pb-0">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <p className="font-display text-[11px] font-semibold tracking-widest text-red uppercase">
              Manage Registration
            </p>
            <h2 className="mt-1 font-display text-xl font-bold tracking-wide text-navy uppercase">
              {game.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{game.date} · {game.time}</p>
          </div>
          <button
            type="button"
            aria-label="Close registration manager"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-cream hover:text-navy"
          >
            <IconX size={20} />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-cream px-3 py-3">
              <p className="font-display text-[10px] font-semibold tracking-widest text-muted uppercase">Position</p>
              <p className="mt-1 font-display text-base font-bold text-navy">{game.myPos}</p>
              <p className="text-xs text-muted">{game.myTeam} team</p>
            </div>
            <div className="rounded-xl border border-line bg-cream px-3 py-3">
              <p className="font-display text-[10px] font-semibold tracking-widest text-muted uppercase">Paid</p>
              <p className="mt-1 font-display text-base font-bold text-navy">${game.cost}</p>
              <p className="text-xs text-muted">{game.paid ? 'Spot reserved' : 'Payment due'}</p>
            </div>
          </div>

          <div className="rounded-xl border border-line px-4 py-3">
            <div className="flex items-start gap-3">
              <IconPin size={18} style={{ color: '#8a8178', marginTop: 2 }} />
              <div>
                <p className="font-display text-sm font-bold tracking-wide text-navy uppercase">{game.field}</p>
                <p className="mt-1 text-sm text-muted">
                  Arrive 15 minutes early. Bring your glove and water.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-red/25 bg-red/5 px-4 py-3">
            <p className="font-display text-[11px] font-semibold tracking-widest text-red uppercase">
              Cancellation Policy
            </p>
            <p className="mt-1 text-sm leading-relaxed text-navy">
              You can cancel for a refund until 24 hours before first pitch. Cancelling inside 24 hours forfeits the ${game.cost} game fee.
            </p>
          </div>

          {confirmCancel && (
            <div className="rounded-xl border border-red bg-white px-4 py-3">
              <p className="font-display text-sm font-bold tracking-wide text-red uppercase">
                Confirm cancellation
              </p>
              <p className="mt-1 text-sm text-muted">
                In production, the app would calculate whether this spot is still refundable before final confirmation.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Link
              href={`/game/${game.id}`}
              className="flex items-center justify-center rounded-xl border border-line px-4 py-3 font-display text-[11px] font-semibold tracking-widest text-navy uppercase transition-colors hover:bg-cream"
            >
              View Game
            </Link>
            <Link
              href={`/messages?thread=${game.id === 'g2' ? 'tony' : 'saturday'}`}
              className="flex items-center justify-center rounded-xl border border-line px-4 py-3 font-display text-[11px] font-semibold tracking-widest text-navy uppercase transition-colors hover:bg-cream"
            >
              Message Host
            </Link>
            <button
              type="button"
              onClick={() => setConfirmCancel(true)}
              className="rounded-xl bg-red px-4 py-3 font-display text-[11px] font-semibold tracking-widest text-white uppercase transition-opacity hover:opacity-90"
            >
              Cancel Spot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedPost({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(false);
  const likeCount = post.likes + (liked && !post.liked ? 1 : !liked && post.liked ? -1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-sm">
      {/* Author header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar name={post.author} color={post.authorColor} size={38} />
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-bold text-navy">{post.author}</p>
          <p className="text-xs text-muted truncate">{post.gameTitle} · {post.time}</p>
        </div>
        <button className="text-muted hover:text-navy transition-colors">
          <IconMute size={18} />
        </button>
      </div>

      {/* Media area */}
      {post.kind === 'recap' ? (
        <RecapMedia post={post} />
      ) : (
        <VideoMediaArea post={post} />
      )}

      {/* Actions row */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(v => !v)}
            className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-red' : 'text-muted hover:text-navy'}`}
          >
            <IconHeart size={22} filled={liked} />
          </button>
          <button className="text-muted hover:text-navy transition-colors">
            <IconComment size={22} />
          </button>
          <button className="text-muted hover:text-navy transition-colors">
            <IconShare size={20} />
          </button>
          <button
            onClick={() => setSaved(v => !v)}
            className={`ml-auto transition-colors ${saved ? 'text-navy' : 'text-muted hover:text-navy'}`}
          >
            <IconBookmark size={22} filled={saved} />
          </button>
        </div>
        <p className="font-display text-xs font-semibold text-navy tracking-wide">
          {likeCount.toLocaleString()} likes
        </p>
        <p className="text-sm text-navy leading-snug">
          <span className="font-semibold">{post.author}</span>{' '}
          {post.caption}
        </p>
        {post.comments > 0 && (
          <p className="text-xs text-muted">View all {post.comments} comments</p>
        )}
      </div>
    </div>
  );
}

function VideoMediaArea({ post }) {
  const image = post.image || PROFILE_IMAGES[Math.abs(post.id.charCodeAt(1) || 0) % PROFILE_IMAGES.length];

  return (
    <div className="relative w-full" style={{ paddingBottom: '125%' }}>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundColor: post.mediaBg,
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.55)), url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/15" />
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur-sm">
          <IconBaseball size={14} />
          <span className="font-display text-[10px] font-semibold tracking-widest uppercase">
            Pickup Clip
          </span>
        </div>
        <span className="relative z-10 font-display text-lg font-bold tracking-widest uppercase text-white/80 mb-4">
          {post.mediaTag}
        </span>
        <button className="relative z-10 w-14 h-14 rounded-full bg-black/25 border-2 border-white/70 flex items-center justify-center hover:bg-black/35 transition-colors">
          <IconReel size={26} filled style={{ color: '#fff' }} />
        </button>
        <div className="absolute left-4 right-4 bottom-4 z-10 rounded-2xl bg-black/30 p-3 text-white backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="font-display text-[10px] font-semibold tracking-widest uppercase text-white/65">
              Game moment
            </span>
            <span className="flex items-center gap-1 font-display text-[10px] font-semibold tracking-widest uppercase text-white/80">
              <IconHeart size={13} filled /> {post.likes}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/90">{post.caption}</p>
        </div>
      </div>
    </div>
  );
}

function RecapMedia({ post }) {
  const image = post.image || PROFILE_IMAGES[1];

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center overflow-hidden py-12 px-6"
      style={{
        backgroundColor: post.statsBg || '#4a7c59',
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.62)), url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <p className="relative z-10 font-display text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-2">
        FINAL
      </p>
      <p className="relative z-10 font-display text-5xl font-bold text-white tracking-tight">
        8 <span className="text-white/40 mx-2">—</span> 6
      </p>
      <div className="relative z-10 mt-5 grid w-full max-w-xs grid-cols-3 overflow-hidden rounded-xl border border-white/20 bg-black/15 text-center text-white">
        {[
          ['Home', '8'],
          ['Away', '6'],
          ['Comments', post.comments],
        ].map(([label, value]) => (
          <div key={label} className="border-r border-white/15 px-3 py-2 last:border-r-0">
            <p className="font-display text-[9px] font-semibold tracking-widest uppercase text-white/55">{label}</p>
            <p className="font-display text-xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <p className="relative z-10 font-display text-xs tracking-widest uppercase text-white/60 mt-4">
        {post.gameTitle}
      </p>
    </div>
  );
}

function DiagonalStripes() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(255,255,255,0.04) 20px, rgba(255,255,255,0.04) 40px)',
      }}
    />
  );
}

/* ──────────────────────────────── Tab: Find ────────────────────────────── */

const FILTER_PILLS = ['All', 'Today', 'Kids', 'Casual', 'Competitive'];
const SAMPLE_GAME_ADDRESS = '13012 Bullfrog Creek Rd, Gibsonton, FL 33534';
const DEFAULT_MAP_CENTER = { lat: 27.7985326, lng: -82.3505479 };
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
let googleMapsPromise;

function fieldKey(value = '') {
  const lower = value.toLowerCase();
  if (lower.includes('bullfrog') || lower.includes('13012')) return 'bullfrog';
  if (lower.includes('youth')) return 'gibsonton-youth';
  if (lower.includes('south shore')) return 'south-shore';
  if (lower.includes('vance')) return 'vance-vogel';
  return lower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'field';
}

function gamesForField(fieldName = '') {
  const key = fieldKey(fieldName);
  return MOCK_NEARBY.filter(game => fieldKey(game.field) === key);
}

function loadGoogleMaps(apiKey) {
  if (typeof window === 'undefined') return Promise.reject(new Error('Maps only loads in the browser.'));
  if (window.google?.maps?.importLibrary) return Promise.resolve(window.google.maps);
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    window.__pickupGameGoogleMapsReady = () => resolve(window.google.maps);

    const script = document.createElement('script');
    const params = new URLSearchParams({
      key: apiKey,
      v: 'weekly',
      loading: 'async',
      callback: '__pickupGameGoogleMapsReady',
    });
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onerror = () => reject(new Error('Google Maps could not load.'));
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

function TabFind() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list');

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-navy tracking-wide">Find a Game</h2>

      {/* Search bar */}
      <div className="relative flex items-center bg-cream border border-line rounded-xl overflow-hidden">
        <div className="pl-4 text-muted">
          <IconSearch size={18} />
        </div>
        <input
          type="text"
          placeholder="Search games, fields, locations…"
          className="flex-1 bg-transparent px-3 py-3 text-sm text-navy placeholder:text-muted outline-none"
        />
        <button className="pr-4 text-muted hover:text-navy transition-colors">
          <IconFilter size={18} />
        </button>
      </div>

      {/* Filter pills + view toggle */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5 overflow-x-auto flex-1 pb-0.5">
          {FILTER_PILLS.map(pill => (
            <button
              key={pill}
              onClick={() => setActiveFilter(pill)}
              className={`shrink-0 font-display text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors ${
                activeFilter === pill
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-ink-soft border-line hover:border-navy hover:text-navy'
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
        <div className="flex border border-line rounded-lg overflow-hidden shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`px-2.5 py-1.5 transition-colors ${viewMode === 'list' ? 'bg-navy text-white' : 'bg-white text-muted hover:text-navy'}`}
          >
            <IconList size={16} />
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-2.5 py-1.5 transition-colors ${viewMode === 'map' ? 'bg-navy text-white' : 'bg-white text-muted hover:text-navy'}`}
          >
            <IconMap size={16} />
          </button>
        </div>
      </div>

      {/* List or Map */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {MOCK_NEARBY.map(n => <NearbyCard key={n.id} n={n} />)}
        </div>
      ) : (
        <GoogleFieldsMap />
      )}
    </div>
  );
}

function GoogleFieldsMap() {
  const mapRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);
  const markersRef = React.useRef([]);
  const [status, setStatus] = useState(GOOGLE_MAPS_API_KEY ? 'Finding baseball fields near Gibsonton...' : 'Google Maps key needed');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  React.useEffect(() => {
    let cancelled = false;

    async function initMap() {
      if (!GOOGLE_MAPS_API_KEY) return;

      try {
        const center = DEFAULT_MAP_CENTER;
        const maps = await loadGoogleMaps(GOOGLE_MAPS_API_KEY);
        const { Map, InfoWindow } = await maps.importLibrary('maps');
        const { Place } = await maps.importLibrary('places');
        const { AdvancedMarkerElement } = await maps.importLibrary('marker');

        if (cancelled || !mapRef.current) return;

        const map = new Map(mapRef.current, {
          center,
          zoom: 12,
          mapId: 'DEMO_MAP_ID',
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        });
        mapInstanceRef.current = map;

        const request = {
          textQuery: `baseball fields near ${SAMPLE_GAME_ADDRESS}`,
          fields: ['id', 'displayName', 'location', 'formattedAddress', 'googleMapsURI', 'rating'],
          locationBias: center,
          language: 'en-US',
          maxResultCount: 8,
          region: 'us',
        };
        const { places: fieldPlaces = [] } = await Place.searchByText(request);

        if (cancelled) return;

        markersRef.current.forEach(marker => {
          marker.map = null;
        });
        markersRef.current = [];

        const bounds = new maps.LatLngBounds();
        const infoWindow = new InfoWindow();
        const formattedPlaces = fieldPlaces
          .filter(place => place.location)
          .map((place, index) => ({
            id: place.id || place.displayName,
            name: place.displayName || 'Baseball field',
            address: place.formattedAddress || 'Address unavailable',
            rating: place.rating,
            url: place.googleMapsURI,
            location: place.location,
            games: gamesForField(place.displayName),
            slot: gamesForField(place.displayName)[0] || MOCK_NEARBY[index % MOCK_NEARBY.length],
          }));

        formattedPlaces.forEach(place => {
          const marker = new AdvancedMarkerElement({
            map,
            position: place.location,
            title: place.name,
          });
          marker.addListener('click', () => {
            setSelectedPlace(place);
            infoWindow.setHeaderContent(place.name);
            infoWindow.setContent(place.address);
            infoWindow.open({ map, anchor: marker, shouldFocus: false });
          });
          markersRef.current.push(marker);
          bounds.extend(place.location);
        });

        if (formattedPlaces.length) {
          map.fitBounds(bounds);
          setPlaces(formattedPlaces);
          setSelectedPlace(formattedPlaces[0]);
          setStatus(`${formattedPlaces.length} fields near Bullfrog Creek found`);
        } else {
          setStatus('No baseball fields found near Bullfrog Creek');
        }
      } catch (error) {
        if (!cancelled) {
          setStatus(error.message || 'Google Maps could not load.');
        }
      }
    }

    initMap();

    return () => {
      cancelled = true;
      markersRef.current.forEach(marker => {
        marker.map = null;
      });
    };
  }, []);

  const featured = selectedPlace?.slot || MOCK_NEARBY[0];
  const fieldGames = selectedPlace
    ? (selectedPlace.games?.length ? selectedPlace.games : [featured])
    : MOCK_NEARBY.filter(game => fieldKey(game.field) === fieldKey(featured.field));

  return (
    <div className="rounded-2xl overflow-hidden border border-line shadow-sm">
      <div className="relative bg-cream" style={{ height: 320 }}>
        {GOOGLE_MAPS_API_KEY ? (
          <div ref={mapRef} className="absolute inset-0" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-cream px-6 text-center">
            <div>
              <IconMap size={36} style={{ color: '#8a8178', margin: '0 auto 12px' }} />
              <p className="font-display text-sm font-bold tracking-widest text-navy uppercase">
                Add a Google Maps key
              </p>
              <p className="mt-2 text-sm leading-snug text-muted">
                Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to show live baseball fields near Bullfrog Creek.
              </p>
            </div>
          </div>
        )}
        <div className="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1.5 text-xs text-navy shadow-sm">
          {status}
        </div>
      </div>

      <div className="bg-white border-t border-line p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="font-display text-[11px] font-semibold tracking-widest uppercase text-red">
              Selected Complex
            </span>
            <h3 className="font-display text-base font-bold text-navy leading-tight mt-0.5">
              {selectedPlace?.name || featured.title}
            </h3>
            <div className="flex items-center gap-1.5 text-muted text-xs mt-1">
              <IconPin size={12} />
              <span>{selectedPlace?.address || `${featured.field} · ${featured.distance}`}</span>
            </div>
            {places.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {places.map(place => (
                  <button
                    key={place.id}
                    onClick={() => {
                      setSelectedPlace(place);
                      mapInstanceRef.current?.panTo(place.location);
                      mapInstanceRef.current?.setZoom(14);
                    }}
                    className={`shrink-0 rounded-full border px-3 py-1 font-display text-[10px] font-semibold tracking-widest uppercase ${
                      selectedPlace?.id === place.id
                        ? 'border-navy bg-navy text-white'
                        : 'border-line bg-cream text-ink-soft'
                    }`}
                  >
                    {place.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="font-display text-lg font-bold text-navy">{fieldGames.length}</span>
            <span className="font-display text-[10px] tracking-widest uppercase text-muted">
              Game{fieldGames.length === 1 ? '' : 's'}
            </span>
            {selectedPlace?.url ? (
              <a
                href={selectedPlace.url}
                target="_blank"
                rel="noreferrer"
                className="font-display text-[11px] tracking-widest uppercase bg-red text-white px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Maps
              </a>
            ) : (
              <button className="font-display text-[11px] tracking-widest uppercase bg-red text-white px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">
                Join
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 mt-3 text-xs text-muted">
          <IconChevR size={14} />
          <span>{places.length ? 'Tap a field chip or map marker to preview it' : `Sample games are anchored at ${SAMPLE_GAME_ADDRESS}`}</span>
        </div>
      </div>

      <div className="border-t border-line bg-cream/50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold tracking-widest text-navy uppercase">
            Games at this complex
          </h3>
          <span className="text-xs text-muted">{fieldGames.length} available</span>
        </div>
        <div className="space-y-2">
          {fieldGames.map(game => (
            <Link
              key={game.id}
              href={`/game/${game.id}`}
              className="block rounded-xl border border-line bg-white px-4 py-3 transition-all hover:border-navy/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-[11px] font-semibold tracking-widest text-red uppercase">
                    {game.date} · {game.time}
                  </p>
                  <h4 className="mt-0.5 font-display text-base font-bold tracking-wide text-navy">
                    {game.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted">{game.tags?.join(' · ') || 'Open pickup game'}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-sm font-bold text-navy">${game.cost}</p>
                  <p className="mt-1 text-xs text-muted">{game.filled}/{game.cap}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
                <span className="text-xs text-muted">Hosted by {game.host}</span>
                <span className="inline-flex items-center gap-1 font-display text-[11px] font-semibold tracking-widest text-red uppercase">
                  Register <IconChevR size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────── Tab: Reel ────────────────────────────── */

function TabReel() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="relative -mx-4 lg:mx-0">
      <div
        className="overflow-y-auto snap-y snap-mandatory"
        style={{ maxHeight: 'calc(100vh - 64px)' }}
      >
        {MOCK_REELS.map((reel, i) => (
          <ReelItem key={reel.id} reel={reel} onVisible={() => setActiveIdx(i)} />
        ))}
      </div>

      {/* Dot nav (desktop) */}
      <div className="hidden lg:flex flex-col gap-2 absolute right-4 top-1/2 -translate-y-1/2 z-20">
        {MOCK_REELS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === activeIdx ? 'bg-white scale-125' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

function ReelItem({ reel }) {
  const [liked, setLiked] = useState(false);
  const likeCount = reel.likes + (liked ? 1 : 0);

  return (
    <div
      className="snap-start relative flex items-end"
      style={{ height: 'calc(100vh - 64px)', background: reel.bg }}
    >
      {/* Diagonal stripes */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 30px, rgba(255,255,255,0.04) 30px, rgba(255,255,255,0.04) 60px)',
        }}
      />

      {/* Big label */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <h2 className="font-display text-4xl sm:text-5xl font-black text-white/90 text-center tracking-wider uppercase leading-tight max-w-lg">
          {reel.label}
        </h2>
      </div>

      {/* Bottom overlay */}
      <div className="relative z-10 w-full p-4 pb-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Avatar name={reel.author} color={reel.authorColor} size={34} />
              <span className="font-display text-sm font-bold text-white tracking-wide">{reel.author}</span>
            </div>
            <p className="text-sm text-white/80 leading-snug">{reel.caption}</p>
          </div>

          <div className="flex flex-col items-center gap-4 shrink-0">
            <button
              onClick={() => setLiked(v => !v)}
              className={`flex flex-col items-center gap-1 transition-colors ${liked ? 'text-red' : 'text-white'}`}
            >
              <IconHeart size={26} filled={liked} />
              <span className="font-display text-[10px] tracking-wide">{likeCount}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white">
              <IconComment size={26} />
              <span className="font-display text-[10px] tracking-wide">{reel.comments}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white">
              <IconShare size={24} />
              <span className="font-display text-[10px] tracking-wide">Share</span>
            </button>
            <div className="flex flex-col items-center gap-1 text-white/60">
              <IconBaseball size={22} />
              <span className="font-display text-[10px] tracking-wide">{reel.plays}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Tab: Profile ──────────────────────────── */

const PROFILE_SUBTABS = ['Games', 'Highlights', 'Saved'];

const POS_INTENSITY = { SS: 8, '2B': 6, CF: 4, P: 2, '1B': 1, RF: 1, C: 0, '3B': 0, LF: 0 };
const PROFILE_FIELD_POSITIONS = [
  { id: 'P',  short: 'P',  x: 50, y: 68 },
  { id: 'C',  short: 'C',  x: 50, y: 91 },
  { id: '1B', short: '1B', x: 71, y: 64 },
  { id: '2B', short: '2B', x: 61, y: 48 },
  { id: '3B', short: '3B', x: 29, y: 64 },
  { id: 'SS', short: 'SS', x: 39, y: 48 },
  { id: 'LF', short: 'LF', x: 19, y: 25 },
  { id: 'CF', short: 'CF', x: 50, y: 16 },
  { id: 'RF', short: 'RF', x: 81, y: 25 },
];

function intensityStyle(val) {
  if (val === 0) return { bg: 'rgba(255,255,255,0.16)', size: 26, cls: 'text-white/35 font-medium' };
  if (val <= 1)  return { bg: 'rgba(255,255,255,0.38)', size: 28, cls: 'text-white/70 font-semibold' };
  if (val <= 2)  return { bg: 'rgba(255,255,255,0.65)', size: 30, cls: 'text-navy font-bold' };
  if (val <= 4)  return { bg: '#e8d4a2',                size: 34, cls: 'text-navy font-bold' };
  if (val <= 6)  return { bg: '#c4302b',                size: 36, cls: 'text-white font-bold' };
  return           { bg: '#c4302b',                    size: 38, cls: 'text-white font-black' };
}

const TILE_COLORS = [
  '#1e3a5f', '#4a7c59', '#c4302b',
  '#8b6f47', '#1e2a35', '#2a4a6b',
  '#d97757', '#4a7c59', '#1e3a5f',
];
const PROFILE_IMAGES = [
  'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1562280963-8a5475740a10?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1516731415730-0c607149933a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80',
];

const PROFILE_POSTS = [
  ...MOCK_FEED.map((post, index) => ({
    id: post.id,
    type: post.kind === 'recap' ? 'Recap' : 'Post',
    label: post.mediaTag || 'Final Score',
    caption: post.caption,
    color: post.mediaBg || post.statsBg,
    image: PROFILE_IMAGES[index % PROFILE_IMAGES.length],
    Icon: post.kind === 'recap' ? IconTrophy : IconReel,
  })),
  ...MOCK_REELS.map((reel, index) => ({
    id: reel.id,
    type: 'Reel',
    label: reel.label,
    caption: reel.caption,
    color: reel.bg,
    image: PROFILE_IMAGES[(index + MOCK_FEED.length) % PROFILE_IMAGES.length],
    Icon: IconReel,
  })),
];

function TabProfile() {
  const [activeSubTab, setActiveSubTab] = useState('Games');
  const me = MOCK_ME;
  const initials = me.name.split(' ').map(w => w[0]).join('').toUpperCase();

  return (
    <div className="space-y-6">
      {/* Profile hero */}
      <div className="bg-white rounded-2xl border border-line p-6">
        <div className="flex items-start gap-5">
          <div
            className="rounded-full flex items-center justify-center shrink-0 font-display font-black text-white"
            style={{ width: 86, height: 86, background: me.avatar, fontSize: 28 }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-bold text-navy leading-tight">{me.name}</h2>
            <p className="text-sm text-muted mb-3">{me.handle} · Gibsonton, FL</p>
            <div className="grid grid-cols-3 text-center divide-x divide-line border border-line rounded-xl overflow-hidden">
              {[
                { label: 'Games', val: me.stats.games },
                { label: 'Hits',  val: me.stats.hits },
                { label: 'RBI',   val: me.stats.rbi },
              ].map(s => (
                <div key={s.label} className="py-2.5 px-1">
                  <p className="font-display text-xl font-black text-navy">{s.val}</p>
                  <p className="font-display text-[9px] tracking-widest uppercase text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Positions chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {me.positions.map(pos => (
            <span key={pos} className="font-display text-[11px] font-bold tracking-wider uppercase bg-navy text-white px-3 py-1 rounded-full">
              {pos}
            </span>
          ))}
          <span className="font-display text-[11px] tracking-wider uppercase bg-cream text-muted border border-line px-3 py-1 rounded-full">
            {me.stats.innings} inn
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <button className="flex-1 font-display text-sm font-semibold tracking-widest uppercase border border-line text-navy px-4 py-2.5 rounded-xl hover:bg-cream transition-colors flex items-center justify-center gap-2">
            <IconSettings size={16} /> Edit Profile
          </button>
          <button className="flex-1 font-display text-sm font-semibold tracking-widest uppercase border border-line text-navy px-4 py-2.5 rounded-xl hover:bg-cream transition-colors flex items-center justify-center gap-2">
            <IconShare size={16} /> Share
          </button>
        </div>
      </div>

      {/* Positions heatmap */}
      <section>
        <SectionLabel>Positions Played</SectionLabel>
        <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-sm">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-green">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 56" preserveAspectRatio="none">
              <rect width="100" height="56" fill="#4a7c59" />
              <path d="M5 56 C20 18 80 18 95 56" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
              <path d="M50 56 L14 6" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
              <path d="M50 56 L86 6" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
              <path d="M50 49 L64 36 L50 24 L36 36 Z" fill="rgba(232,212,162,0.5)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <path d="M50 49 L64 36 M64 36 L50 24 M50 24 L36 36 M36 36 L50 49" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
              <circle cx="50" cy="38" r="5.4" fill="rgba(232,212,162,0.5)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
              <rect x="49" y="48" width="2" height="2" transform="rotate(45 50 49)" fill="#fff" opacity="0.9" />
              <rect x="63" y="35" width="2" height="2" transform="rotate(45 64 36)" fill="#fff" opacity="0.85" />
              <rect x="49" y="23" width="2" height="2" transform="rotate(45 50 24)" fill="#fff" opacity="0.85" />
              <rect x="35" y="35" width="2" height="2" transform="rotate(45 36 36)" fill="#fff" opacity="0.85" />
            </svg>

            {PROFILE_FIELD_POSITIONS.map(pos => {
              const intensity = POS_INTENSITY[pos.id] ?? 0;
              const s = intensityStyle(intensity);
              return (
                <div
                  key={pos.id}
                  className={`absolute flex items-center justify-center rounded-full font-display text-[9px] ${s.cls}`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: s.size,
                    height: s.size,
                    background: s.bg,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {pos.short}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-4 py-2.5 border-t border-line">
            <span className="font-display text-[10px] tracking-widest uppercase text-muted">Frequency:</span>
            {[
              { bg: 'rgba(74,124,89,0.3)', label: 'None' },
              { bg: '#e8d4a2',             label: 'Occasional' },
              { bg: '#c4302b',             label: 'Primary' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: l.bg }} />
                <span className="font-display text-[10px] tracking-wider text-muted">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-tabs + grid */}
      <section>
        <div className="flex border-b border-line mb-4">
          {PROFILE_SUBTABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`flex-1 font-display text-xs font-semibold tracking-widest uppercase pb-2.5 pt-1 border-b-2 transition-colors ${
                activeSubTab === tab
                  ? 'border-navy text-navy'
                  : 'border-transparent text-muted hover:text-navy'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {TILE_COLORS.map((color, i) => {
            const post = PROFILE_POSTS[i % PROFILE_POSTS.length];
            const Icon = post.Icon;
            return (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl bg-navy p-2 text-white shadow-sm"
              style={{
                backgroundColor: post.color || color,
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.72)), url(${post.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.7))',
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-black/45 px-2 py-0.5 font-display text-[8px] font-bold tracking-widest uppercase text-white/80 backdrop-blur-sm">
                    {post.type}
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-navy">
                    <Icon size={13} filled />
                  </span>
                </div>
                <div>
                  <p className="line-clamp-2 font-display text-[10px] font-black uppercase leading-tight tracking-wide text-white drop-shadow">
                    {post.label}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[10px] leading-tight text-white/80">
                    {post.caption}
                  </p>
                </div>
              </div>
            </div>
          )})}
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────────────── Page root ────────────────────────────── */

const TAB_TITLES = {
  home: 'Home Feed',
  find: 'Find a Game',
  reel: 'Reel',
  profile: 'My Profile',
};

const MOCK_THREADS = [
  {
    id: 'saturday',
    title: 'Saturday Morning Scrimmage',
    subtitle: 'Team chat',
    participant: 'Marcus Chen',
    avatar: '#d97757',
    unread: 2,
    time: '9:42 AM',
    messages: [
      { id: 'm1', from: 'Marcus Chen', body: 'Field D3 is confirmed. I will bring the bases.', time: '9:12 AM' },
      { id: 'm2', from: 'Derek W.', body: 'Can someone bring an extra lefty glove?', time: '9:24 AM' },
      { id: 'm3', from: 'me', body: 'I have one in my bag. See everyone at 9:45.', time: '9:42 AM' },
    ],
  },
  {
    id: 'tony',
    title: 'Tony Russo',
    subtitle: 'Host · Tuesday Night Pickup',
    participant: 'Tony Russo',
    avatar: '#2a4a6b',
    unread: 0,
    time: 'Yesterday',
    messages: [
      { id: 'm1', from: 'Tony Russo', body: 'You are good at second base for Tuesday.', time: 'Yesterday' },
      { id: 'm2', from: 'me', body: 'Perfect. I can also cover short if needed.', time: 'Yesterday' },
    ],
  },
  {
    id: 'waitlist',
    title: 'Sunday Fundays',
    subtitle: 'Waitlist questions',
    participant: 'Jake P.',
    avatar: '#8b6f47',
    unread: 1,
    time: 'Mon',
    messages: [
      { id: 'm1', from: 'Jake P.', body: 'If two more drop, I can get you in. Want me to hold a waitlist spot?', time: 'Mon' },
    ],
  },
];

function ActivityIcon({ item }) {
  let Icon = IconCheck;
  if (item.kind === 'waitlist') Icon = IconClock;
  if (item.kind === 'message') Icon = IconChat;
  if (item.kind === 'payment') Icon = IconDollar;

  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
      style={{ background: `${item.color}1f`, color: item.color }}
    >
      <Icon size={15} />
    </span>
  );
}

function HeaderActions() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  function openNotifications() {
    setNotificationsOpen(open => !open);
  }

  return (
    <div className="relative flex items-center gap-3">
      <button
        type="button"
        aria-label="Open notifications"
        aria-expanded={notificationsOpen}
        onClick={openNotifications}
        className="relative text-navy transition-colors hover:text-red"
      >
        <IconBell size={22} />
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red" />
      </button>
      <Link
        href="/messages"
        aria-label="Open messages"
        className="text-navy transition-colors hover:text-red"
      >
        <IconChat size={22} />
      </Link>

      {notificationsOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-line bg-white text-left shadow-xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="font-display text-xs font-bold tracking-widest text-navy uppercase">
                Notifications
              </p>
              <p className="mt-0.5 text-xs text-muted">Recent game activity</p>
            </div>
            <span className="rounded-full bg-red px-2 py-0.5 font-display text-[10px] font-bold tracking-widest text-white">
              {MOCK_ACTIVITY.length}
            </span>
          </div>

          <div className="divide-y divide-line">
            {MOCK_ACTIVITY.map(item => (
              <button
                key={item.id}
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-cream"
              >
                <ActivityIcon item={item} />
                <span className="min-w-0 flex-1 text-sm leading-snug text-navy">{item.text}</span>
                <span className="font-display text-[10px] tracking-wider text-muted uppercase">{item.time}</span>
              </button>
            ))}
          </div>

          <Link
            href="/profile"
            className="block border-t border-line px-4 py-3 text-center font-display text-[11px] font-semibold tracking-widest text-red uppercase hover:bg-cream"
          >
            View Profile Activity
          </Link>
        </div>
      )}
    </div>
  );
}

export function SocialShell({ activeTab = 'home' }) {
  const title = TAB_TITLES[activeTab] || TAB_TITLES.home;

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Desktop sidebar */}
      <SideNav activeKey={activeTab} />

      {/* Main area */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-20 bg-cream/90 backdrop-blur-sm border-b border-line">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <IconBaseball size={18} />
              <span className="mobile-brand font-display font-semibold text-navy uppercase sm:text-sm sm:tracking-widest">
                The <span className="text-red">PickUp</span> Club
              </span>
            </Link>
            <HeaderActions />
          </div>
        </header>

        {/* Desktop top bar */}
        <header className="hidden lg:flex sticky top-0 z-20 bg-cream/90 backdrop-blur-sm border-b border-line">
          <div className="max-w-2xl mx-auto w-full px-4 h-14 flex items-center justify-between">
            <h1 className="font-display text-base font-bold text-navy tracking-widest uppercase">
              {title}
            </h1>
            <HeaderActions />
          </div>
        </header>

        {/* Tab content */}
        <main className="mobile-safe-bottom mx-auto max-w-2xl px-3 pt-3 sm:px-4 lg:pb-8 lg:pt-4">
          {activeTab === 'home'    && <TabHome />}
          {activeTab === 'find'    && <TabFind />}
          {activeTab === 'reel'    && <TabReel />}
          {activeTab === 'profile' && <TabProfile />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav activeKey={activeTab} />
    </div>
  );
}
