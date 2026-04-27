import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGaleri } from "@/lib/data";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Galeri foto MAS Pesantren Modern Darul Ihsan - momen kegiatan, prestasi, dan kehidupan pesantren.",
};

export const revalidate = 60;

const kategoriList = ["Semua", "Akademik", "Event", "Prestasi", "Fasilitas", "Ekskul", "Keagamaan"];

export default async function GaleriPage() {
  const galeri = await getGaleri();

  return (
    <>
      {/* Header */}
      <section className="relative py-20 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-0.5 w-12 bg-[#D4AF37] mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Galeri</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Momen berharga dari kehidupan di Darul Ihsan</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Galeri</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {galeri.map((item) => (
              <div key={item.id} className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.judul}
                    width={600}
                    height={400}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white font-bold text-sm">{item.judul}</p>
                      <span className="text-[#D4AF37] text-xs font-semibold">{item.kategori}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {galeri.length === 0 && (
            <div className="text-center py-24 text-slate-400">
              <p>Galeri sedang dalam pengembangan</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
