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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-line">
      <div className="flex items-end h-16">
        {left.map(tab => (
          <TabBtn key={tab.key} tab={tab} active={activeKey === tab.key} onTabChange={onTabChange} />
        ))}

        {/* Center create button */}
        <Link href="/host/create"
          className="flex-1 flex flex-col items-center justify-end pb-2">
          <div className="w-12 h-12 -mt-4 rounded-2xl bg-red shadow-md flex items-center justify-center">
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
  const cls = `flex-1 flex flex-col items-center justify-end gap-0.5 pb-2 pt-1 ${active ? 'text-navy' : 'text-muted'}`;
  const inner = (
    <>
      <tab.Icon size={22} filled={active} />
      <span className="font-display text-[9px] font-semibold tracking-widest uppercase">{tab.label}</span>
    </>
  );

  if (onTabChange) {
    return <button onClick={() => onTabChange(tab.key)} className={cls}>{inner}</button>;
  }
  return <Link href={TAB_HREFS[tab.key]} className={cls}>{inner}</Link>;
}
