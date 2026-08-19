import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: 'Axidra',
  tagline: 'Axidra business discovery platform',
  domain: 'axidra.net',
  baseUrl: 'https://axidra.net',
  productKind,
  ogImage: '/og-default.png',
  accents:
    productKind === 'visual'
      ? { primary: '#df1f2d', surface: '#1b1b1b' }
      : productKind === 'editorial'
        ? { primary: '#20252d', surface: '#ffffff' }
        : productKind === 'directory'
          ? { primary: '#20252d', surface: '#ffffff' }
          : { primary: '#20252d', surface: '#ffffff' },
} as const
