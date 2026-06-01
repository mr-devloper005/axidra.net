import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { editableLogo } from '@/editable/theme/logo'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#1b1b1b', '--editable-footer-text': '#aeb4bf', '--editable-red': '#df1f2d', '--editable-container': '1140px' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()

  return (
    <footer style={footerVars} className="border-t-2 border-[var(--editable-red)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[190px_minmax(0,1fr)_220px_160px] lg:px-0">
        <div>
          <Link href="/" className="block">
            <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-sm bg-[#020710] shadow-[0_0_24px_rgba(0,132,255,0.26)]">
              <img src={editableLogo.src} alt={editableLogo.alt} className="h-24 w-24 object-cover" />
            </span>
            <span className="mt-3 block text-2xl font-black uppercase tracking-[-0.04em] text-[var(--editable-red)]">{globalContent.site.name}</span>
          </Link>
        </div>

        <div className="max-w-xl">
          <p className="text-sm leading-7">{globalContent.footer.description}</p>
          <p className="mt-5 text-sm leading-7">Use Axidra.net to compare services, products, posts, and business information before opening the details that matter.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-[var(--editable-red)]" /> Axidra support</span>
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-[var(--editable-red)]" /> Axidra contact</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">About {globalContent.site.name}</h3>
          <div className="mt-5 grid gap-3">
            {[
              ['Home', '/'] as const,
              ...taskLinks.map((task) => [task.label, task.route] as const),
              ['About', '/about'] as const,
              ['Contact Us', '/contact'] as const,
              ['Sign up', '/signup'] as const,
              ['Login', '/login'] as const,
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm transition hover:text-white">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">Follow us on</h3>
          <div className="mt-5 flex gap-3 text-[var(--editable-red)]">
            <Facebook className="h-5 w-5" />
            <Twitter className="h-5 w-5" />
            <Instagram className="h-5 w-5" />
            <Linkedin className="h-5 w-5" />
          </div>
          <Link href="/login" className="mt-8 inline-flex bg-[var(--editable-red)] px-8 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#bd1522]">Login</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-[var(--editable-container)] flex-col gap-3 border-t border-white/10 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-0">
        <span>{year} © {globalContent.site.name} All rights reserved</span>
        <span>Powered by <span className="text-[var(--editable-red)]">{globalContent.site.domain}</span></span>
      </div>
    </footer>
  )
}
