'use client';
import React, { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SideNav } from '@/components/nav/SideNav';
import { IconBaseball, IconBack, IconChat, IconSend } from '@/components/Icons';

const THREADS = [
  {
    id: 'saturday',
    title: 'Saturday Morning Scrimmage',
    subtitle: 'Host chat · Bullfrog Creek Park',
    participant: 'Marcus Chen',
    avatar: '#d97757',
    unread: 2,
    time: '9:42 AM',
    messages: [
      { id: 'm1', from: 'Marcus Chen', body: 'Bullfrog Creek Park Diamond 1 is confirmed. I will bring the bases.', time: '9:12 AM' },
      { id: 'm2', from: 'Derek W.', body: 'Can someone bring an extra lefty glove?', time: '9:24 AM' },
      { id: 'm3', from: 'me', body: 'I have one in my bag. See everyone at 9:45.', time: '9:42 AM' },
    ],
  },
  {
    id: 'tony',
    title: 'Tuesday Night Pickup',
    subtitle: 'Host chat · Gibsonton Community Field',
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
    subtitle: 'Waitlist · 13012 Bullfrog Creek Rd',
    participant: 'Jake P.',
    avatar: '#8b6f47',
    unread: 1,
    time: 'Mon',
    messages: [
      { id: 'm1', from: 'Jake P.', body: 'If two more drop, I can get you in. Want me to hold a waitlist spot?', time: 'Mon' },
    ],
  },
];

function Avatar({ name, color, size = 36 }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.34 }}
    >
      {name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()}
    </div>
  );
}

function MessagesContent() {
  const params = useSearchParams();
  const initialThread = params.get('thread');
  const [activeThreadId, setActiveThreadId] = useState(initialThread || THREADS[0].id);
  const [draft, setDraft] = useState('');
  const activeThread = useMemo(
    () => THREADS.find(thread => thread.id === activeThreadId) || THREADS[0],
    [activeThreadId],
  );

  function sendDraft(event) {
    event.preventDefault();
    setDraft('');
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <SideNav activeKey="home" backHref="/" backLabel="Home" />

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 border-b border-line bg-cream/90 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-xl text-navy hover:bg-white">
                <IconBack size={18} />
              </Link>
              <div>
                <h1 className="font-display text-base font-bold tracking-widest text-navy uppercase">Messages</h1>
                <p className="text-xs text-muted">Coordinate with hosts and players</p>
              </div>
            </div>
            <Link href="/" className="hidden items-center gap-2 sm:flex">
              <IconBaseball size={16} />
              <span className="font-display text-xs tracking-widest text-muted uppercase">TheBaseballClub</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6">
          <div className="grid min-h-[650px] overflow-hidden rounded-2xl border border-line bg-white shadow-sm lg:grid-cols-[300px_1fr]">
            <aside className="border-b border-line bg-cream/55 p-3 lg:border-b-0 lg:border-r">
              <div className="mb-3 flex items-center gap-2 px-2">
                <IconChat size={18} />
                <span className="font-display text-xs font-bold tracking-widest text-navy uppercase">Inbox</span>
              </div>
              <div className="space-y-1">
                {THREADS.map(thread => {
                  const active = thread.id === activeThread.id;
                  return (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => setActiveThreadId(thread.id)}
                      className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                        active ? 'bg-white shadow-sm' : 'hover:bg-white/70'
                      }`}
                    >
                      <Avatar name={thread.participant} color={thread.avatar} size={38} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-[12px] font-bold tracking-wider text-navy uppercase">
                          {thread.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted">{thread.subtitle}</span>
                      </span>
                      {thread.unread > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red px-1.5 font-display text-[10px] font-bold text-white">
                          {thread.unread}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </aside>

            <section className="flex min-h-[650px] flex-col">
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <Avatar name={activeThread.participant} color={activeThread.avatar} size={42} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-base font-bold tracking-wider text-navy uppercase">
                    {activeThread.title}
                  </p>
                  <p className="truncate text-sm text-muted">{activeThread.subtitle} · {activeThread.time}</p>
                </div>
                <Link
                  href={`/game/${activeThread.id === 'tony' ? 'g2' : 'g1'}`}
                  className="rounded-xl border border-line px-3 py-2 font-display text-[11px] font-semibold tracking-widest text-navy uppercase hover:bg-cream"
                >
                  View Game
                </Link>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto bg-white px-5 py-5">
                {activeThread.messages.map(message => {
                  const mine = message.from === 'me';
                  return (
                    <div key={message.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                        mine ? 'bg-navy text-white' : 'bg-cream text-navy'
                      }`}>
                        {!mine && (
                          <p className="mb-1 font-display text-[10px] font-bold tracking-widest text-red uppercase">
                            {message.from}
                          </p>
                        )}
                        <p className="text-sm leading-snug">{message.body}</p>
                        <p className={`mt-1 font-display text-[9px] tracking-widest uppercase ${
                          mine ? 'text-white/55' : 'text-muted'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={sendDraft} className="flex items-center gap-2 border-t border-line bg-white p-4">
                <input
                  value={draft}
                  onChange={event => setDraft(event.target.value)}
                  placeholder={`Message ${activeThread.participant}...`}
                  className="min-w-0 flex-1 rounded-xl border border-line bg-cream px-4 py-3 text-sm text-navy outline-none placeholder:text-muted focus:border-navy"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-red text-white transition-opacity disabled:opacity-40"
                  aria-label="Send message"
                >
                  <IconSend size={18} />
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <MessagesContent />
    </Suspense>
  );
}
