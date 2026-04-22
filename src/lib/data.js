export const POSITIONS = [
  { id: 'P',  name: 'Pitcher',      short: 'P',  x: 50, y: 58, team: 'home' },
  { id: 'C',  name: 'Catcher',      short: 'C',  x: 50, y: 82, team: 'home' },
  { id: '1B', name: '1st Base',     short: '1B', x: 72, y: 55, team: 'home' },
  { id: '2B', name: '2nd Base',     short: '2B', x: 60, y: 42, team: 'home' },
  { id: '3B', name: '3rd Base',     short: '3B', x: 28, y: 55, team: 'home' },
  { id: 'SS', name: 'Shortstop',    short: 'SS', x: 40, y: 42, team: 'home' },
  { id: 'LF', name: 'Left Field',   short: 'LF', x: 18, y: 22, team: 'home' },
  { id: 'CF', name: 'Center Field', short: 'CF', x: 50, y: 14, team: 'home' },
  { id: 'RF', name: 'Right Field',  short: 'RF', x: 82, y: 22, team: 'home' },
];

export const ALL_POSITIONS = [
  ...POSITIONS.map(p => ({ ...p, id: 'H-' + p.id, team: 'home' })),
  ...POSITIONS.map(p => ({ ...p, id: 'A-' + p.id, team: 'away' })),
];

export const SKILL_LEVELS = [
  { id: 'rookie', label: 'Rookie', desc: 'Just learning' },
  { id: 'casual', label: 'Casual', desc: 'Plays for fun' },
  { id: 'solid',  label: 'Solid',  desc: 'Plays regularly' },
  { id: 'ringer', label: 'Ringer', desc: 'Competitive level' },
];

export const MOCK_PLAYERS = [
  { id: 'p1',  name: 'Marcus Chen',    age: 34, skill: 'solid',  position: 'H-P',  paid: true, avatar: '#f97316', joinedMinutesAgo: 42 },
  { id: 'p2',  name: 'Derek Williams', age: 29, skill: 'ringer', position: 'H-SS', paid: true, avatar: '#1d4ed8', joinedMinutesAgo: 38 },
  { id: 'p3',  name: 'Sam Torres',     age: 31, skill: 'solid',  position: 'H-CF', paid: true, avatar: '#12805c', joinedMinutesAgo: 31 },
  { id: 'p4',  name: 'Jake Patel',     age: 27, skill: 'casual', position: 'H-1B', paid: true, avatar: '#a16207', joinedMinutesAgo: 28 },
  { id: 'p5',  name: "Mike O'Brien",   age: 42, skill: 'casual', position: 'H-C',  paid: true, avatar: '#e11d48', joinedMinutesAgo: 24 },
  { id: 'p6',  name: 'Tony Russo',     age: 38, skill: 'solid',  position: 'A-P',  paid: true, avatar: '#2563eb', joinedMinutesAgo: 19 },
  { id: 'p7',  name: 'Chris Park',     age: 33, skill: 'solid',  position: 'A-2B', paid: true, avatar: '#0891b2', joinedMinutesAgo: 15 },
  { id: 'p8',  name: 'David Kim',      age: 26, skill: 'ringer', position: 'A-3B', paid: true, avatar: '#15803d', joinedMinutesAgo: 12 },
  { id: 'p9',  name: 'Alex Rivera',    age: 30, skill: 'casual', position: 'A-LF', paid: true, avatar: '#ea580c', joinedMinutesAgo: 9  },
  { id: 'p10', name: 'Ben Foster',     age: 35, skill: 'solid',  position: 'A-RF', paid: true, avatar: '#475569', joinedMinutesAgo: 6  },
  { id: 'p11', name: 'Jordan Lee',     age: 28, skill: 'casual', position: 'H-LF', paid: true, avatar: '#b45309', joinedMinutesAgo: 3  },
];

export const MOCK_GAME = {
  id: 'g-8429',
  title: 'Saturday Morning Scrimmage',
  host: 'Marcus Chen',
  hostAvatar: '#f97316',
  date: 'Sat, Apr 26',
  time: '10:00 AM',
  endTime: '12:30 PM',
  field: 'Bullfrog Creek Park — Diamond 1',
  fieldAddress: '13012 Bullfrog Creek Rd, Gibsonton, FL 33534',
  fieldLat: 27.7985326, fieldLng: -82.3505479,
  cost: 10,
  playerCap: 18,
  skill: 'All levels welcome',
  notes: 'Bring your own glove. Balls + bases provided. Kids welcome to watch. Rain = cancel (check morning-of).',
  weather: { temp: 74, condition: 'Sunny', icon: 'sun', chanceRain: 5, wind: 6 },
  waiverText: 'I understand that baseball involves risk of injury. I release organizers and the field owner from liability for any injuries sustained during this pickup game. I confirm I am physically able to participate.',
};

export const MOCK_MESSAGES = [
  { id: 'm1', author: 'Marcus Chen',    time: '2h ago',  text: 'Weather looking great for Saturday! 74 and sunny.', host: true },
  { id: 'm2', author: 'Derek Williams', time: '1h ago',  text: 'Stoked. Bringing a new bat to try out.' },
  { id: 'm3', author: 'Marcus Chen',    time: '32m ago', text: "We're at 11/18. Share the link with anyone who wants to play!", host: true },
];
