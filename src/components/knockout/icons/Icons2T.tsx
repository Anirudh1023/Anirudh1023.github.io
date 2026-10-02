"use client";

import React from "react";
import { KO } from "@/lib/knockout-tokens";

// KnockOut Two-tone icon library, Mutated for Research.
const resolve = (c: string) => (KO as any)[c] || c || KO.text;

const stroke = (c: string, w = 1.6) => ({
  stroke: c, strokeWidth: w, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
});

function IQuestion({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" {...stroke(p, 1.6)} />
      <circle cx="12" cy="17" r="1" fill={s} />
    </svg>
  );
}

function ILayer({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <polygon points="12 2 2 7 12 12 22 7 12 2" fill={p} {...stroke(p, 1.6)} />
      <polyline points="2 12 12 17 22 12" {...stroke(s, 1.6)} />
      <polyline points="2 17 12 22 22 17" {...stroke(s, 1.6)} />
    </svg>
  );
}

function IDepth({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="4" x2="12" y2="20" {...stroke(p, 2)} />
      <polyline points="7 15 12 20 17 15" {...stroke(p, 2)} />
      <circle cx="12" cy="4" r="2" fill={s} />
    </svg>
  );
}

function ICompute({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" {...stroke(p, 1.6)} />
      <rect x="9" y="9" width="6" height="6" fill={s} />
      <line x1="9" y1="4" x2="9" y2="20" {...stroke(p, 1.2)} />
      <line x1="15" y1="4" x2="15" y2="20" {...stroke(p, 1.2)} />
      <line x1="4" y1="9" x2="20" y2="9" {...stroke(p, 1.2)} />
      <line x1="4" y1="15" x2="20" y2="15" {...stroke(p, 1.2)} />
    </svg>
  );
}

function IMemory({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="1" fill="none" {...stroke(p, 1.6)} />
      <line x1="7" y1="6" x2="7" y2="18" {...stroke(s, 1.6)} />
      <line x1="11" y1="6" x2="11" y2="18" {...stroke(s, 1.6)} />
      <line x1="15" y1="6" x2="15" y2="18" {...stroke(s, 1.6)} />
    </svg>
  );
}

function IDevice({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="20" rx="3" fill="none" {...stroke(p, 1.6)} />
      <rect x="9" y="18" width="6" height="2" rx="1" fill={s} />
    </svg>
  );
}

function IServer({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="8" rx="1" fill="none" {...stroke(p, 1.6)} />
      <rect x="4" y="14" width="16" height="8" rx="1" fill="none" {...stroke(p, 1.6)} />
      <circle cx="8" cy="6" r="1.5" fill={s} />
      <circle cx="8" cy="18" r="1.5" fill={s} />
    </svg>
  );
}

function IReuse({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" {...stroke(p, 1.6)} />
      <path d="M3 3v5h5" {...stroke(s, 1.6)} />
    </svg>
  );
}

function IOptimize({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" {...stroke(p, 1.6)} />
      <circle cx="12" cy="12" r="3" fill={s} />
    </svg>
  );
}

function IParameter({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="none" {...stroke(p, 1.6)} />
      <circle cx="12" cy="12" r="4" fill={s} />
      <line x1="12" y1="2" x2="12" y2="8" {...stroke(p, 1.6)} />
      <line x1="12" y1="16" x2="12" y2="22" {...stroke(p, 1.6)} />
      <line x1="2" y1="12" x2="8" y2="12" {...stroke(p, 1.6)} />
      <line x1="16" y1="12" x2="22" y2="12" {...stroke(p, 1.6)} />
    </svg>
  );
}

function IPaper({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" {...stroke(p, 1.6)} />
      <polyline points="14 2 14 8 20 8" {...stroke(s, 1.6)} />
      <line x1="16" y1="13" x2="8" y2="13" {...stroke(p, 1.6)} />
      <line x1="16" y1="17" x2="8" y2="17" {...stroke(p, 1.6)} />
      <line x1="10" y1="9" x2="8" y2="9" {...stroke(p, 1.6)} />
    </svg>
  );
}

function ICode({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <polyline points="16 18 22 12 16 6" {...stroke(p, 1.6)} />
      <polyline points="8 6 2 12 8 18" {...stroke(p, 1.6)} />
      <line x1="14" y1="4" x2="10" y2="20" {...stroke(s, 1.6)} />
    </svg>
  );
}

function IArrow({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" {...stroke(p, 1.6)} />
      <path d="M12 5l7 7-7 7" {...stroke(p, 1.6)} />
    </svg>
  );
}

function IResult({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" {...stroke(p, 1.6)} />
      <path d="M8 12l3 3 5-5" {...stroke(s, 2)} />
    </svg>
  );
}

function IConstraint({ p, s, sz }: any) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" fill="none" {...stroke(p, 1.6)} />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" {...stroke(s, 1.6)} />
    </svg>
  );
}

const REGISTRY: Record<string, React.FC<any>> = {
  question: IQuestion,
  layer: ILayer,
  depth: IDepth,
  compute: ICompute,
  memory: IMemory,
  device: IDevice,
  server: IServer,
  reuse: IReuse,
  optimize: IOptimize,
  parameter: IParameter,
  paper: IPaper,
  code: ICode,
  arrow: IArrow,
  result: IResult,
  constraint: IConstraint,
};

export function Icon2T({ name, size = 20, primary = 'accent', secondary = 'text', style }: any) {
  const Comp = REGISTRY[name];
  if (!Comp) return null;
  return (
    <span style={{ display: 'inline-flex', lineHeight: 0, ...style }}>
      <Comp p={resolve(primary)} s={resolve(secondary)} sz={size} />
    </span>
  );
}
