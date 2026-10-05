export const KO = {
  // Color 
  bg:        '#F7EEE4',    // warm cream background
  bgPrimary: '#F7EEE4',    // alias for bg
  bgSec:     '#F5F0E2',    // slightly deeper cream
  constr:    '#DCD8CD',    // subtle grey construction lines
  border:    '#DCD8CD',    // alias for constr
  accent:    '#FF8000',    // orange — active/research intervention
  text:      '#222222',    // charcoal — baseline/context
  textDim:   '#22222299',  // 60% charcoal
  textMute:  '#22222266',  // 40%
  textFaint: '#22222233',  // 20%
  textGhost: '#2222220D',  // 5%
  // Functional
  cream2:    '#EBEBE5',    
  cream3:    '#F5F5F0',    
  surface:   '#FFFFFF',
};

// Common type styles — Satoshi Variable
export const FAM = "'Satoshi-Variable', 'Satoshi', -apple-system, system-ui, sans-serif";

export const F = {
  // Identity/Hero statements
  logo:    (size = 24) => ({ fontFamily: FAM, fontWeight: 900, fontSize: size, letterSpacing: -size * 0.025, lineHeight: 1 }),
  hero:    (size = 64) => ({ fontFamily: FAM, fontWeight: 900, fontSize: `clamp(${size * 0.6}px, 8vw, ${size}px)`, letterSpacing: -size * 0.04, lineHeight: 0.95 }),
  // Section titles, research titles
  head:    (size = 28) => ({ fontFamily: FAM, fontWeight: 700, fontSize: `clamp(${size * 0.75}px, 5vw, ${size}px)`, letterSpacing: -size * 0.025, lineHeight: 1.05 }),
  // Subheads, project descriptions
  sub:     (size = 18) => ({ fontFamily: FAM, fontWeight: 500, fontSize: size, letterSpacing: -size * 0.015, lineHeight: 1.2 }),
  // Body text
  body:    (size = 14) => ({ fontFamily: FAM, fontWeight: 400, fontSize: size, lineHeight: 1.4 }),
  // Metadata / technical labels
  eyebrow: (size = 10) => ({ fontFamily: FAM, fontWeight: 700, fontSize: size, letterSpacing: size * 0.2, lineHeight: 1, textTransform: 'uppercase' as const }),
  // Buttons
  btn:     (size = 11) => ({ fontFamily: FAM, fontWeight: 700, fontSize: size, letterSpacing: size * 0.16, lineHeight: 1, textTransform: 'uppercase' as const }),
  // Tabular numbers for evidence/metrics
  num:     (size = 14) => ({ fontFamily: FAM, fontWeight: 700, fontSize: size, fontVariantNumeric: 'tabular-nums' }),
  // Code snippets
  code:    (size = 13) => ({ fontFamily: FAM, fontWeight: 400, fontSize: size, lineHeight: 1.6 }),
};
