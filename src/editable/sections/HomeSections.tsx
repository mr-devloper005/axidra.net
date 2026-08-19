import Link from 'next/link'
import type { ReactNode } from 'react'
import { BriefcaseBusiness, Building2, Camera, Car, Cpu, GraduationCap, HeartPulse, Home, MapPin, Newspaper, Plane, Search, Shirt, ShoppingBag, Star, Store, Utensils, type LucideIcon } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const heroImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80'
const serviceImages = [
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=1000&q=80',
]
const retailImages = [
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=700&q=80',
]
const promoImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80'

const categories: Array<{ label: string; slug: string; icon: LucideIcon }> = [
  { label: 'Business', slug: 'business', icon: BriefcaseBusiness },
  { label: 'Health', slug: 'health', icon: HeartPulse },
  { label: 'Technology', slug: 'technology', icon: Cpu },
  { label: 'News & Media', slug: 'news', icon: Newspaper },
  { label: 'Education & Training', slug: 'education', icon: GraduationCap },
  { label: 'Beauty Care', slug: 'beauty', icon: Star },
  { label: 'Professional Services', slug: 'service', icon: BriefcaseBusiness },
  { label: 'Travel & Tourism', slug: 'travel', icon: Plane },
  { label: 'Wholesale Suppliers', slug: 'industry-manufacturing', icon: Store },
  { label: 'Architecture & Interior', slug: 'home-improvement', icon: Building2 },
  { label: 'Photography & Videography', slug: 'photography', icon: Camera },
  { label: 'Apparel & Garments', slug: 'fashion', icon: Shirt },
  { label: 'Automobile / Care', slug: 'automotive', icon: Car },
  { label: 'Party and Caterers', slug: 'event', icon: Utensils },
  { label: 'Repairs / Maintenance', slug: 'home-improvement', icon: BriefcaseBusiness },
  { label: 'Retail Shops', slug: 'shopping', icon: ShoppingBag },
  { label: 'Schools / Colleges', slug: 'education', icon: GraduationCap },
  { label: 'Jewellery', slug: 'shopping', icon: Star },
  { label: 'Fitness / Health', slug: 'health', icon: HeartPulse },
  { label: 'Vehicle Rentals', slug: 'automotive', icon: Car },
  { label: 'Home Needs / House Keeping', slug: 'home-improvement', icon: Home },
  { label: 'Restaurants', slug: 'food', icon: Utensils },
]

const categoryHref = (basePath: string, slug: string) => `${basePath}?category=${encodeURIComponent(slug)}`

function SectionShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={className}><div className={dc.shell.section}>{children}</div></section>
}

function ServicePanel({ image, title, items, tall = false }: { image: string; title: string; items: string[]; tall?: boolean }) {
  return (
    <article className={`relative overflow-hidden bg-[#1b1b1b] text-white ${tall ? 'min-h-[486px]' : 'min-h-[228px]'}`}>
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.62),rgba(0,0,0,0.22))]" />
      <div className="relative flex min-h-[inherit] flex-col justify-end p-7">
        <h3 className="mb-3 text-lg font-bold">{title}</h3>
        <ul className="grid gap-2 text-[18px] font-semibold leading-tight">
          {items.map((item) => <li key={item} className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded-full bg-white text-[10px] text-[#6684dc]">›</span>{item}</li>)}
        </ul>
      </div>
    </article>
  )
}

function RetailCard({ title, image, blue = false }: { title: string; image: string; blue?: boolean }) {
  return (
    <Link href="/classified" className={`group relative min-h-[226px] overflow-hidden border border-[#dedede] ${blue ? 'bg-[#6684dc] text-white' : 'bg-white text-[#20252d]'}`}>
      <div className="p-4">
        <h3 className="text-lg font-extrabold uppercase leading-tight">{title}</h3>
        <p className={`mt-1 text-xs font-bold uppercase ${blue ? 'text-white' : 'text-[#858b95]'}`}>{globalContent.site.domain}</p>
      </div>
      <img src={image} alt="" className="absolute bottom-0 right-0 max-h-[145px] max-w-[82%] object-contain transition duration-300 group-hover:scale-105" />
    </Link>
  )
}

function ProductMosaic({ posts, primaryTask, primaryRoute }: { posts: SitePost[]; primaryTask: TaskKey; primaryRoute: string }) {
  const mosaicPosts = posts.slice(0, 6)
  const fallback = ['Formal Shoes', 'Girls Frock', 'Cotton Kurti', 'Casual Shirts', 'Mens Formal Shirt', 'Ladies Tops']
  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-[1fr_2.05fr_1fr_1fr]">
      {Array.from({ length: 6 }).map((_, index) => {
        const post = mosaicPosts[index]
        const title = post?.title || fallback[index]
        const href = post ? postHref(primaryTask, post, primaryRoute) : '/classified'
        const image = post ? getEditablePostImage(post) : retailImages[index % retailImages.length]
        const large = index === 1
        return (
          <Link key={`${title}-${index}`} href={href} className={`${large ? 'row-span-2 min-h-[448px]' : 'min-h-[220px]'} group relative overflow-hidden border border-[#dedede] bg-white`}>
            <h3 className="relative z-10 p-4 text-xl font-medium text-[#20252d]">{title}</h3>
            <img src={image} alt="" className="absolute bottom-0 left-1/2 max-h-[78%] max-w-[92%] -translate-x-1/2 object-contain transition duration-300 group-hover:scale-105" />
          </Link>
        )
      })}
    </div>
  )
}

