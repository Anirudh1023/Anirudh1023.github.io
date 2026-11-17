// knockout-tokens.ts — qlabs.sh inspired palette
export const KO = {
  // qlabs.sh palette
  bg:        '#ffffff',
  bgPrimary: '#ffffff',
  bgSec:     '#fafafa',
  text:      '#1a1a1a',
  textDim:   '#5f5f5f',
  textMute:  '#5f5f5f',
  textFaint: '#a0a0a0',
  textGhost: '#e0e0e0',
  constr:    '#d4d4d4',
  border:    '#d4d4d4',
  accent:    '#1a1a1a',    // no color accent — qlabs uses monochrome
  surface:   '#fafafa',
  // Retained for backward compat (modal may use)
  cream2:    '#f5f5f5',
  cream3:    '#f0f0f0',
};

// Font families — qlabs.sh uses Outfit + Space Grotesk
export const FAM = "'Outfit', system-ui, sans-serif";
export const FAM_HEAD = "'Space Grotesk', system-ui, sans-serif";

export const F = {
  // Big identity name — Space Grotesk bold
  logo:    (size = 56) => ({ fontFamily: FAM_HEAD, fontWeight: 700, fontSize: size, lineHeight: 1 }),
  // Section titles — Space Grotesk
  head:    (size = 28) => ({ fontFamily: FAM_HEAD, fontWeight: 700, fontSize: `clamp(${size * 0.75}px, 5vw, ${size}px)`, lineHeight: 1.1 }),
  // Subheads
  sub:     (size = 17) => ({ fontFamily: FAM, fontWeight: 500, fontSize: size, lineHeight: 1.4 }),
  // Body text — Outfit regular
  body:    (size = 17) => ({ fontFamily: FAM, fontWeight: 400, fontSize: size, lineHeight: 1.6 }),
  // Small caps metadata labels — qlabs uses 12px/500 uppercase
  eyebrow: (size = 12) => ({ fontFamily: FAM, fontWeight: 500, fontSize: size, letterSpacing: '0.14em', lineHeight: 2, textTransform: 'uppercase' as const }),
  // Buttons / small UI text
  btn:     (size = 13) => ({ fontFamily: FAM, fontWeight: 500, fontSize: size, lineHeight: 1 }),
  // Tabular numbers
  num:     (size = 17) => ({ fontFamily: FAM, fontWeight: 500, fontSize: size }),
  // Code
  code:    (size = 14) => ({ fontFamily: 'monospace', fontWeight: 400, fontSize: size, lineHeight: 1.6 }),
  // Hero / name display
  hero:    (size = 56) => ({ fontFamily: FAM_HEAD, fontWeight: 700, fontSize: `clamp(${size * 0.6}px, 8vw, ${size}px)`, lineHeight: 1 }),
};
