import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { getBerita } from "@/lib/data";
import { formatDate } from "@/lib/data";

export const metadata: Metadata = {
  title: "Berita & Informasi",
  description: "Berita terkini dan informasi seputar MAS Pesantren Modern Darul Ihsan.",
};

export const revalidate = 60;

const kategoriColors: Record<string, string> = {
  AKADEMIK: "bg-blue-600",
  PRESTASI: "bg-emerald-600",
  EVENT: "bg-orange-600",
  UMUM: "bg-slate-600",
};

export default async function BeritaPage() {
  const berita = await getBerita(20);
  const featured = berita.find((b) => b.featured);
  const others = berita.filter((b) => !b.featured || b !== featured);

  return (
    <>
      {/* Header */}
      <section className="relative py-20 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-0.5 w-12 bg-[#D4AF37] mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Warta Darul Ihsan</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Berita, prestasi, dan informasi terkini dari pesantren</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Berita</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          {featured && (
            <Link href={`/berita/${featured.slug}`} className="group block mb-16 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-72 lg:h-auto overflow-hidden">
                  {featured.gambar && (
                    <Image
                      src={featured.gambar}
                      alt={featured.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <span className="absolute top-4 left-4 bg-[#D4AF37] text-[#0A2540] text-xs font-extrabold px-4 py-1.5 rounded-full">
                    ✦ Featured
                  </span>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <span className={`text-white text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-4 ${kategoriColors[featured.kategori] || "bg-slate-600"}`}>
                    {featured.kategori}
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#0A2540] mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                    {featured.judul}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{featured.ringkasan}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featured.published_at ? formatDate(featured.published_at) : formatDate(featured.created_at)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(others.length > 0 ? others : berita).map((item) => (
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
                  <span className={`absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1.5 rounded-full ${kategoriColors[item.kategori] || "bg-slate-600"}`}>
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
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">{item.ringkasan}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                    Selengkapnya <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {berita.length === 0 && (
            <div className="text-center py-24 text-slate-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">Belum ada berita yang dipublikasikan.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
