'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-white text-[#20252d]',
      panel: 'border border-[#dedede] bg-white',
      soft: 'border border-[#dedede] bg-[#f5f5f5]',
      muted: 'text-[#606774]',
      action: 'bg-[#20252d] text-white hover:bg-[#20252d]/90',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#f7f7f7] text-[#20252d]',
      panel: 'border border-[#dedede] bg-white',
      soft: 'border border-[#dedede] bg-[#f5f5f5]',
      muted: 'text-[#606774]',
      action: 'bg-[#20252d] text-white hover:bg-[#20252d]/90',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#1b1b1b] text-white',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      muted: 'text-[#858b95]',
      action: 'bg-[#df1f2d] text-white hover:bg-[#df1f2d]/90',
    }
  }
  return {
    shell: 'bg-[#f7f7f7] text-[#20252d]',
    panel: 'border border-[#dedede] bg-white',
    soft: 'border border-[#dedede] bg-[#f5f5f5]',
    muted: 'text-[#606774]',
    action: 'bg-[#20252d] text-white hover:bg-[#20252d]/90',
  }
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)

  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Axidra business onboarding', body: 'Add listings, verify operational details, and bring your Axidra business surface live quickly.' },
          { icon: Phone, title: 'Axidra partnership support', body: 'Talk through bulk publishing, growth, and operational setup questions for axidra.net.' },
          { icon: MapPin, title: 'Axidra coverage requests', body: 'Need a new geography or category lane? We can shape Axidra around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Axidra editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit Axidra.' },
            { icon: Mail, title: 'Axidra partnerships', body: 'Coordinate sponsorships, collaborations, and campaign questions for axidra.net.' },
            { icon: Sparkles, title: 'Axidra contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Axidra creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Axidra licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Axidra media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Axidra collection submissions', body: 'Suggest resources, boards, and links that deserve a place on Axidra.' },
              { icon: Mail, title: 'Axidra resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Axidra curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <EditableSiteShell className={tone.shell}>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">{pagesContent.contact.title}</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-semibold">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
