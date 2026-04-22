export const MOCK_ME = {
  id: 'me', name: 'Jamie Rodriguez', handle: '@jamier', avatar: '#f97316',
  stats: { games: 14, hits: 28, rbi: 19, innings: 42 },
  positions: ['SS', '2B', 'CF'],
};

export const MOCK_UPCOMING = [
  { id: 'g1', title: 'Saturday Morning Scrimmage', date: 'Sat, Apr 26', time: '10:00 AM',
    field: 'Bullfrog Creek Park · Diamond 1', filled: 11, cap: 18, myPos: 'Shortstop', myTeam: 'Home',
    host: 'Marcus Chen', hostAvatar: '#f97316', cost: 10, paid: true, weather: { temp: 74, icon: 'sun' } },
  { id: 'g2', title: 'Tuesday Night Pickup', date: 'Tue, Apr 29', time: '6:30 PM',
    field: 'Gibsonton Community Field', filled: 14, cap: 18, myPos: '2nd Base', myTeam: 'Away',
    host: 'Tony Russo', hostAvatar: '#2563eb', cost: 10, paid: true, weather: { temp: 71, icon: 'cloud' } },
];

export const MOCK_NEARBY = [
  { id: 'n1', title: 'Sunday Fundays', date: 'Sun, Apr 27', time: '9:00 AM',
    field: '13012 Bullfrog Creek Rd', distance: '0.0 mi', filled: 7, cap: 18, cost: 10,
    host: 'Jake P.', hostAvatar: '#a16207', tags: ['Kid-friendly', 'Slow-pitch'] },
  { id: 'n2', title: 'Wednesday Wipeout', date: 'Wed, Apr 30', time: '7:00 PM',
    field: 'Bullfrog Creek Park · Field 2', distance: '0.4 mi', filled: 15, cap: 18, cost: 12,
    host: 'Derek W.', hostAvatar: '#1d4ed8', tags: ['Competitive'] },
  { id: 'n3', title: 'Kids Clinic · Ages 6–9', date: 'Sat, Apr 26', time: '8:00 AM',
    field: 'Gibsonton Youth Baseball', distance: '1.6 mi', filled: 9, cap: 20, cost: 5,
    host: 'Coach Martinez', hostAvatar: '#12805c', tags: ['Kids', 'Coached'] },
  { id: 'n4', title: 'Thursday Throwdown', date: 'Thu, May 1', time: '6:00 PM',
    field: 'South Shore Sports Complex', distance: '4.8 mi', filled: 4, cap: 18, cost: 10,
    host: 'Lin W.', hostAvatar: '#b45309', tags: ['Co-ed'] },
];

export const MOCK_FEED = [
  { id: 'f1', author: 'Marcus Chen', authorColor: '#f97316', time: '2h',
    gameTitle: 'Saturday Morning Scrimmage', kind: 'highlight',
    caption: 'Derek with an absolute rocket to the gap — easy triple.',
    likes: 47, comments: 8, liked: false, mediaBg: '#1d4ed8', mediaTag: 'HIGHLIGHT' },
  { id: 'f2', author: 'Tony Russo', authorColor: '#2563eb', time: '5h',
    gameTitle: 'Tuesday Night Pickup', kind: 'recap',
    caption: 'GG everyone. Home team takes it 8–6. Next week we run it back.',
    likes: 23, comments: 4, liked: true, statsBg: '#12805c' },
  { id: 'f3', author: 'Sam Torres', authorColor: '#12805c', time: '1d',
    gameTitle: 'Last Saturday', kind: 'photo',
    caption: "Team pic after a beautiful day at the field.",
    likes: 62, comments: 12, liked: false, mediaBg: '#a16207', mediaTag: 'TEAM PHOTO' },
];

export const MOCK_ACTIVITY = [
  { id: 'a1', kind: 'signup',   text: 'Derek W. signed up for your game',      time: '12m', color: '#1d4ed8' },
  { id: 'a2', kind: 'waitlist', text: 'Luis O. joined the waitlist',            time: '28m', color: '#ea580c' },
  { id: 'a3', kind: 'message',  text: 'Marcus posted in Saturday Scrimmage',   time: '1h',  color: '#f97316' },
  { id: 'a4', kind: 'payment',  text: 'Payment from Jake P. received ($10)',   time: '2h',  color: '#12805c' },
];

export const MOCK_REELS = [
  { id: 'r1', author: 'Derek W.',  authorColor: '#1d4ed8',
    caption: 'Triple to right-center #ThePickUpClub',
    likes: 234, comments: 18, plays: '2.1K', label: 'TRIPLE TO THE GAP', bg: '#1d4ed8' },
  { id: 'r2', author: 'Marcus C.', authorColor: '#f97316',
    caption: 'Diving catch saves the inning',
    likes: 512, comments: 34, plays: '4.8K', label: 'WEB GEM', bg: '#12805c' },
  { id: 'r3', author: 'Sam T.',    authorColor: '#12805c',
    caption: 'First homer of the season for Jake!',
    likes: 891, comments: 67, plays: '12K', label: 'GOING, GOING, GONE', bg: '#f04438' },
];

export const POSITIONS_HEAT = [
  { id: 'P',  short: 'P',  x: 50, y: 48 }, { id: 'C',  short: 'C',  x: 50, y: 80 },
  { id: '1B', short: '1B', x: 72, y: 60 }, { id: '2B', short: '2B', x: 63, y: 42 },
  { id: '3B', short: '3B', x: 28, y: 60 }, { id: 'SS', short: 'SS', x: 37, y: 42 },
  { id: 'LF', short: 'LF', x: 18, y: 26 }, { id: 'CF', short: 'CF', x: 50, y: 18 },
  { id: 'RF', short: 'RF', x: 82, y: 26 },
];
