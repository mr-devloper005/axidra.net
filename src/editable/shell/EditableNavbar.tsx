'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { editableLogo } from '@/editable/theme/logo'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navVars = {
    '--editable-nav-bg': '#ffffff',
    '--editable-nav-text': '#20252d',
    '--editable-nav-muted': '#777f8b',
    '--editable-nav-red': '#df1f2d',
    '--editable-border': '#dedede',
    '--editable-container': '1140px',
  } as CSSProperties
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const desktopNavItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      ...navItems.slice(0, 5),
      { label: 'Contact', href: '/contact' },
    ],
    [navItems]
  )
  const secondaryAction = globalContent.nav.actions.secondary

  useEffect(() => {
    const updateIcon = (selector: string, rel: string) => {
      const link =
        document.head.querySelector<HTMLLinkElement>(selector) ||
        document.head.appendChild(document.createElement('link'))

      link.rel = rel
      link.type = 'image/png'
      link.href = editableLogo.src
    }

    updateIcon('link[rel="icon"]', 'icon')
    updateIcon('link[rel="shortcut icon"]', 'shortcut icon')
    updateIcon('link[rel="apple-touch-icon"]', 'apple-touch-icon')
  }, [])

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <div className="mx-auto flex h-[88px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-0">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-sm bg-[#020710] shadow-[0_0_18px_rgba(0,132,255,0.22)]">
            <img src={editableLogo.src} alt={editableLogo.alt} className="h-16 w-16 object-cover" />
          </span>
          <span className="leading-none">
            <span className="block text-[34px] font-black uppercase tracking-[-0.05em] text-[var(--editable-nav-red)] sm:text-[40px]">{globalContent.site.name}</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {desktopNavItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`px-3 py-2 text-sm font-bold uppercase transition ${active ? 'text-[var(--editable-nav-red)]' : 'text-[#4d535e] hover:text-[var(--editable-nav-red)]'}`}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-4">
          <Link href="/signup" className={`hidden px-4 py-3 text-sm font-bold uppercase transition md:inline-flex ${pathname === '/signup' ? 'bg-[var(--editable-nav-red)] text-white' : 'bg-[var(--editable-nav-red)] text-white hover:bg-[#bd1522]'}`}>
            <UserPlus className="mr-2 h-4 w-4" /> Sign up
          </Link>
          <Link href={secondaryAction.href} className="hidden border border-[#c9c9c9] bg-[#eeeeee] px-4 py-3 text-sm font-bold uppercase text-[#1f232b] md:inline-flex">
            <LogIn className="mr-2 h-4 w-4" /> {secondaryAction.label}
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="border border-[var(--editable-border)] bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-4 lg:hidden">
          <form action="/search" className="mx-auto mb-4 flex max-w-[var(--editable-container)] border border-[var(--editable-border)] bg-white">
            <input name="q" type="search" placeholder="Search Axidra products or services" className="min-w-0 flex-1 px-4 py-3 text-sm outline-none" />
            <button className="bg-[var(--editable-nav-red)] px-4 text-white"><Search className="h-4 w-4" /></button>
          </form>
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Sign up', href: '/signup' }, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border border-[var(--editable-border)] bg-[#f8f8f8] px-4 py-3 text-sm font-bold uppercase">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
