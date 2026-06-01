import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#20252d',
  '--slot4-panel-bg': '#f5f5f5',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#606774',
  '--slot4-soft-muted-text': '#858b95',
  '--slot4-accent': '#df1f2d',
  '--slot4-accent-fill': '#df1f2d',
  '--slot4-accent-soft': '#fdebed',
  '--slot4-gold': '#efc36c',
  '--slot4-blue': '#6684dc',
  '--slot4-dark-bg': '#1b1b1b',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#eef0f4',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f7f7f7',
  '--slot4-lavender': '#f1f3f8',
  '--slot4-gray': '#f5f5f5',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #ffffff 42%, #f5f5f5 100%)',
  '--editable-container': '1140px',
  '--editable-border': '#dedede',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[#dedede]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_4px_18px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_14px_38px_rgba(0,0,0,0.16)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-0',
    sectionY: 'py-12 sm:py-14 lg:py-16',
  },
  layout: {
    safeGrid: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center',
    rail: 'flex snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[180px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.1em]',
    heroTitle: 'text-3xl font-extrabold leading-tight sm:text-5xl lg:text-[3.15rem]',
    sectionTitle: 'text-2xl font-extrabold tracking-tight sm:text-[26px]',
    body: 'text-base leading-7',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center bg-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#bd1522]`,
    secondary: `inline-flex items-center justify-center border border-[#cfcfcf] bg-white px-7 py-3 text-sm font-bold uppercase text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent-fill)] hover:text-[var(--slot4-accent-fill)]`,
    accent: `inline-flex items-center justify-center bg-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#bd1522]`,
  },
  media: {
    frame: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,0.12)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep every edit inside src/editable.',
  'Keep dynamic post fetching intact; do not replace posts with mock data.',
  'Use postHref() for all post links so task-specific routes keep working.',
  'Classified pages should read like an Axidra directory with search, category filters, listing cards, and useful detail pages.',
] as const