export function EditableHomeHero({ primaryRoute }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ')
  return (
    <section className="relative">
      <div className="relative min-h-[500px] overflow-hidden bg-[#f1f3f8]">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.26)]" />
        <div className="relative mx-auto flex min-h-[500px] max-w-[var(--editable-container)] flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-0">
          <h1 className="max-w-[980px] text-4xl font-extrabold leading-tight tracking-[0.02em] drop-shadow-sm sm:text-5xl">{heroTitle}</h1>
          <p className="mt-3 text-xl font-bold drop-shadow-sm">{pagesContent.home.hero.description}</p>
          <form action="/search" className="mt-8 flex w-full max-w-[670px] flex-col overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.22)] sm:flex-row">
            <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="h-12 min-w-0 flex-1 bg-white px-4 text-[15px] text-[#20252d] outline-none" />
            <label className="flex h-12 min-w-0 flex-1 items-center bg-white px-4 text-[#606774] sm:border-l sm:border-[#dedede]">
              <MapPin className="mr-3 h-5 w-5 text-[#df1f2d]" />
              <input name="location" placeholder="Where are you looking for?" className="min-w-0 flex-1 bg-transparent text-[15px] outline-none" />
            </label>
            <button className="grid h-12 w-full place-items-center bg-[var(--slot4-accent-fill)] text-white sm:w-16" aria-label="Search"><Search className="h-5 w-5" /></button>
          </form>
        </div>
      </div>
      <SectionShell className="bg-white py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#20252d]">All Categories</h2>
          <p className="mt-2 text-sm font-semibold text-[#858b95]">Browse Axidra by business, health, technology, services, shops, and local needs.</p>
        </div>
        <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9">
          {categories.map(({ label, slug, icon: Icon }) => (
            <Link key={`${label}-${slug}`} href={categoryHref(primaryRoute, slug)} className="group flex min-h-[114px] flex-col items-center justify-center border border-[#dedede] bg-white p-3 text-center transition hover:border-[var(--slot4-accent-fill)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
              <Icon className="h-8 w-8 text-[#858b95] transition group-hover:text-[var(--slot4-accent-fill)]" strokeWidth={2.2} />
              <span className="mt-4 text-[11px] font-extrabold uppercase leading-snug text-[#20252d]">{label}</span>
            </Link>
          ))}
        </div>
      </SectionShell>
    </section>
  )
}

