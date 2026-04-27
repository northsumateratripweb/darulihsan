import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  BookOpen,
  Users,
  Award,
  ChevronRight,
  Calendar,
  Quote,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { getSiteSettings, getBerita, getPengumuman, getGaleri } from "@/lib/data";
import { formatDate } from "@/lib/data";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "MAS Pesantren Modern Darul Ihsan - Mencetak Generasi Qur'ani & Modern dengan akreditasi A.",
};

export const revalidate = 60;

export default async function HomePage() {
  const [settings, berita, pengumuman, galeri] = await Promise.all([
    getSiteSettings(),
    getBerita(3),
    getPengumuman(),
    getGaleri(true),
  ]);

  const stats = (settings.stats as Array<{ label: string; value: string }>) || [
    { label: "Santri Aktif", value: "500+" },
    { label: "Guru Profesional", value: "50+" },
    { label: "Eskul Unggulan", value: "15+" },
    { label: "Akreditasi", value: "A" },
  ];

  const misi = (settings.misi as string[]) || [
    "Menyelenggarakan pendidikan Islam terpadu yang berkualitas",
    "Membentuk karakter Islami yang kuat dan berakhlakul karimah",
    "Mengembangkan potensi akademik dan non-akademik santri",
    "Mempersiapkan generasi yang siap menghadapi era globalisasi",
  ];

  return (
    <>
      {/* Pengumuman Banner */}
      {pengumuman && pengumuman.length > 0 && (
        <div
          className={`w-full py-2.5 px-4 text-center text-sm font-medium ${
            pengumuman[0].jenis === "success"
              ? "bg-emerald-600 text-white"
              : pengumuman[0].jenis === "warning"
              ? "bg-amber-500 text-white"
              : "bg-[#0A2540] text-white"
          }`}
        >
          <span className="font-bold">{pengumuman[0].judul}:</span>{" "}
          {pengumuman[0].isi}
          {pengumuman[0].jenis === "success" && (
            <Link href="/ppdb" className="ml-3 underline font-bold">
              Daftar Sekarang →
            </Link>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={
              settings.hero_image ||
              "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600"
            }
            alt="MAS Pesantren Modern Darul Ihsan"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/80 via-[#0A2540]/50 to-transparent" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span>Akreditasi A — Pesantren Modern Unggulan</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              {settings.hero_title || "Wujudkan Masa Depan"}{" "}
              <span className="text-[#D4AF37]">Gemilang</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl leading-relaxed">
              {settings.hero_subtitle ||
                "Mencetak Generasi Qur'ani & Modern dengan kurikulum terpadu yang menyeimbangkan ilmu agama dan pengetahuan umum."}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/ppdb"
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0A2540] px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-[#f0d060] transition-all shadow-2xl hover:shadow-[#D4AF37]/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                {settings.hero_cta_text || "Daftar PPDB 2025"}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Profil Pesantren
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-medium">Scroll</span>
          <div className="w-0.5 h-8 bg-white/30 rounded-full relative overflow-hidden">
            <div className="w-full h-1/2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 -mt-16">
        <div className="glass rounded-3xl shadow-2xl border border-white/50 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center ${
                  i > 0 ? "md:border-l border-slate-100" : ""
                }`}
              >
                <div className="text-3xl md:text-4xl font-extrabold text-[#0A2540] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-50 rounded-3xl -z-10" />
              <div className="relative rounded-3xl overflow-hidden h-[500px] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
                  alt="Gedung MAS Pesantren Modern Darul Ihsan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Quote card */}
              <div className="absolute -bottom-8 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 max-w-sm">
                <Quote className="w-8 h-8 text-[#D4AF37] mb-3" />
                <p className="text-slate-700 text-sm italic font-medium leading-relaxed mb-4">
                  &ldquo;
                  {settings.principal_quote ||
                    "Kami berkomitmen membentuk karakter Islami yang kuat selaras dengan tantangan modernitas."}
                  &rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A2540] flex items-center justify-center text-white text-xs font-bold">
                    {(settings.principal_name || "Ahmad Rifa'i")
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-bold text-[#0A2540] text-sm">
                      {settings.principal_name || "Dr. H. Ahmad Rifa'i, M.Pd."}
                    </div>
                    <div className="text-slate-500 text-xs">
                      Pimpinan Pesantren
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="lg:pl-8">
              <div className="section-title">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Mengenal Darul Ihsan
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-[#0A2540] mb-6 leading-tight">
                Membangun Masa Depan Berbasis Iman &amp; Ilmu
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                MAS Pesantren Modern Darul Ihsan berkomitmen melahirkan sumber
                daya manusia yang bertaqwa, berwawasan global, dan memiliki
                integritas tinggi melalui pendidikan pesantren modern yang
                dinamis.
              </p>

              {/* Misi list */}
              <ul className="space-y-3 mb-8">
                {misi.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1e3a5f] transition-all shadow-lg"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/visi-misi"
                  className="inline-flex items-center gap-2 border-2 border-[#0A2540] text-[#0A2540] px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                >
                  Visi &amp; Misi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Keunggulan */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-0.5 w-12 bg-[#D4AF37] mr-3" />
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Keunggulan Kami
              </span>
              <div className="h-0.5 w-12 bg-[#D4AF37] ml-3" />
            </div>
            <h2 className="text-4xl font-extrabold text-[#0A2540]">
              Mengapa Memilih Darul Ihsan?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                color: "blue",
                title: "Kurikulum Terpadu",
                desc: "Integrasi sempurna antara kurikulum Kemendikbud, Kemenag, dan kurikulum kepesantrenan yang komprehensif.",
              },
              {
                icon: Award,
                color: "gold",
                title: "Akreditasi A",
                desc: "Mendapatkan akreditasi A dari BAN-SM sebagai bukti kualitas pendidikan yang terstandarisasi.",
              },
              {
                icon: Users,
                color: "green",
                title: "Guru Berdedikasi",
                desc: "50+ tenaga pendidik profesional berpengalaman dengan latar belakang pendidikan yang mumpuni.",
              },
              {
                icon: Star,
                color: "purple",
                title: "Program Tahfidz",
                desc: "Program hafalan Al-Quran intensif dengan target 30 juz selama masa studi bersama pengajar bersanad.",
              },
              {
                icon: BookOpen,
                color: "orange",
                title: "Bahasa Internasional",
                desc: "Pembelajaran Bahasa Arab dan Inggris aktif setiap hari untuk mempersiapkan santri di era global.",
              },
              {
                icon: Users,
                color: "teal",
                title: "Asrama & Lingkungan Islami",
                desc: "Fasilitas asrama modern yang menciptakan lingkungan kondusif untuk tumbuh kembang santri.",
              },
            ].map((item, i) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-100 text-blue-600",
                gold: "bg-amber-100 text-amber-600",
                green: "bg-emerald-100 text-emerald-600",
                purple: "bg-purple-100 text-purple-600",
                orange: "bg-orange-100 text-orange-600",
                teal: "bg-teal-100 text-teal-600",
              };
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 card-hover group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                      colorMap[item.color]
                    } group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl text-[#0A2540] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="section-title">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Informasi Terkini
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-[#0A2540]">
                Warta Darul Ihsan
              </h2>
            </div>
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
            >
              Lihat Semua Berita
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {berita.length > 0
              ? berita.map((item) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.slug}`}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 card-hover"
                  >
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      {item.gambar && (
                        <Image
                          src={item.gambar}
                          alt={item.judul}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                      <span
                        className={`absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1.5 rounded-full ${
                          item.kategori === "PRESTASI"
                            ? "bg-emerald-600"
                            : item.kategori === "EVENT"
                            ? "bg-orange-600"
                            : "bg-blue-600"
                        }`}
                      >
                        {item.kategori}
                      </span>
                    </div>
                    <div className="p-7">
                      <p className="text-slate-400 text-xs mb-3 flex items-center gap-2 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.published_at ? formatDate(item.published_at) : formatDate(item.created_at)}
                      </p>
                      <h4 className="text-lg font-bold text-[#0A2540] mb-3 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {item.judul}
                      </h4>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {item.ringkasan}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                        Selengkapnya
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))
              : // Skeleton placeholders
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
                  >
                    <div className="h-56 skeleton" />
                    <div className="p-7 space-y-3">
                      <div className="h-3 w-24 skeleton rounded" />
                      <div className="h-5 skeleton rounded" />
                      <div className="h-5 w-3/4 skeleton rounded" />
                      <div className="h-4 skeleton rounded" />
                      <div className="h-4 w-5/6 skeleton rounded" />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      {galeri.length > 0 && (
        <section className="py-24 bg-[#0A2540]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <div className="h-0.5 w-12 bg-[#D4AF37] mb-3" />
                <h2 className="text-4xl font-extrabold text-white">
                  Galeri Pesantren
                </h2>
                <p className="text-slate-400 mt-2">
                  Momen berharga di Darul Ihsan
                </p>
              </div>
              <Link
                href="/galeri"
                className="inline-flex items-center gap-2 text-[#D4AF37] font-bold"
              >
                Lihat Semua
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galeri.slice(0, 6).map((item, i) => (
                <div
                  key={item.id}
                  className={`relative overflow-hidden rounded-2xl group ${
                    i === 0 ? "md:row-span-2" : ""
                  }`}
                  style={{ minHeight: i === 0 ? "320px" : "160px" }}
                >
                  <Image
                    src={item.url}
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#0A2540]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold text-sm text-center px-4">
                      {item.judul}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PPDB CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#f0d060] to-[#D4AF37]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A2540' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0A2540]/10 border border-[#0A2540]/20 text-[#0A2540] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4 fill-[#0A2540]" />
            Tahun Ajaran {settings.ppdb_tahun || "2025/2026"}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-6 uppercase tracking-tight">
            Segera Bergabung Bersama Kami!
          </h2>
          <p className="text-[#0A2540]/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Pendaftaran Peserta Didik Baru T.A {settings.ppdb_tahun || "2025/2026"} telah
            dibuka. Kuota terbatas! Pastikan putra-putri Anda mendapat tempat
            terbaik.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/ppdb"
              className="inline-flex items-center justify-center gap-2 bg-[#0A2540] text-white px-10 py-4 rounded-2xl font-extrabold text-lg hover:bg-[#1e3a5f] transition-all shadow-2xl"
            >
              Daftar Online Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/30 border-2 border-[#0A2540]/30 text-[#0A2540] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/50 transition-all"
            >
              <Phone className="w-5 h-5" />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
