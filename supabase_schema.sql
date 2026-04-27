-- ============================================================
-- MAS Pesantren Modern Darul Ihsan - Supabase Database Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: site_settings
-- General site configuration managed via admin panel
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  value_json JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value, value_json) VALUES
  ('site_name', 'MAS Pesantren Modern Darul Ihsan', NULL),
  ('site_tagline', 'Mencetak Generasi Qur''ani & Modern', NULL),
  ('site_description', 'Pendidikan terpadu yang memadukan kecerdasan intelektual, kemandirian karakter, dan nilai-nilai luhur Pesantren Modern.', NULL),
  ('hero_title', 'Wujudkan Masa Depan Gemilang', NULL),
  ('hero_subtitle', 'Mencetak Generasi Qur''ani & Modern dengan kurikulum terpadu yang menyeimbangkan ilmu agama dan pengetahuan umum.', NULL),
  ('hero_image', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200', NULL),
  ('hero_cta_text', 'Daftar PPDB 2025', NULL),
  ('hero_cta_link', '/ppdb', NULL),
  ('akreditasi', 'A', NULL),
  ('alamat', 'Jl. H Mustafa Kamil, Desa Selemak, Kec. Hamparan Perak, Kab. Deli Serdang', NULL),
  ('telp', '0812-3456-7890', NULL),
  ('email', 'info@darulihsan.sch.id', NULL),
  ('instagram', 'https://instagram.com/darulihsan', NULL),
  ('youtube', 'https://youtube.com/@darulihsan', NULL),
  ('whatsapp', '6281234567890', NULL),
  ('logo_url', '', NULL),
  ('stats', NULL, '[{"label":"Santri Aktif","value":"500+"},{"label":"Guru Profesional","value":"50+"},{"label":"Eskul Unggulan","value":"15+"},{"label":"Akreditasi","value":"A"}]'),
  ('visi', 'Mewujudkan insan yang bertaqwa, berilmu, berakhlak mulia, mandiri, dan berwawasan global.', NULL),
  ('misi', NULL, '["Menyelenggarakan pendidikan Islam terpadu yang berkualitas","Membentuk karakter Islami yang kuat dan berakhlakul karimah","Mengembangkan potensi akademik dan non-akademik santri","Mempersiapkan generasi yang siap menghadapi era globalisasi","Membangun lingkungan pesantren yang kondusif dan Islami"]'),
  ('principal_name', 'Dr. H. Ahmad Rifa''i, M.Pd.', NULL),
  ('principal_photo', '', NULL),
  ('principal_quote', 'Kami berkomitmen untuk tidak hanya mentransfer ilmu pengetahuan, tetapi juga membentuk karakter Islami yang kuat. Darul Ihsan adalah tempat dimana tradisi keilmuan Islam bertemu dengan tantangan modernitas.', NULL),
  ('ppdb_open', 'true', NULL),
  ('ppdb_tahun', '2025/2026', NULL),
  ('ppdb_deadline', '2025-07-31', NULL),
  ('ppdb_quota', '120', NULL),
  ('ppdb_biaya_daftar', '150000', NULL),
  ('maps_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0!2d98.6!3d3.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMy43NcKwNDUnMDEuNyJOIDk4wrAzNicwMC4wIkU!5e0!3m2!1sid!2sid!4v1234567890', NULL)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- TABLE: berita (News/Articles)
-- ============================================================
CREATE TABLE IF NOT EXISTS berita (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  judul TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  ringkasan TEXT,
  konten TEXT,
  gambar TEXT,
  kategori TEXT DEFAULT 'Umum',
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  penulis TEXT DEFAULT 'Admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS berita_slug_idx ON berita(slug);
CREATE INDEX IF NOT EXISTS berita_published_idx ON berita(published);
CREATE INDEX IF NOT EXISTS berita_kategori_idx ON berita(kategori);

-- Sample news data
INSERT INTO berita (judul, slug, ringkasan, konten, gambar, kategori, published, featured, penulis, published_at) VALUES
  (
    'Wisuda Tahfidz Angkatan Ke-X: Melahirkan Hafidz Muda Berprestasi',
    'wisuda-tahfidz-angkatan-ke-x',
    'Alhamdulillah, MAS Pesantren Modern Darul Ihsan kembali mewisuda santri-santri terbaik program Tahfidz Al-Quran angkatan ke-X.',
    '<p>Alhamdulillah, MAS Pesantren Modern Darul Ihsan kembali mewisuda santri-santri terbaik program Tahfidz Al-Quran angkatan ke-X. Acara wisuda berlangsung khidmat dan penuh kebanggaan di Aula Utama Pesantren.</p><p>Sebanyak 35 santri berhasil menyelesaikan hafalan 30 juz Al-Quran dengan baik dan benar. Mereka adalah bukti nyata dari kurikulum terpadu yang diterapkan di Darul Ihsan.</p>',
    'https://images.unsplash.com/photo-1627556704302-624286467c65?w=800',
    'AKADEMIK',
    true,
    true,
    'Tim Redaksi',
    NOW() - INTERVAL '14 days'
  ),
  (
    'Juara Umum Olimpiade Sains Nasional Tingkat Kabupaten',
    'juara-olimpiade-sains-nasional',
    'Santri Darul Ihsan kembali mengharumkan nama pesantren dengan meraih Juara Umum pada Olimpiade Sains Nasional tingkat Kabupaten Deli Serdang.',
    '<p>Santri MAS Pesantren Modern Darul Ihsan kembali mengharumkan nama pesantren dengan meraih Juara Umum pada Olimpiade Sains Nasional (OSN) tingkat Kabupaten Deli Serdang tahun 2024.</p><p>Prestasi luar biasa ini diraih melalui kerja keras dan bimbingan intensif dari para guru berdedikasi yang ada di pesantren kami.</p>',
    'https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800',
    'PRESTASI',
    true,
    true,
    'Tim Redaksi',
    NOW() - INTERVAL '21 days'
  ),
  (
    'Seminar Parenting: Mendidik Generasi Z di Era Digital',
    'seminar-parenting-generasi-z',
    'Pesantren Darul Ihsan menyelenggarakan Seminar Parenting bertema Mendidik Generasi Z di Era Digital yang dihadiri ratusan orang tua santri.',
    '<p>MAS Pesantren Modern Darul Ihsan menyelenggarakan Seminar Parenting dengan tema "Mendidik Generasi Z di Era Digital" yang dihadiri oleh ratusan orang tua dan wali santri.</p><p>Seminar ini menghadirkan pakar pendidikan dan psikolog anak terkemuka yang berbagi insight berharga tentang mendidik anak di era digital yang penuh tantangan.</p>',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    'EVENT',
    true,
    false,
    'Tim Redaksi',
    NOW() - INTERVAL '28 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- TABLE: program (Academic Programs)
-- ============================================================
CREATE TABLE IF NOT EXISTS program (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT,
  detail TEXT,
  icon TEXT DEFAULT 'BookOpen',
  warna TEXT DEFAULT 'blue',
  jenjang TEXT DEFAULT 'MA',
  durasi TEXT,
  kuota INTEGER,
  fitur TEXT[],
  gambar TEXT,
  urutan INTEGER DEFAULT 0,
  aktif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO program (nama, deskripsi, detail, icon, warna, jenjang, durasi, fitur, urutan) VALUES
  ('Madrasah Aliyah (MA)', 'Program unggulan setingkat SMA dengan kurikulum nasional dan pesantren yang terintegrasi', 'Program Madrasah Aliyah selama 3 tahun mengintegrasikan kurikulum Kemendikbud dan Kemenag dengan pendidikan kepesantrenan.', 'GraduationCap', 'blue', 'MA', '3 Tahun', ARRAY['Kurikulum Nasional + Pesantren', 'Bahasa Arab & Inggris', 'Tahfidz Al-Quran', 'Kegiatan OSIS & Ekskul'], 1),
  ('Program Tahfidz', 'Program hafalan Al-Quran intensif dengan target 30 juz selama masa studi', 'Program Tahfidz dirancang untuk santri yang ingin fokus menghafal Al-Quran sambil tetap menempuh pendidikan formal.', 'BookOpen', 'green', 'MA', '3 Tahun', ARRAY['Target 30 Juz', 'Muroja''ah Harian', 'Sanad Keilmuan', 'Ijazah Tahfidz'], 2),
  ('Program Bahasa', 'Penguasaan Bahasa Arab dan Inggris sebagai bekal di era global', 'Program bahasa intensif yang mempersiapkan santri untuk berkomunikasi dalam bahasa Arab dan Inggris secara aktif.', 'Languages', 'yellow', 'MA', '3 Tahun', ARRAY['Conversation Daily', 'Arabic Grammar', 'TOEFL Preparation', 'Muhadatsah & Debate'], 3),
  ('Ekskul & Pengembangan Diri', 'Lebih dari 15 kegiatan ekstrakurikuler unggulan untuk pengembangan bakat', 'Beragam pilihan ekstrakurikuler yang membantu santri mengembangkan bakat dan minat mereka.', 'Star', 'purple', 'MA', '', ARRAY['Pramuka', 'Seni & Budaya Islam', 'Olahraga', 'Robotika & IT', 'Jurnalistik', 'Muhadhoroh'], 4)
ON CONFLICT DO NOTHING;

-- ============================================================
-- TABLE: galeri (Photo Gallery)
-- ============================================================
CREATE TABLE IF NOT EXISTS galeri (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  judul TEXT NOT NULL,
  deskripsi TEXT,
  url TEXT NOT NULL,
  kategori TEXT DEFAULT 'Umum',
  urutan INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO galeri (judul, url, kategori, featured) VALUES
  ('Kegiatan Belajar Mengajar', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', 'Akademik', true),
  ('Wisuda Tahfidz', 'https://images.unsplash.com/photo-1627556704302-624286467c65?w=800', 'Event', true),
  ('Olimpiade Sains', 'https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800', 'Prestasi', true),
  ('Pesantren Modern', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', 'Fasilitas', false),
  ('Olahraga & Kesehatan', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', 'Ekskul', false),
  ('Ibadah Bersama', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800', 'Keagamaan', false)
ON CONFLICT DO NOTHING;

-- ============================================================
-- TABLE: pengumuman (Announcements)
-- ============================================================
CREATE TABLE IF NOT EXISTS pengumuman (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  judul TEXT NOT NULL,
  isi TEXT NOT NULL,
  jenis TEXT DEFAULT 'info', -- info, warning, success, danger
  aktif BOOLEAN DEFAULT true,
  urutan INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

INSERT INTO pengumuman (judul, isi, jenis, aktif) VALUES
  ('PPDB 2025/2026 Telah Dibuka!', 'Pendaftaran Peserta Didik Baru Tahun Ajaran 2025/2026 telah resmi dibuka. Kuota terbatas, daftar segera!', 'success', true),
  ('Jadwal Libur Akhir Semester', 'Libur akhir semester ganjil dimulai tanggal 20 Desember 2024 hingga 3 Januari 2025.', 'info', true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- TABLE: prestasi (Achievements)
-- ============================================================
CREATE TABLE IF NOT EXISTS prestasi (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama_prestasi TEXT NOT NULL,
  tingkat TEXT DEFAULT 'Kabupaten', -- Sekolah, Kabupaten, Provinsi, Nasional, Internasional
  tahun INTEGER DEFAULT 2024,
  peraih TEXT,
  deskripsi TEXT,
  gambar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO prestasi (nama_prestasi, tingkat, tahun, peraih, deskripsi) VALUES
  ('Juara 1 Olimpiade Sains Nasional', 'Kabupaten', 2024, 'Ahmad Fauzi', 'Meraih juara pertama bidang Matematika pada OSN tingkat Kabupaten Deli Serdang'),
  ('Hafidz 30 Juz Terbaik', 'Provinsi', 2024, 'Muhammad Rizki', 'Meraih penghargaan Hafidz terbaik pada Musabaqah Tilawatil Quran tingkat Provinsi Sumatera Utara'),
  ('Juara 2 Debat Bahasa Arab', 'Nasional', 2023, 'Siti Aisyah', 'Meraih Juara 2 pada lomba debat bahasa Arab tingkat nasional')
ON CONFLICT DO NOTHING;

-- ============================================================
-- TABLE: ekskul (Extracurricular)
-- ============================================================
CREATE TABLE IF NOT EXISTS ekskul (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT,
  icon TEXT,
  gambar TEXT,
  pembina TEXT,
  jadwal TEXT,
  aktif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO ekskul (nama, deskripsi, icon, pembina, jadwal) VALUES
  ('Pramuka', 'Membentuk karakter kepemimpinan dan kemandirian santri', 'Shield', 'Ustadz Mahmud, S.Pd', 'Sabtu, 15:00-17:00'),
  ('Muhadhoroh', 'Latihan pidato dan public speaking dalam 3 bahasa', 'Mic', 'Ustadzah Aminah, S.Ag', 'Kamis, 19:30-21:00'),
  ('Seni Kaligrafi', 'Mengembangkan jiwa seni melalui tulisan Arab yang indah', 'Pen', 'Ustadz Hasan, S.Sn', 'Ahad, 09:00-11:00'),
  ('Olahraga (Futsal, Badminton)', 'Menjaga kesehatan dan sportivitas santri', 'Dumbbell', 'Ustadz Faisal, S.Or', 'Selasa & Jumat, 16:00-17:30'),
  ('Jurnalistik & Media', 'Menulis, fotografi, dan pengelolaan media sosial pesantren', 'Camera', 'Ustadzah Rara, S.I.Kom', 'Rabu, 15:00-17:00'),
  ('Robotika & IT', 'Mengembangkan kemampuan teknologi dan pemrograman', 'Cpu', 'Ustadz Budi, S.Kom', 'Sabtu, 09:00-11:00')
ON CONFLICT DO NOTHING;

-- ============================================================
-- TABLE: struktur_organisasi (Org Structure)
-- ============================================================
CREATE TABLE IF NOT EXISTS struktur_organisasi (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  foto TEXT,
  email TEXT,
  kualifikasi TEXT,
  urutan INTEGER DEFAULT 0,
  divisi TEXT DEFAULT 'Pimpinan',
  aktif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO struktur_organisasi (nama, jabatan, kualifikasi, divisi, urutan) VALUES
  ('Dr. H. Ahmad Rifa''i, M.Pd.', 'Pimpinan Pesantren', 'Doktor Pendidikan Islam', 'Pimpinan', 1),
  ('Ust. Muhammad Yusuf, S.Ag., M.A.', 'Kepala Madrasah', 'Magister Pendidikan Agama', 'Pimpinan', 2),
  ('Ust. Abdullah Hasan, S.Pd.', 'Wakil Bidang Kurikulum', 'Sarjana Pendidikan', 'Akademik', 3),
  ('Ust. Ibrahim Said, S.Pd.I.', 'Wakil Bidang Kesiswaan', 'Sarjana Pendidikan Islam', 'Akademik', 4),
  ('Hj. Siti Maryam, S.E.', 'Bendahara', 'Sarjana Ekonomi', 'Administrasi', 5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- TABLE: pendaftar (PPDB Applicants)
-- ============================================================
CREATE TABLE IF NOT EXISTS pendaftar (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama_lengkap TEXT NOT NULL,
  nik TEXT,
  tempat_lahir TEXT,
  tanggal_lahir DATE,
  jenis_kelamin TEXT DEFAULT 'L',
  asal_sekolah TEXT,
  nama_ayah TEXT,
  nama_ibu TEXT,
  telp_wali TEXT NOT NULL,
  email TEXT,
  alamat TEXT,
  kecamatan TEXT,
  kabupaten TEXT,
  provinsi TEXT,
  tahun_ajaran TEXT DEFAULT '2025/2026',
  program_pilihan TEXT DEFAULT 'MA Reguler',
  status TEXT DEFAULT 'pending', -- pending, diterima, ditolak, cadangan
  catatan TEXT,
  nomor_pendaftaran TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS pendaftar_status_idx ON pendaftar(status);
CREATE INDEX IF NOT EXISTS pendaftar_tahun_idx ON pendaftar(tahun_ajaran);

-- ============================================================
-- TABLE: ppdb_info (PPDB Content)
-- ============================================================
CREATE TABLE IF NOT EXISTS ppdb_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  value_json JSONB
);

INSERT INTO ppdb_info (key, value, value_json) VALUES
  ('persyaratan', NULL, '["Fotocopy Ijazah/SKL SMP/MTs (dilegalisir)", "Fotocopy Kartu Keluarga", "Fotocopy Akta Kelahiran", "Pas foto 3x4 (4 lembar)", "Surat Keterangan Sehat", "Mengisi formulir pendaftaran online"]'),
  ('alur_pendaftaran', NULL, '["Isi formulir pendaftaran online di website","Cetak dan serahkan berkas ke sekretariat","Ikuti tes seleksi akademik dan wawancara","Pengumuman hasil seleksi","Daftar ulang bagi yang diterima"]'),
  ('jadwal', NULL, '[{"kegiatan":"Pendaftaran Online","tanggal":"1 Juni - 31 Juli 2025"},{"kegiatan":"Seleksi Berkas","tanggal":"1 - 5 Agustus 2025"},{"kegiatan":"Tes Akademik & Wawancara","tanggal":"7 - 9 Agustus 2025"},{"kegiatan":"Pengumuman Hasil","tanggal":"15 Agustus 2025"},{"kegiatan":"Daftar Ulang","tanggal":"16 - 31 Agustus 2025"},{"kegiatan":"Awal Tahun Ajaran","tanggal":"1 September 2025"}]'),
  ('biaya', NULL, '[{"item":"Uang Pendaftaran","nominal":"Rp 150.000"},{"item":"SPP Bulanan","nominal":"Rp 800.000"},{"item":"Uang Gedung","nominal":"Rp 5.000.000"},{"item":"Seragam & Perlengkapan","nominal":"Rp 2.500.000"}]')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- TABLE: kontak_pesan (Contact Messages)
-- ============================================================
CREATE TABLE IF NOT EXISTS kontak_pesan (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  telp TEXT,
  subjek TEXT,
  pesan TEXT NOT NULL,
  dibaca BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- RLS Policies (Row Level Security)
-- ============================================================

-- ============================================================
-- RLS Policies (Row Level Security) - FORCE CLEAN VERSION
-- ============================================================

-- 1. Enable RLS on ALL tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE program ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE ekskul ENABLE ROW LEVEL SECURITY;
ALTER TABLE struktur_organisasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE pendaftar ENABLE ROW LEVEL SECURITY;
ALTER TABLE kontak_pesan ENABLE ROW LEVEL SECURITY;
ALTER TABLE ppdb_info ENABLE ROW LEVEL SECURITY;

-- 2. SITE SETTINGS & PPDB INFO
DROP POLICY IF EXISTS "Public can read site settings" ON site_settings;
DROP POLICY IF EXISTS "Public read site settings" ON site_settings;
DROP POLICY IF EXISTS "Public can read settings" ON site_settings;
CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage site settings" ON site_settings;
DROP POLICY IF EXISTS "Admin can manage site settings" ON site_settings;
DROP POLICY IF EXISTS "Authenticated can manage settings" ON site_settings;
CREATE POLICY "Admin manage site settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read ppdb_info" ON ppdb_info;
DROP POLICY IF EXISTS "Public can read ppdb_info" ON ppdb_info;
CREATE POLICY "Public read ppdb_info" ON ppdb_info FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage ppdb_info" ON ppdb_info;
DROP POLICY IF EXISTS "Authenticated can manage ppdb_info" ON ppdb_info;
CREATE POLICY "Admin manage ppdb_info" ON ppdb_info FOR ALL USING (auth.role() = 'authenticated');

-- 3. BERITA
DROP POLICY IF EXISTS "Public read published berita" ON berita;
DROP POLICY IF EXISTS "Public can read published berita" ON berita;
CREATE POLICY "Public read published berita" ON berita FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admin manage berita" ON berita;
DROP POLICY IF EXISTS "Admin can manage berita" ON berita;
DROP POLICY IF EXISTS "Authenticated can manage berita" ON berita;
CREATE POLICY "Admin manage berita" ON berita FOR ALL USING (auth.role() = 'authenticated');

-- 4. PROGRAM, GALERI, PRESTASI, EKSKUL, STRUKTUR
DROP POLICY IF EXISTS "Public read program" ON program;
DROP POLICY IF EXISTS "Public can read program" ON program;
DROP POLICY IF EXISTS "Public can read active programs" ON program;
CREATE POLICY "Public read program" ON program FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage program" ON program;
DROP POLICY IF EXISTS "Authenticated can manage program" ON program;
CREATE POLICY "Admin manage program" ON program FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read galeri" ON galeri;
DROP POLICY IF EXISTS "Public can read galeri" ON galeri;
CREATE POLICY "Public read galeri" ON galeri FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage galeri" ON galeri;
DROP POLICY IF EXISTS "Authenticated can manage galeri" ON galeri;
CREATE POLICY "Admin manage galeri" ON galeri FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read prestasi" ON prestasi;
DROP POLICY IF EXISTS "Public can read prestasi" ON prestasi;
CREATE POLICY "Public read prestasi" ON prestasi FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage prestasi" ON prestasi;
DROP POLICY IF EXISTS "Authenticated can manage prestasi" ON prestasi;
CREATE POLICY "Admin manage prestasi" ON prestasi FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read ekskul" ON ekskul;
DROP POLICY IF EXISTS "Public can read ekskul" ON ekskul;
DROP POLICY IF EXISTS "Public can read active ekskul" ON ekskul;
CREATE POLICY "Public read ekskul" ON ekskul FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage ekskul" ON ekskul;
DROP POLICY IF EXISTS "Authenticated can manage ekskul" ON ekskul;
CREATE POLICY "Admin manage ekskul" ON ekskul FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read struktur" ON struktur_organisasi;
DROP POLICY IF EXISTS "Public can read struktur" ON struktur_organisasi;
CREATE POLICY "Public read struktur" ON struktur_organisasi FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage struktur" ON struktur_organisasi;
DROP POLICY IF EXISTS "Authenticated can manage struktur" ON struktur_organisasi;
CREATE POLICY "Admin manage struktur" ON struktur_organisasi FOR ALL USING (auth.role() = 'authenticated');

-- 5. PENGUMUMAN
DROP POLICY IF EXISTS "Public read active pengumuman" ON pengumuman;
DROP POLICY IF EXISTS "Public can read pengumuman" ON pengumuman;
DROP POLICY IF EXISTS "Public can read active pengumuman" ON pengumuman;
CREATE POLICY "Public read active pengumuman" ON pengumuman FOR SELECT USING (aktif = true);
DROP POLICY IF EXISTS "Admin manage pengumuman" ON pengumuman;
DROP POLICY IF EXISTS "Authenticated can manage pengumuman" ON pengumuman;
CREATE POLICY "Admin manage pengumuman" ON pengumuman FOR ALL USING (auth.role() = 'authenticated');

-- 6. PPDB
DROP POLICY IF EXISTS "Public submit ppdb" ON pendaftar;
DROP POLICY IF EXISTS "Public can submit ppdb" ON pendaftar;
DROP POLICY IF EXISTS "Public can insert pendaftar" ON pendaftar;
CREATE POLICY "Public submit ppdb" ON pendaftar FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage ppdb" ON pendaftar;
DROP POLICY IF EXISTS "Authenticated can read pendaftar" ON pendaftar;
DROP POLICY IF EXISTS "Authenticated can update pendaftar" ON pendaftar;
CREATE POLICY "Admin manage ppdb" ON pendaftar FOR ALL USING (auth.role() = 'authenticated');

-- 7. KONTAK
DROP POLICY IF EXISTS "Public submit kontak" ON kontak_pesan;
DROP POLICY IF EXISTS "Public can submit kontak" ON kontak_pesan;
DROP POLICY IF EXISTS "Public can send kontak" ON kontak_pesan;
CREATE POLICY "Public submit kontak" ON kontak_pesan FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage kontak" ON kontak_pesan;
DROP POLICY IF EXISTS "Authenticated can read kontak" ON kontak_pesan;
DROP POLICY IF EXISTS "Authenticated can update kontak" ON kontak_pesan;
CREATE POLICY "Admin manage kontak" ON kontak_pesan FOR ALL USING (auth.role() = 'authenticated');



-- ============================================================
-- Functions
-- ============================================================

-- Auto update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_berita_updated_at ON berita;
CREATE TRIGGER update_berita_updated_at BEFORE UPDATE ON berita FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_program_updated_at ON program;
CREATE TRIGGER update_program_updated_at BEFORE UPDATE ON program FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pendaftar_updated_at ON pendaftar;
CREATE TRIGGER update_pendaftar_updated_at BEFORE UPDATE ON pendaftar FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Generate nomor pendaftaran
CREATE OR REPLACE FUNCTION generate_nomor_pendaftaran()
RETURNS TRIGGER AS $$
DECLARE
  tahun TEXT;
  urutan INTEGER;
BEGIN
  tahun := TO_CHAR(NOW(), 'YYYY');
  SELECT COUNT(*) + 1 INTO urutan FROM pendaftar WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
  NEW.nomor_pendaftaran := 'DI-' || tahun || '-' || LPAD(urutan::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_nomor_pendaftaran ON pendaftar;
CREATE TRIGGER set_nomor_pendaftaran BEFORE INSERT ON pendaftar FOR EACH ROW EXECUTE FUNCTION generate_nomor_pendaftaran();


-- ============================================================
-- Storage Buckets (run in Supabase Dashboard)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('darulihsan', 'darulihsan', true);
-- ============================================================
-- 11. STORAGE BUCKET SETUP (Instruksi)
-- ============================================================
-- Jalankan ini di SQL Editor untuk memberikan izin akses storage
-- Pastikan Anda sudah membuat bucket bernama 'uploads' di dashboard Storage Supabase

INSERT INTO storage.buckets (id, name, public) 
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');

DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads');

DROP POLICY IF EXISTS "Admin Update" ON storage.objects;
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (bucket_id = 'uploads');

DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'uploads');

-- ============================================================
-- 12. DUMMY DATA LENGKAP (Fixed Columns)
-- ============================================================

-- Program
INSERT INTO program (nama, deskripsi, icon, fitur, aktif) VALUES
('Program Tahfidz Al-Quran', 'Program unggulan untuk mencetak Hafidz 30 Juz dengan metode mutqin.', 'BookOpen', ARRAY['Setoran harian', 'Tasmi berkala', 'Karantina Tahfidz'], true),
('Madrasah Aliyah Plus', 'Kurikulum nasional yang diperkaya dengan muatan lokal pesantren dan IT.', 'GraduationCap', ARRAY['Persiapan PTN', 'Kelas Digital', 'Bimbingan UTBK'], true),
('Bahasa Asing Intensif', 'Penguasaan Bahasa Arab dan Inggris melalui lingkungan berbahasa aktif.', 'Languages', ARRAY['Arabic Day', 'English Competition', 'Native Speaker visit'], true)
ON CONFLICT DO NOTHING;

-- Prestasi
INSERT INTO prestasi (nama_prestasi, tingkat, tahun, deskripsi, gambar) VALUES
('Juara 1 Pidato Bahasa Arab Nasional', 'Nasional', 2024, 'Meraih medali emas dalam kompetisi POSPENAS tingkat Nasional.', 'https://images.unsplash.com/photo-1567057420215-39cb32e53005?w=800'),
('Medali Perak Olimpiade Matematika', 'Provinsi', 2023, 'Kompetisi Sains Madrasah (KSM) tingkat Provinsi.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800')
ON CONFLICT DO NOTHING;

-- Ekskul
INSERT INTO ekskul (nama, deskripsi, icon, jadwal) VALUES
('Pramuka', 'Membentuk karakter disiplin dan mandiri.', 'Compass', 'Sabtu, 15:00'),
('Panahan', 'Melatih fokus dan konsentrasi sesuai sunnah.', 'Target', 'Minggu, 08:00'),
('Robotik', 'Inovasi teknologi masa depan.', 'Cpu', 'Kamis, 14:00'),
('Seni Kaligrafi', 'Keindahan menulis ayat-ayat Al-Quran.', 'PenTool', 'Jumat, 14:00')
ON CONFLICT DO NOTHING;

-- Pengumuman
INSERT INTO pengumuman (judul, isi, jenis, aktif) VALUES
('Pendaftaran Santri Baru 2025/2026', 'Pendaftaran gelombang pertama telah dibuka hingga akhir Maret 2025.', 'success', true),
('Libur Akhir Semester', 'Santri diperbolehkan pulang mulai tanggal 20 Desember 2024.', 'warning', false)
ON CONFLICT DO NOTHING;