export function EditableStoryRail(_props: HomeSectionProps) {
  const services = [
    { title: 'Beauty Care', image: serviceImages[0], items: ['Beauty Parlours', 'Bridal Makeup', 'Markup Artist', 'Salons', 'Mehandi Design'], tall: true },
    { title: 'Health Services', image: serviceImages[1], items: ['Hair Transplantation', 'Beard Transplantation', 'Eyebrow Transplantation'] },
    { title: 'Family Services', image: serviceImages[2], items: ['Family Counselling', 'De-Addiction Counselling', 'Parental Counselling', 'Child Counselling', 'Pre Marriage Counselling'] },
  ]
  return (
    <section className="bg-[#f5f5f5] py-12">
      <div className={dc.shell.section}>
        <h2 className={dc.type.sectionTitle}>Find Service Providers On Axidra</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.82fr_1.1fr]">
          <ServicePanel {...services[0]} />
          <div className="grid gap-4">
            <ServicePanel {...services[1]} />
            <ServicePanel {...services[2]} />
          </div>
        </div>
      </div>

      <div className={`${dc.shell.section} mt-16`}>
        <h2 className={dc.type.sectionTitle}>Find Retail Shops On Axidra</h2>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <RetailCard title="Mens Wear" image={retailImages[0]} />
          <RetailCard title="Books Shops" image={retailImages[1]} />
          <RetailCard title="Footwear Shop" image={retailImages[2]} />
          <RetailCard title="Mobile Shops" image={retailImages[3]} />
          <RetailCard title="Kids Wear Shops" image={retailImages[4]} blue />
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  return (
    <>
      <section className="bg-white py-12 text-center">
        <div className={dc.shell.section}>
          <h2 className="text-3xl font-extrabold tracking-wide">Axidra Helps Businesses Get Discovered Faster</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-6 text-[#606774]">Create a useful Axidra profile, add products or services, and help customers understand what you offer.</p>
        </div>
      </section>

      <section className="bg-[var(--slot4-gold)]">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          {[
            ['List On Axidra', 'Its Free', 'Sign up and list your business details so customers can discover your services on Axidra.', 'Signup Now', '/signup'],
            ['Do you want to', 'Grow On Axidra', 'Share your service details and make it easier for customers to reach you.', 'Contact Axidra', '/contact'],
          ].map(([line1, line2, desc, cta, href]) => (
            <div key={cta} className="relative min-h-[310px] overflow-hidden border-white/70 p-10 text-white md:border-r lg:px-20">
              <BriefcaseBusiness className="absolute bottom-[-35px] right-12 h-64 w-64 text-black/10" />
              <h3 className="relative text-5xl font-light leading-tight">{line1}<br />{line2}</h3>
              <p className="relative mt-5 max-w-md text-base font-semibold leading-6">{desc}</p>
              <Link href={href} className="relative mt-10 inline-flex bg-[var(--slot4-accent-fill)] px-10 py-3 text-sm font-bold uppercase text-white">{cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className={dc.shell.section}>
          <div className="grid gap-4 md:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group relative min-h-[260px] overflow-hidden bg-[#1b1b1b] text-white">
                <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-62 transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.76))]" />
                <div className="relative flex min-h-[260px] flex-col justify-end p-7">
                  <p className="text-sm font-bold text-[#efc36c]">{getEditableCategory(post)}</p>
                  <h3 className="mt-2 max-w-xl text-2xl font-extrabold leading-tight">{post.title}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6">{getEditableExcerpt(post, 130)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  return (
    <>
      <section className="bg-white py-16">
        <div className={dc.shell.section}>
          <h2 className={dc.type.sectionTitle}>Find Products And Suppliers On Axidra</h2>
          <div className="mt-8">
            <ProductMosaic posts={posts} primaryTask={primaryTask} primaryRoute={primaryRoute} />
          </div>
        </div>
      </section>

      <section className="bg-[#f1f3f8] py-16 text-center">
        <div className={dc.shell.section}>
          <h2 className="mx-auto max-w-5xl text-5xl font-light leading-tight text-[#20252d]">Attract new customers with your Axidra business listing.</h2>
          <p className="mx-auto mt-8 max-w-5xl text-[15px] leading-7 text-black">Axidra helps people quickly search for business details, products, and services relevant to them. A clear listing can improve visibility and make it easier for customers to contact a provider.</p>
          <div className="mx-auto mt-14 max-w-4xl">
            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" alt="" className="mx-auto max-h-[430px] w-full object-cover" />
          </div>
          <h3 className="mt-12 text-3xl font-semibold">Benefits of Axidra business listings</h3>
          <div className="mt-12 grid gap-12 text-left md:grid-cols-2">
            {[
              ['Increases your Axidra presence', 'Listing your business on Axidra helps more people discover your service information and makes your offer easier to compare.'],
              ['Improves your visibility', 'Axidra category and keyword browsing help targeted visitors connect with useful providers in fewer steps.'],
              ['Cost effective advertising', 'A structured Axidra profile can present products, services, address details, and images without a complicated publishing process.'],
              ['Boost up brand reputation', 'Consistent Axidra business information and clear reviews help visitors understand the service before reaching out.'],
            ].map(([title, body]) => (
              <article key={title}>
                <h4 className="text-2xl font-medium">{title}</h4>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-black">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="relative overflow-hidden bg-[#1b1b1b] text-white">
      <img src={promoImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.76),rgba(0,0,0,0.15))]" />
      <div className="relative mx-auto max-w-[var(--editable-container)] px-4 py-20 sm:px-6 lg:px-0">
        <p className="inline-flex bg-[#df1f2d]/85 px-9 py-4 text-3xl font-light">Is your business visible on Axidra?</p>
        <h2 className="mt-6 text-5xl font-light">Create your <span className="font-extrabold">{globalContent.site.name}</span> Profile</h2>
        <p className="mt-5 max-w-xl text-xl leading-8">Add your business, product, or service details and help customers reach you faster on Axidra.net.</p>
        <Link href="/signup" className="mt-10 inline-flex bg-[var(--slot4-accent-fill)] px-14 py-4 text-xl font-bold uppercase">List on Axidra</Link>
      </div>
    </section>
  )
}
