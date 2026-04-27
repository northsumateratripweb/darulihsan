// ============================================================
// Type Definitions for Supabase Tables
// ============================================================

export interface SiteSetting {
  id: string
  key: string
  value: string | null
  value_json: unknown
  updated_at: string
}

export interface Berita {
  id: string
  judul: string
  slug: string
  ringkasan: string | null
  konten: string | null
  gambar: string | null
  kategori: string
  tags: string[] | null
  published: boolean
  featured: boolean
  penulis: string
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface Program {
  id: string
  nama: string
  deskripsi: string | null
  detail: string | null
  icon: string
  warna: string
  jenjang: string
  durasi: string | null
  kuota: number | null
  fitur: string[] | null
  gambar: string | null
  urutan: number
  aktif: boolean
  created_at: string
  updated_at: string
}

export interface Galeri {
  id: string
  judul: string
  deskripsi: string | null
  url: string
  kategori: string
  urutan: number
  featured: boolean
  created_at: string
}

export interface Pengumuman {
  id: string
  judul: string
  isi: string
  jenis: 'info' | 'warning' | 'success' | 'danger'
  aktif: boolean
  urutan: number
  created_at: string
  expires_at: string | null
}

export interface Prestasi {
  id: string
  nama_prestasi: string
  tingkat: string
  tahun: number
  peraih: string | null
  deskripsi: string | null
  gambar: string | null
  created_at: string
}

export interface Ekskul {
  id: string
  nama: string
  deskripsi: string | null
  icon: string | null
  gambar: string | null
  pembina: string | null
  jadwal: string | null
  aktif: boolean
  created_at: string
}

export interface StrukturOrganisasi {
  id: string
  nama: string
  jabatan: string
  foto: string | null
  email: string | null
  kualifikasi: string | null
  urutan: number
  divisi: string
  aktif: boolean
  created_at: string
}

export interface Pendaftar {
  id: string
  nama_lengkap: string
  nik: string | null
  tempat_lahir: string | null
  tanggal_lahir: string | null
  jenis_kelamin: string
  asal_sekolah: string | null
  nama_ayah: string | null
  nama_ibu: string | null
  telp_wali: string
  email: string | null
  alamat: string | null
  kecamatan: string | null
  kabupaten: string | null
  provinsi: string | null
  tahun_ajaran: string
  program_pilihan: string
  status: 'pending' | 'diterima' | 'ditolak' | 'cadangan'
  catatan: string | null
  nomor_pendaftaran: string | null
  created_at: string
  updated_at: string
}

export interface KontakPesan {
  id: string
  nama: string
  email: string
  telp: string | null
  subjek: string | null
  pesan: string
  dibaca: boolean
  created_at: string
}

export interface PpdbInfo {
  id: string
  key: string
  value: string | null
  value_json: unknown
}

// Settings helpers
export interface SiteSettingsMap {
  site_name?: string
  site_tagline?: string
  site_description?: string
  hero_title?: string
  hero_subtitle?: string
  hero_image?: string
  hero_cta_text?: string
  hero_cta_link?: string
  akreditasi?: string
  alamat?: string
  telp?: string
  email?: string
  instagram?: string
  youtube?: string
  whatsapp?: string
  logo_url?: string
  stats?: Array<{ label: string; value: string }>
  visi?: string
  misi?: string[]
  principal_name?: string
  principal_photo?: string
  principal_quote?: string
  ppdb_open?: string
  ppdb_tahun?: string
  ppdb_deadline?: string
  ppdb_quota?: string
  maps_embed?: string
}
