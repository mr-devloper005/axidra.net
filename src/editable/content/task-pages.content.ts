import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Axidra reading desk',
    headline: 'Axidra articles, guides, and explainers in one place.',
    description: 'Use this page to browse Axidra essays, guides, explainers, and story-led posts with clear summaries and useful context.',
    filterLabel: 'Choose Axidra article topic',
    secondaryNote: 'Axidra reading pages keep space, hierarchy, and fewer distractions.',
    chips: ['Axidra articles', 'Topic filters', 'Long-read friendly'],
  },
  classified: {
    eyebrow: 'Axidra notice board',
    headline: 'Axidra classifieds, offers, and time-sensitive posts.',
    description: 'Browse Axidra classified content with quick scanning, practical details, and action-oriented listing pages.',
    filterLabel: 'Filter Axidra classified category',
    secondaryNote: 'Axidra prioritizes urgency, short summaries, and direct browsing.',
    chips: ['Axidra classifieds', 'Offers', 'Action cues'],
  },
  sbm: {
    eyebrow: 'Axidra saved resources',
    headline: 'Axidra social bookmarks arranged like curated collections.',
    description: 'Browse useful Axidra resources, tools, references, and collections from one organized shelf.',
    filterLabel: 'Filter Axidra collection',
    secondaryNote: 'Axidra resources use grouping and calm metadata.',
    chips: ['Axidra collections', 'Resources', 'Reference flow'],
  },
  profile: {
    eyebrow: 'Axidra profiles',
    headline: 'Axidra profiles with identity, trust, and reputation cues.',
    description: 'Profile pages make people, brands, and entities discoverable across Axidra instead of buried in a generic feed.',
    filterLabel: 'Filter Axidra profile category',
    secondaryNote: 'Axidra makes identity and credibility visible before the grid begins.',
    chips: ['Axidra identity', 'Trust cues', 'Creator/business cards'],
  },
  pdf: {
    eyebrow: 'Axidra document library',
    headline: 'Axidra PDFs and documents presented as a useful library.',
    description: 'Browse downloadable Axidra guides, reports, files, and reference material through clear document pages.',
    filterLabel: 'Filter Axidra document type',
    secondaryNote: 'Axidra documents show archive cues, file context, and clear browsing.',
    chips: ['Axidra documents', 'Guides', 'Archive ready'],
  },
  listing: {
    eyebrow: 'Axidra business directory',
    headline: 'Axidra business listings built for discovery and comparison.',
    description: 'Listing pages behave like an Axidra directory with trust cues, metadata, and a practical search rhythm.',
    filterLabel: 'Filter Axidra business category',
    secondaryNote: 'Axidra prioritizes comparison, location, and direct action paths.',
    chips: ['Axidra directory', 'Compare', 'Business discovery'],
  },
  image: {
    eyebrow: 'Axidra visual gallery',
    headline: 'Axidra image posts with a gallery-first browsing experience.',
    description: 'Image pages lead with Axidra visuals, stronger cards, and a portfolio-like rhythm.',
    filterLabel: 'Filter Axidra visual category',
    secondaryNote: 'Axidra lets images carry the page before long text does.',
    chips: ['Axidra gallery', 'Visual-first', 'Portfolio mood'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
