'use client';
import React from 'react';
import Link from 'next/link';
import { IconBaseball, IconHome, IconSearch, IconReel, IconProfileTab, IconPlus, IconBack } from '@/components/Icons';

const NAV_ITEMS = [
  { key: 'home',    href: '/',             label: 'Home',    Icon: IconHome },
  { key: 'find',    href: '/find',         label: 'Find',    Icon: IconSearch },
  { key: 'reel',    href: '/reel',         label: 'Reel',    Icon: IconReel },
  { key: 'profile', href: '/profile',      label: 'Profile', Icon: IconProfileTab },
];

export function SideNav({ activeKey, backHref, backLabel }) {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-white border-r border-line h-screen sticky top-0 z-30">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-line">
        <Link href="/" className="flex items-center gap-2">
          <IconBaseball size={18} />
          <span className="font-display text-sm font-semibold tracking-widest text-navy uppercase leading-none">
            The <span className="text-red">PickUp</span> Club
          </span>
        </Link>
      </div>

      {/* Back link for sub-pages */}
      {backHref && (
        <div className="px-3 pt-3">
          <Link href={backHref}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-navy hover:bg-cream font-display uppercase tracking-wider transition-colors">
            <IconBack size={15} /> {backLabel || 'Back'}
          </Link>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-0.5">
        {NAV_ITEMS.map(({ key, href, label, Icon }) => {
          const active = activeKey === key;
          return (
            <Link key={key} href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-display text-sm font-semibold tracking-widest uppercase transition-colors ${active ? 'bg-navy' : 'text-ink-soft hover:bg-cream hover:text-navy'}`}
              style={active ? { backgroundColor: '#1e2a35', color: '#fff' } : undefined}
              aria-current={active ? 'page' : undefined}>
              <Icon size={18} filled={active} style={active ? { color: '#fff' } : undefined} />
              <span style={active ? { color: '#fff' } : undefined}>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="p-4 space-y-2 border-t border-line">
        <Link href="/host/create"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-red bg-white font-display text-sm font-semibold tracking-widest uppercase transition-colors hover:bg-cream"
          style={{ color: '#c4302b' }}>
          <IconPlus size={16} stroke={2.5} style={{ color: '#c4302b' }} /> New Game
        </Link>
        <Link href="/host"
          className="block text-center text-xs text-muted font-display tracking-wider uppercase hover:text-navy transition-colors">
          Host Dashboard →
        </Link>
      </div>
    </aside>
  );
}
