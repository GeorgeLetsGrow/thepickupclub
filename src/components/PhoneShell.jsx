'use client';
import React from 'react';
import { IOSStatusBar } from './IOSFrame';
import { IconBack, IconDots } from './Icons';

export function PhoneShell({ theme, children, onBack, title, trailing, hideStatus = false, bg, scroll = true, noPad = false, fb = false }) {
  const t = theme;
  return (
    <div style={{
      width: 402, height: 874, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: bg || t.bg,
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: t.body, color: t.ink,
      WebkitFontSmoothing: 'antialiased',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50 }} />
      {!hideStatus && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <IOSStatusBar dark={t.bg === '#0f1419'} />
        </div>
      )}
      {fb && <FacebookChrome theme={t} onBack={onBack} />}
      {(title !== undefined || onBack) && !fb && <AppNav theme={t} title={title} onBack={onBack} trailing={trailing} />}
      <div style={{
        flex: 1, overflowY: scroll ? 'auto' : 'hidden',
        padding: noPad ? 0 : '0 16px 100px',
        paddingTop: !title && !onBack && !fb ? 60 : 0,
      }}>
        {children}
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{ width: 139, height: 5, borderRadius: 100, background: t.bg === '#0f1419' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)' }} />
      </div>
    </div>
  );
}

function AppNav({ theme: t, title, onBack, trailing }) {
  return (
    <div style={{
      paddingTop: 54, paddingBottom: 12, padding: '54px 12px 12px',
      display: 'flex', alignItems: 'center', gap: 8,
      background: t.bg, position: 'relative', zIndex: 5,
      borderBottom: `1px solid ${t.line}`,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.ink }}>
          <IconBack size={22} stroke={2} />
        </button>
      ) : <div style={{ width: 40 }} />}
      <div style={{ flex: 1, textAlign: 'center', fontFamily: t.display, fontWeight: 500, fontSize: 17, letterSpacing: 0.3, textTransform: 'uppercase', color: t.ink }}>{title}</div>
      <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end', color: t.ink }}>{trailing || null}</div>
    </div>
  );
}

function FacebookChrome({ theme: t, onBack }) {
  return (
    <div style={{ paddingTop: 54, background: '#f0f2f5', borderBottom: '1px solid #dadde1' }}>
      <div style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack ? (
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1877f2', padding: '4px 6px 4px 0', fontSize: 22, lineHeight: 1, display: 'flex', alignItems: 'center' }}>‹</button>
        ) : (
          <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 28, fontWeight: 800, color: '#1877f2', letterSpacing: -1 }}>f</div>
        )}
        <div style={{ flex: 1, height: 34, borderRadius: 17, background: '#e4e6eb', display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 13, color: '#65676b' }}>
          facebook.com/thepickupclub
        </div>
        <div style={{ display: 'flex', gap: 4, color: '#65676b' }}><IconDots size={20} /></div>
      </div>
    </div>
  );
}

export function Avatar({ name, color, size = 36, ring }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: color, color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 600, fontSize: size * 0.4, flexShrink: 0,
      boxShadow: ring ? `0 0 0 2px ${ring}` : 'none',
      fontFamily: '-apple-system, system-ui, sans-serif',
    }}>{initials}</div>
  );
}

export function Chip({ theme: t, children, tone = 'default', size = 'md' }) {
  const tones = {
    default: { bg: t.surfaceAlt, ink: t.inkSoft, bd: t.line },
    primary: { bg: t.primary + '14', ink: t.primary, bd: t.primary + '33' },
    accent:  { bg: t.accent + '14', ink: t.accent, bd: t.accent + '33' },
    success: { bg: t.success + '14', ink: t.success, bd: t.success + '33' },
    dark:    { bg: t.ink, ink: t.bg, bd: 'transparent' },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: size === 'sm' ? '3px 8px' : '5px 10px',
      borderRadius: 999, fontSize: size === 'sm' ? 11 : 12, fontWeight: 600,
      background: tones.bg, color: tones.ink, border: `1px solid ${tones.bd}`,
      letterSpacing: 0.2, textTransform: 'uppercase',
    }}>{children}</span>
  );
}

export function Button({ theme: t, children, variant = 'primary', onClick, full, size = 'md', icon, disabled, style: extraStyle }) {
  const bg = variant === 'primary' ? t.primary : variant === 'accent' ? t.accent : variant === 'ghost' ? 'transparent' : variant === 'outline' ? 'transparent' : t.surface;
  const fg = variant === 'primary' ? t.primaryInk : variant === 'accent' ? t.accentInk : t.ink;
  const bd = variant === 'outline' ? `1.5px solid ${t.ink}` : 'none';
  const pad = size === 'lg' ? '16px 22px' : size === 'sm' ? '8px 14px' : '12px 18px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13 : 15;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: bg, color: fg, border: bd, borderRadius: t.radius, padding: pad,
      fontFamily: t.display, fontWeight: 500, fontSize: fs,
      letterSpacing: 0.5, textTransform: 'uppercase',
      cursor: disabled ? 'not-allowed' : 'pointer',
      width: full ? '100%' : 'auto',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      opacity: disabled ? 0.4 : 1,
      transition: 'transform 0.1s, filter 0.15s',
      ...extraStyle,
    }}
    onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
    onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {icon}{children}
    </button>
  );
}

export function Card({ theme: t, children, style, pad = 16 }) {
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: t.radius, padding: pad, ...style }}>
      {children}
    </div>
  );
}

export function Field({ theme: t, label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: t.muted, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

export function Input({ theme: t, value, onChange, placeholder, type = 'text' }) {
  return (
    <input type={type} value={value || ''} onChange={e => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', background: t.surface, border: `1px solid ${t.line}`,
        borderRadius: t.radius, padding: '12px 14px', fontSize: 15,
        color: t.ink, fontFamily: t.body, boxSizing: 'border-box', outline: 'none',
      }}
      onFocus={e => { e.target.style.borderColor = t.primary; }}
      onBlur={e => { e.target.style.borderColor = t.line; }}
    />
  );
}
