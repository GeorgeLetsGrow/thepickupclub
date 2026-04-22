'use client';
import React from 'react';
import { ALL_POSITIONS } from '@/lib/data';

export function FieldDiagram({ theme: t, players, selectedPosId, onClickPos, compact = false, team = 'home', height }) {
  const posList = ALL_POSITIONS.filter(p => p.team === team);
  const filledBy = {};
  players.forEach(pl => { filledBy[pl.position] = pl; });
  const h = height || (compact ? 240 : 320);
  const dirt = t.fieldDirt || '#c9975b';
  const grass = t.fieldGreen || '#12805c';

  return (
    <div style={{ position: 'relative', width: '100%', height: h, overflow: 'hidden', background: grass }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="grassStripes" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <rect width="8" height="8" fill={grass} />
            <rect width="4" height="8" fill={grass} opacity="0.82" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grassStripes)" />
        <path d="M 5 88 C 18 28 82 28 95 88" fill="none" stroke="#fff" strokeWidth="1.1" opacity="0.18" />
        <path d="M 50 86 L 10 14" stroke="#fff" strokeWidth="0.8" opacity="0.42" />
        <path d="M 50 86 L 90 14" stroke="#fff" strokeWidth="0.8" opacity="0.42" />

        <path d="M 50 86 L 75 57 L 50 31 L 25 57 Z" fill={dirt} opacity="0.96" />
        <path d="M 50 76 L 65 57 L 50 42 L 35 57 Z" fill={grass} opacity="0.94" />
        <path d="M 50 86 L 75 57 M 75 57 L 50 31 M 50 31 L 25 57 M 25 57 L 50 86" stroke="#fff" strokeWidth="0.7" opacity="0.35" />
        <circle cx="50" cy="58" r="5" fill={dirt} opacity="0.98" />
        <circle cx="50" cy="58" r="2.2" fill="#fff" opacity="0.22" />

        {[[50,86],[75,57],[50,31],[25,57]].map(([x,y],i) => (
          <rect key={i} x={x - 1.25} y={y - 1.25} width="2.5" height="2.5" fill="#fff" transform={`rotate(45 ${x} ${y})`} stroke={t.ink} strokeWidth="0.15" opacity="0.95" />
        ))}
        <path d="M 48.4 88 L 51.6 88 L 51.6 90.4 L 50 91.8 L 48.4 90.4 Z" fill="#fff" stroke={t.ink} strokeWidth="0.15" />
      </svg>
      {posList.map(pos => {
        const filled = filledBy[pos.id];
        const isSelected = selectedPosId === pos.id;
        return (
          <PositionPin key={pos.id} theme={t} pos={pos} player={filled} selected={isSelected}
            onClick={() => onClickPos && onClickPos(pos)} containerHeight={h} />
        );
      })}
    </div>
  );
}

function PositionPin({ theme: t, pos, player, selected, onClick, containerHeight }) {
  const xPct = pos.x;
  const yPct = pos.y;
  const size = player ? 38 : 32;
  const bg = player ? '#ffffff' : 'rgba(255,255,255,0.85)';
  const bd = player ? t.primary : selected ? t.accent : 'rgba(255,255,255,0.6)';
  const bdw = player || selected ? 2.5 : 1.5;

  return (
    <button onClick={onClick} style={{
      position: 'absolute', left: `${xPct}%`, top: `${yPct}%`, transform: 'translate(-50%, -50%)',
      width: size, height: size, borderRadius: size / 2,
      border: `${bdw}px solid ${bd}`, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', padding: 0,
      boxShadow: player ? '0 2px 6px rgba(0,0,0,0.25)' : '0 1px 3px rgba(0,0,0,0.15)',
      opacity: player ? 1 : 0.95,
      fontFamily: t.display, fontWeight: 600, fontSize: player ? 11 : 12,
      color: player ? t.primary : t.ink, letterSpacing: 0.3,
      transition: 'transform 0.12s',
    }}
    onMouseEnter={e => { if (!player) e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'; }}
    onMouseLeave={e => { if (!player) e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; }}
    >
      {player ? (
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: player.avatar, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
          {player.name.split(' ').map(n => n[0]).join('').slice(0,2)}
        </div>
      ) : pos.short.replace(/^[HA]-/, '')}
    </button>
  );
}

export function FieldDiagramBoth({ theme: t, players, selectedPosId, onClickPos, height = 380 }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px 8px', fontFamily: t.display, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: t.muted }}>
        <span>Home · {players.filter(p => p.position.startsWith('H-')).length}/9</span>
        <span>Away · {players.filter(p => p.position.startsWith('A-')).length}/9</span>
      </div>
      <FieldDiagram theme={t} players={players} selectedPosId={selectedPosId} onClickPos={onClickPos} team="home" height={height} />
    </div>
  );
}
