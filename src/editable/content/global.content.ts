import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Axidra business discovery platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Axidra.net business discovery',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'Classifieds', href: '/classified' },
      { label: 'Listings', href: '/listing' },
      { label: 'Images', href: '/image' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Create Axidra profile free', href: '/signup' },
      secondary: { label: 'Login', href: '/login' },
    },
  },
  footer: {
    tagline: 'Axidra discovery for everyday needs',
    description: 'Axidra.net is a practical discovery platform for browsing services, products, businesses, property posts, jobs, resources, and everyday offers.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Classifieds', href: '/classified' },
          { label: 'Business Listings', href: '/listing' },
          { label: 'Image Posts', href: '/image' },
          { label: 'PDF Library', href: '/pdf' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Sign up', href: '/signup' },
          { label: 'Login', href: '/login' },
        ],
      },
    ],
    bottomNote: 'Built for Axidra browsing and business discovery.',
  },
  commonLabels: {
    readMore: 'View details',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
