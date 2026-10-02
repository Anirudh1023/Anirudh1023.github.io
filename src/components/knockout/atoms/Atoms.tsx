"use client";

import React, { useState, useEffect } from "react";
import { KO, F } from "@/lib/knockout-tokens";

// ─────────────────────────────────────────────────────────────
// Pill — Mutated for Research Metadata/Status
// ─────────────────────────────────────────────────────────────
export function Pill({ children, bg, color, dot, icon, size = 10, style = {}, onClick }: any) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 999,
      background: bg || KO.textGhost,
      color: color || KO.text,
      border: 'none', cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      ...F.btn(size),
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 99, background: typeof dot === 'string' ? dot : KO.accent }} />}
      {icon}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// PressButton — Every interactive research control
// ─────────────────────────────────────────────────────────────
export function PressButton({ children, onClick, style = {}, disabled, ...rest }: any) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onPointerDown={() => !disabled && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      disabled={disabled}
      style={{
        cursor: disabled ? 'default' : 'pointer', border: 'none', background: 'transparent',
        padding: 0, margin: 0, color: 'inherit',
        transition: 'transform 0.08s ease-out, filter 0.12s, opacity 0.12s',
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...rest}
    >{children}</button>
  );
}

// ─────────────────────────────────────────────────────────────
// Avatar — Research node marker / author marker
// ─────────────────────────────────────────────────────────────
export function Avatar({ name = '', size = 36, bg, color, ring }: any) {
  const initials = (name || '?').split(/\s+/).slice(0, 2).map((s: string) => s[0]).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 99,
      padding: ring ? 2 : 0, background: ring || 'transparent',
      flexShrink: 0,
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 99,
        background: bg || KO.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color || KO.text, ...F.head(size * 0.42), fontWeight: 500,
        letterSpacing: 0,
      }}>{initials}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CarouselBars — Featured research progress
// ─────────────────────────────────────────────────────────────
export function CarouselBars({ progress = 0.5, count = 24, height = 28, color, dim }: any) {
  const filled = Math.round(count * progress);
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height, width: '100%' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: '100%', borderRadius: 1.5,
          background: i < filled ? (color || KO.text) : (dim || KO.textFaint),
        }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FlipNumber — Animated changing result/evidence value
// ─────────────────────────────────────────────────────────────
export function FlipNumber({ value, style = {}, flashColor }: any) {
  const [prev, setPrev] = useState(value);
  const [bump, setBump] = useState(false);
  useEffect(() => {
    if (value !== prev) {
      setBump(true);
      const t = setTimeout(() => { setBump(false); setPrev(value); }, 450);
      return () => clearTimeout(t);
    }
  }, [value, prev]);
  return (
    <span style={{
      display: 'inline-block',
      transition: 'transform 0.45s cubic-bezier(.2,1.5,.4,1), color 0.45s, text-shadow 0.45s',
      transform: bump ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
      color: bump ? (flashColor || KO.accent) : (style.color || 'inherit'),
      ...style,
    }}>{value}</span>
  );
}

// ─────────────────────────────────────────────────────────────
// FieldLabel — Section micro-label
// ─────────────────────────────────────────────────────────────
export function FieldLabel({ children, style = {} }: any) {
  return (
    <div style={{ ...F.eyebrow(10), color: KO.textMute, ...style }}>
      {children}
    </div>
  );
}
