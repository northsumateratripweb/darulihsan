import { createClient } from './supabase/server'
import type { SiteSettingsMap } from './types'

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('*')
  
  if (!data) return {}
  
  const settings: Record<string, unknown> = {}
  for (const row of data) {
    settings[row.key] = row.value_json ?? row.value
  }
  return settings as SiteSettingsMap
}

export async function getBerita(limit = 10, kategori?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('berita')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  
  if (kategori) query = query.eq('kategori', kategori)
  
  const { data } = await query
  return data || []
}

export async function getBeritaBySlug(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('berita')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data
}

export async function getProgram() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('program')
    .select('*')
    .eq('aktif', true)
    .order('urutan')
  return data || []
}

export async function getGaleri(featured?: boolean) {
  const supabase = await createClient()
  let query = supabase.from('galeri').select('*').order('urutan')
  if (featured) query = query.eq('featured', true)
  const { data } = await query
  return data || []
}

export async function getPengumuman() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('pengumuman')
    .select('*')
    .eq('aktif', true)
    .order('urutan')
  return data || []
}

export async function getPrestasi() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('prestasi')
    .select('*')
    .order('tahun', { ascending: false })
  return data || []
}

export async function getEkskul() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ekskul')
    .select('*')
    .eq('aktif', true)
    .order('nama')
  return data || []
}

export async function getStruktur() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('struktur_organisasi')
    .select('*')
    .eq('aktif', true)
    .order('urutan')
  return data || []
}

export async function getPpdbInfo() {
  const supabase = await createClient()
  const { data } = await supabase.from('ppdb_info').select('*')
  if (!data) return {}
  
  const info: Record<string, unknown> = {}
  for (const row of data) {
    info[row.key] = row.value_json ?? row.value
  }
  return info
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}
