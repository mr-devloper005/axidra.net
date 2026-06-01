import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'city-directory'
  | 'classified-board'
  | 'service-market'
  | 'retail-window'
  | 'business-profile'
  | 'editorial-index'
  | 'clean-axidra'

export const visualPresets = {
  'city-directory': {
    label: 'City Directory',
    mood: 'public, useful, Axidra-facing, direct',
    fontDirection: 'bold geometric sans with crisp directory labels',
    colors: {
      background: '#ffffff',
      foreground: '#20252d',
      muted: '#777f8b',
      primary: '#df1f2d',
      accent: '#df1f2d',
      surface: '#ffffff',
    },
    shape: 'flat rectangular modules with fine gray borders',
  },
  'classified-board': {
    label: 'Classified Board',
    mood: 'search-first, practical, deal-focused',
    fontDirection: 'large bold titles with compact metadata',
    colors: {
      background: '#f7f7f7',
      foreground: '#20252d',
      muted: '#6a717d',
      primary: '#df1f2d',
      accent: '#efc36c',
      surface: '#ffffff',
    },
    shape: 'list cards, side filters, quick action strips',
  },
  'service-market': {
    label: 'Service Market',
    mood: 'service discovery with strong visual categories',
    fontDirection: 'confident sans, compact uppercase chips',
    colors: {
      background: '#ffffff',
      foreground: '#20252d',
      muted: '#6f7784',
      primary: '#df1f2d',
      accent: '#6684dc',
      surface: '#ffffff',
    },
    shape: 'image panels and service tiles',
  },
  'retail-window': {
    label: 'Retail Window',
    mood: 'shopfront browsing and product comparison',
    fontDirection: 'retail catalogue headings with light body text',
    colors: {
      background: '#f5f5f5',
      foreground: '#20252d',
      muted: '#757b85',
      primary: '#df1f2d',
      accent: '#6684dc',
      surface: '#ffffff',
    },
    shape: 'product boxes, image-first grids, ad-like banners',
  },
  'business-profile': {
    label: 'Business Profile',
    mood: 'signup and reputation driven',
    fontDirection: 'large display copy with sturdy CTAs',
    colors: {
      background: '#ffffff',
      foreground: '#20252d',
      muted: '#777f8b',
      primary: '#df1f2d',
      accent: '#efc36c',
      surface: '#ffffff',
    },
    shape: 'wide promotion bands and dark footer panels',
  },
  'editorial-index': {
    label: 'Editorial Index',
    mood: 'readable public information',
    fontDirection: 'clean sans with calm paragraph rhythm',
    colors: {
      background: '#f4f5f7',
      foreground: '#20252d',
      muted: '#717985',
      primary: '#df1f2d',
      accent: '#df1f2d',
      surface: '#ffffff',
    },
    shape: 'article panels and thin dividers',
  },
  'clean-axidra': {
    label: 'Clean Axidra',
    mood: 'simple, neutral, Axidra-facing',
    fontDirection: 'friendly sans with compact navigation',
    colors: {
      background: '#ffffff',
      foreground: '#20252d',
      muted: '#6d7480',
      primary: '#df1f2d',
      accent: '#df1f2d',
      surface: '#ffffff',
    },
    shape: 'straight edges and practical spacing',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'city-directory',
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-2 duration-500',
    cardHover: 'transition duration-300 hover:-translate-y-0.5 hover:shadow-lg',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.14em]',
    heroTitle: 'text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.2rem]',
    sectionTitle: 'text-2xl font-extrabold tracking-tight sm:text-[28px]',
    body: 'text-base leading-7',
    caption: 'text-xs font-semibold uppercase tracking-[0.12em]',
  },
  surfaces: {
    glass: 'border border-white/20 bg-white/10 backdrop-blur-xl',
    paper: 'border border-[#dedede] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]',
    quiet: 'border border-[#dedede] bg-[#f7f7f7]',
    dark: 'border border-white/10 bg-[#1b1b1b] shadow-[0_18px_42px_rgba(0,0,0,0.22)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-14 lg:py-16',
    cardGrid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
