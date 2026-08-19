import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Bookmark, BriefcaseBusiness, Building2, Camera, ChevronRight, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { globalContent } from '@/editable/content/global.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const dedupeUrls = (urls: Array<string | null | undefined>): string[] =>
  Array.from(new Set(urls.map((url) => (typeof url === 'string' ? url.trim() : '')).filter((url) => url.length > 0)))

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const stripTags = (value: string) => value
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const getSummary = (post: SitePost) => stripTags(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body))
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

function classifiedHeading(categoryLabel: string) {
  if (categoryLabel === 'All categories') return `${globalContent.site.name} classified listings and local offers`
  return `${globalContent.site.name} ${categoryLabel} listings, offers, and service posts`
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Axidra posts include images, summaries, and quick category context.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Axidra business cards highlight identity, location, contacts, and services.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-0', promise: 'Axidra classified entries prioritize image, price, seller, location, and action links.', badge: 'Classified' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Axidra gallery browsing uses compact captions and strong visuals.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Axidra saved resources stay easy to scan.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Axidra document cards surface file context and summary.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Axidra profile cards focus on identity, short bio, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#ffffff', '--archive-text': '#20252d', '--archive-surface': '#ffffff', '--archive-accent': '#df1f2d', '--editable-border': '#dedede', '--editable-container': '1140px' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  if (task === 'classified') {
    return (
      <EditableSiteShell>
        <main style={archiveVars} className="bg-white text-[var(--archive-text)]">
          <section className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-0">
            <ClassifiedSidebar basePath={basePath} category={category} />
            <div className="min-w-0">
              <form action="/search" className="mb-6 flex max-w-[420px] border border-[#dedede]">
                <input name="q" placeholder="Keywords" className="h-12 min-w-0 flex-1 px-4 text-sm outline-none" />
                <button className="grid h-12 w-12 place-items-center bg-[var(--archive-accent)] text-white" aria-label="Search"><Search className="h-5 w-5" /></button>
              </form>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight">{classifiedHeading(categoryLabel)}</h1>
              <div className="mt-16 grid gap-0">
                {posts.length ? posts.map((post, index) => <ClassifiedArchiveCard key={post.id || post.slug || index} post={post} href={post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)} index={index} />) : <ArchiveEmpty label={label} />}
              </div>
              <Pagination pagination={pagination} category={category} basePath={basePath} page={page} />
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[#f7f7f7] text-[var(--archive-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-0">
          <div className="grid gap-6 border border-[#dedede] bg-white p-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <div className="inline-flex items-center gap-2 bg-[var(--archive-accent)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white"><Icon className="h-4 w-4" /> {label}</div>
              <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight">{voice?.headline || `Browse ${label}`}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#606774]">{voice?.description || globalContent.site.tagline}</p>
              <p className="mt-5 border-l-4 border-[var(--archive-accent)] bg-[#f7f7f7] p-4 text-sm font-semibold text-[#606774]">{deck.promise}</p>
            </div>
            <form action={basePath} className="border border-[#dedede] bg-[#f7f7f7] p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]"><Filter className="h-4 w-4" /> Filter by category</div>
              <select name="category" defaultValue={category} className="mt-4 h-12 w-full border border-[#dedede] bg-white px-4 text-sm font-semibold outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-3 h-12 w-full bg-[var(--archive-accent)] text-sm font-bold uppercase text-white">Apply</button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 sm:px-6 lg:px-0">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug || index} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : <ArchiveEmpty label={label} />}
          <Pagination pagination={pagination} category={category} basePath={basePath} page={page} />
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ClassifiedSidebar({ basePath, category }: { basePath: string; category: string }) {
  const displayCategories = CATEGORY_OPTIONS.slice(0, 18)
  const topSearches = ['Girls Knitted Frock on Axidra', 'Girls Hostel on Axidra', 'Girls Shorts on Axidra', 'Girls Tops on Axidra', 'Girls T-Shirts on Axidra', 'Girls Sweaters on Axidra', 'Girls Skirts on Axidra', 'Girls Clothing on Axidra', 'Girls Leggings on Axidra', 'Girls Jumpsuits on Axidra']
  return (
    <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
      <div>
        <h2 className="text-lg font-extrabold uppercase">Search by Location</h2>
        <form action={basePath} className="mt-3 flex border border-[#dedede]">
          <input name="location" defaultValue={globalContent.site.domain} className="h-11 min-w-0 flex-1 px-4 text-sm outline-none" />
          <button className="w-11 text-[#858b95]" aria-label="Search location"><Search className="mx-auto h-4 w-4" /></button>
        </form>
      </div>
      <div className="border border-[#dedede] bg-white p-6">
        <h2 className="text-lg font-extrabold uppercase">{category === 'all' ? 'Axidra Categories' : category.replace(/-/g, ' ')}</h2>
        <p className="mt-1 text-[11px] uppercase text-[#858b95]">Filter by category</p>
        <div className="mt-6 grid gap-4">
          {displayCategories.map((item) => (
            <Link key={item.slug} href={pageHref(basePath, item.slug, 1)} className={`flex items-center gap-2 text-base ${category === item.slug ? 'font-bold text-[#20252d]' : 'text-[#606774]'}`}>
              <ChevronRight className="h-4 w-4" /> {item.name}
            </Link>
          ))}
        </div>
      </div>
      <form action={basePath}>
        <h2 className="text-lg font-extrabold uppercase">Sort by</h2>
        <div className="mt-3 flex">
          <select name="sort" className="h-11 min-w-0 flex-1 border border-[#dedede] bg-white px-3 text-sm outline-none">
            <option>Relevant</option>
            <option>Latest</option>
            <option>Popular</option>
          </select>
          <button className="grid h-11 w-12 place-items-center bg-[var(--archive-accent)] text-white" aria-label="Sort"><Search className="h-4 w-4" /></button>
        </div>
      </form>
      <div className="border border-[#dedede] bg-white p-6">
        <h2 className="text-lg font-extrabold">Top Searches on Axidra</h2>
        <div className="mt-6 grid gap-4">
          {topSearches.map((item) => <Link key={item} href={basePath} className="flex items-center gap-2 text-base text-[#606774]"><ChevronRight className="h-4 w-4" /> {item}</Link>)}
        </div>
      </div>
    </aside>
  )
}

function Pagination({ pagination, category, basePath, page }: { pagination: SiteFeedPagination; category: string; basePath: string; page: number }) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="border border-[#dedede] bg-white px-5 py-3 text-sm font-bold uppercase">Previous</Link> : null}
      <span className="bg-[#20252d] px-5 py-3 text-sm font-bold uppercase text-white">Page {page} of {pagination.totalPages || 1}</span>
      {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="border border-[#dedede] bg-white px-5 py-3 text-sm font-bold uppercase">Next</Link> : null}
    </div>
  )
}

function ArchiveEmpty({ label }: { label: string }) {
  return (
    <div className="border border-dashed border-[#dedede] bg-white p-10 text-center">
      <Search className="mx-auto h-8 w-8 text-[#858b95]" />
      <h2 className="mt-4 text-3xl font-extrabold">No {label.toLowerCase()} found</h2>
      <p className="mt-2 text-sm text-[#606774]">Try another category or refresh this page after publishing new content.</p>
    </div>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ClassifiedArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city']) || globalContent.site.domain
  const seller = getField(post, ['seller', 'author', 'company', 'businessName']) || 'Axidra Seller'
  const summary = getSummary(post)
  return (
    <article className="border-b border-[#dedede] py-10">
      <div className="grid gap-8 md:grid-cols-[200px_minmax(0,1fr)]">
        <Link href={href} className="block bg-[#eef0f4]">
          {image ? <img src={image} alt="" className="aspect-square w-full object-cover" /> : <div className="grid aspect-square place-items-center text-[#858b95]"><Megaphone className="h-12 w-12" /></div>}
        </Link>
        <div className="min-w-0">
          <Link href={href} className="text-2xl font-extrabold uppercase tracking-tight transition hover:text-[var(--archive-accent)]">{post.title || `Classified item ${index + 1}`}</Link>
          <p className="mt-3 max-w-2xl text-[15px] leading-6 text-[#606774]">{summary || 'Axidra details, images, and contact information are available on the listing page.'}</p>
          {price ? <p className="mt-3 text-xl font-bold text-[var(--archive-accent)]">{price}</p> : null}
          <p className="mt-3 text-sm"><span className="font-bold">Sale type:</span> Retail Only</p>
          <p className="mt-3 text-sm font-bold">Added By:</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-extrabold text-[var(--archive-accent)]">{seller}</span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6">{summary.slice(0, 140) || 'Open the detail page for full information.'}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#606774]">
            <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4" /> College Road, Near Main Market</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {location}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <Link href={href} className="font-medium text-[var(--archive-accent)]">Enquire Now</Link>
            <Link href={href} className="font-medium text-[var(--archive-accent)]">View Details</Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group overflow-hidden border border-[#dedede] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef0f4]">
        <img src={getImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]">{getCategory(post, 'Article')}</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--archive-accent)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-xl font-extrabold leading-tight">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#606774]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  return (
    <Link href={href} className="group grid gap-5 border border-[#dedede] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden bg-[#eef0f4] ring-1 ring-[#dedede]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 text-[#858b95]" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="bg-[#20252d] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 border border-[#dedede] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-extrabold leading-tight">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#606774]">{getSummary(post)}</p>
        {phone ? <p className="mt-4 text-xs font-bold text-[#606774]">Phone: {phone}</p> : null}
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden border border-[#dedede] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={getImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 bg-[#eef0f4] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-extrabold leading-tight">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block border border-[#dedede] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#20252d] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="border border-current/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-extrabold leading-tight">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-bold uppercase tracking-[0.14em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group border border-[#dedede] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="bg-[#20252d] p-5 text-white"><FileText className="h-8 w-8" /></div>
        <span className="bg-[#eef0f4] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]">{getCategory(post, 'PDF')}</span>
      </div>
      <h2 className="mt-8 text-2xl font-extrabold leading-tight">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[#606774]">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--archive-accent)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group border border-[#dedede] bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#eef0f4] ring-1 ring-[#dedede]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-[#858b95]" />}
      </div>
      <h2 className="mt-5 text-xl font-extrabold leading-tight">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--archive-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#606774]">{getSummary(post)}</p>
    </Link>
  )
}
