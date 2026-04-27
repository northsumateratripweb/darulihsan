# MAS Pesantren Modern Darul Ihsan - Website Resmi

Website resmi MAS Pesantren Modern Darul Ihsan dibangun dengan Next.js 14, TailwindCSS, dan Supabase.

## 🌐 Live Website
- **Public**: [darulihsan.vercel.app](https://darulihsan.vercel.app)
- **Admin Panel**: [darulihsan.vercel.app/admin](https://darulihsan.vercel.app/admin)

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: TailwindCSS v4
- **Auth**: Supabase Auth
- **Deploy**: Vercel

## 🚀 Cara Setup Lokal

### 1. Clone & Install
```bash
git clone https://github.com/northsumateratripweb/darulihsan.git
cd darulihsan
npm install
```

### 2. Setup Supabase
1. Buat project baru di [supabase.com](https://supabase.com)
2. Jalankan `supabase_schema.sql` di SQL Editor Supabase
3. Salin URL dan anon key dari Project Settings > API

### 3. Setup Environment
```bash
cp .env.example .env.local
# Edit .env.local dengan kredensial Supabase Anda
```

### 4. Jalankan
```bash
npm run dev
# Buka http://localhost:3000
```

## 📁 Struktur Folder
```
src/
├── app/
│   ├── (public)/       # Halaman publik
│   │   ├── page.tsx    # Beranda
│   │   ├── visi-misi/
│   │   ├── program/
│   │   ├── berita/
│   │   ├── galeri/
│   │   ├── ppdb/
│   │   ├── profil/
│   │   └── kontak/
│   └── admin/          # Panel admin (butuh auth)
│       ├── page.tsx    # Dashboard
│       ├── berita/
│       ├── ppdb/
│       ├── settings/
│       └── ...
├── components/         # Komponen reusable
└── lib/               # Utilities & Supabase client
```

## 🗄️ Database Tables
- `site_settings` - Pengaturan konten website
- `berita` - Berita & artikel
- `program` - Program akademik
- `galeri` - Galeri foto
- `pengumuman` - Pengumuman
- `prestasi` - Prestasi santri
- `ekskul` - Ekstrakurikuler
- `struktur_organisasi` - Struktur org
- `pendaftar` - Pendaftar PPDB
- `kontak_pesan` - Pesan kontak

## 📜 Lisensi
© 2024 MAS Pesantren Modern Darul Ihsan. All rights reserved.
