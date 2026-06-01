import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Axidra business listings, services, and classifieds',
      description: 'Find services, affordable deals, products, property posts, jobs, and business listings on Axidra.net.',
      openGraphTitle: 'Axidra business listings, services, and classifieds',
      openGraphDescription: 'Browse services, products, businesses, and offers through the Axidra.net discovery platform.',
      keywords: ['Axidra', 'axidra.net', 'business listings', 'classifieds', 'services', 'property listings', 'jobs'],
    },
    hero: {
      badge: 'Axidra business directory',
      title: ['Axidra.net business directory, classifieds, and service listings'],
      description: 'Find the product, service, business, or opportunity you are looking for on Axidra.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'Create Axidra profile', href: '/signup' },
      searchPlaceholder: 'Search Axidra listings',
      focusLabel: 'Location',
      featureCardBadge: 'Popular on Axidra',
      featureCardTitle: 'Service providers, shops, and offers in one Axidra experience.',
      featureCardDescription: 'Use search or browse categories to move quickly from an idea to a useful Axidra result.',
    },
    intro: {
      badge: 'For Axidra discovery',
      title: 'Find services, products, suppliers, and business details without jumping between dozens of pages.',
      paragraphs: [
        'Browse everyday categories, Axidra businesses, useful service providers, and classified posts through one practical discovery platform.',
        'Axidra keeps search, categories, featured services, and latest listings close together so visitors can compare options quickly.',
        'Each Axidra post keeps its original data and opens into a detail page with images, descriptions, contact fields, and related entries when available.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first Axidra homepage for services, products, and locations.',
        'Category tiles for quick browsing across everyday needs.',
        'Listing pages designed for scanning price, place, seller, and details.',
        'Responsive pages that stay usable on phones and desktops.',
      ],
      primaryLink: { label: 'Browse classifieds', href: '/classified' },
      secondaryLink: { label: 'Axidra listings', href: '/listing' },
    },
    cta: {
      badge: 'Get found on Axidra',
      title: 'Create a clear Axidra business profile and help customers discover your services.',
      description: 'Add useful information, product details, images, and contact points so customers can understand what you offer on Axidra.net.',
      primaryCta: { label: 'List on Axidra', href: '/signup' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About',
    title: 'A practical Axidra directory for browsing everyday services and offers.',
    description: `${slot4BrandConfig.siteName} helps visitors move through posts, products, services, resources, and business information on ${slot4BrandConfig.domain} with a clean browsing flow.`,
    paragraphs: [
      'The site is arranged around simple discovery: search, choose a category, compare useful posts, and open the details that matter.',
      'Axidra supports different content types while keeping navigation consistent, so people can move between classifieds, listings, images, profiles, and resources without losing context.',
    ],
    values: [
      {
        title: 'Search-first browsing',
        description: 'Visitors can begin with a keyword or location and continue through category-driven sections.',
      },
      {
        title: 'Useful Axidra structure',
        description: 'Cards and detail pages emphasize titles, images, summaries, prices, locations, and contact options when data is available.',
      },
      {
        title: 'Clear public pages',
        description: 'The design favors straightforward information, responsive layouts, and safe fallbacks for missing post fields.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Tell Axidra what you want to publish, update, or ask about.',
    description: 'Send a short message with the details. The Axidra form keeps things simple so the right information can be handled quickly.',
    formTitle: 'Send a message',
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
