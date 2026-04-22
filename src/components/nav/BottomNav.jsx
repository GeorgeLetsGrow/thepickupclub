'use client';
import React from 'react';
import Link from 'next/link';
import { IconHome, IconSearch, IconPlus, IconReel, IconProfileTab } from '@/components/Icons';

const TABS = [
  { key: 'home',    label: 'Home',    Icon: IconHome },
  { key: 'find',    label: 'Find',    Icon: IconSearch },
  { key: 'reel',    label: 'Reel',    Icon: IconReel },
  { key: 'profile', label: 'Me',      Icon: IconProfileTab },
];

const TAB_HREFS = {
  home: '/', find: '/find', reel: '/reel', profile: '/profile',
};

export function BottomNav({ activeKey, onTabChange }) {
  const left  = TABS.slice(0, 2);
  const right = TABS.slice(2);

  return (
    <nav className="mobile-bottom-nav lg:hidden border-t border-line bg-white/95 shadow-[0_-8px_24px_rgba(30,42,53,0.08)] backdrop-blur-md">
      <div className="flex h-[4.5rem] items-center">
        {left.map(tab => (
          <TabBtn key={tab.key} tab={tab} active={activeKey === tab.key} onTabChange={onTabChange} />
        ))}

        {/* Center create button */}
        <Link href="/host/create"
          className="flex min-h-16 flex-1 flex-col items-center justify-center">
          <div className="flex h-13 w-13 -translate-y-2 items-center justify-center rounded-full bg-red shadow-lg ring-4 ring-white">
            <IconPlus size={26} stroke={2.5} style={{ color: '#fff' }} />
          </div>
        </Link>

        {right.map(tab => (
          <TabBtn key={tab.key} tab={tab} active={activeKey === tab.key} onTabChange={onTabChange} />
        ))}
      </div>
    </nav>
  );
}

function TabBtn({ tab, active, onTabChange }) {
  const cls = `flex min-h-16 flex-1 flex-col items-center justify-center gap-1 pt-1 transition-all duration-200 active:scale-95 ${active ? 'text-navy' : 'text-muted'}`;
  const inner = (
    <>
      <span className={`relative flex h-9 w-12 items-center justify-center rounded-full transition-all duration-200 ${
        active ? 'bg-navy text-white shadow-sm shadow-navy/20' : 'text-muted'
      }`}>
        <tab.Icon size={22} filled={active} />
        {active && <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-red" />}
      </span>
      <span className={`font-display text-[10px] font-semibold tracking-wider uppercase transition-colors ${
        active ? 'text-navy' : 'text-muted'
      }`}>{tab.label}</span>
    </>
  );

  if (onTabChange) {
    return <button onClick={() => onTabChange(tab.key)} className={cls}>{inner}</button>;
  }
  return <Link href={TAB_HREFS[tab.key]} className={cls}>{inner}</Link>;
}
