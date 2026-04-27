import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings, getStruktur } from "@/lib/data";
import { ArrowRight, CheckCircle2, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Profil Pesantren",
  description: "Profil dan sejarah MAS Pesantren Modern Darul Ihsan di Hamparan Perak, Deli Serdang.",
};

export const revalidate = 60;

export default async function ProfilPage() {
  const [settings, struktur] = await Promise.all([getSiteSettings(), getStruktur()]);

  return (
    <>
      {/* Header */}
      <section className="relative py-20 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-0.5 w-12 bg-[#D4AF37] mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Profil Pesantren</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Mengenal lebih dekat MAS Pesantren Modern Darul Ihsan</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Profil</span>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
                alt="Gedung Darul Ihsan"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="section-title">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">About Us</span>
              </div>
              <h2 className="text-4xl font-extrabold text-[#0A2540] mb-6 leading-tight">
                Mengenal MAS Pesantren Modern Darul Ihsan
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>MAS Pesantren Modern Darul Ihsan adalah lembaga pendidikan Islam yang berdiri di Kecamatan Hamparan Perak, Kabupaten Deli Serdang, Sumatera Utara. Pesantren ini didirikan dengan visi untuk melahirkan generasi yang tidak hanya cerdas secara intelektual, tetapi juga kuat dalam iman dan akhlak.</p>
                <p>Dengan menggabungkan kurikulum nasional (Kemendikbud dan Kemenag) dengan kurikulum kepesantrenan yang komprehensif, Darul Ihsan hadir sebagai solusi pendidikan yang menjawab tantangan zaman tanpa meninggalkan nilai-nilai Islam yang agung.</p>
                <p>Program unggulan seperti Tahfidz Al-Quran, penguasaan Bahasa Arab dan Inggris aktif, serta beragam kegiatan ekstrakurikuler menjadikan Darul Ihsan sebagai pilihan terbaik bagi keluarga yang mendambakan pendidikan holistik untuk putra-putri mereka.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Tahun Berdiri", value: "2005" },
                  { label: "Akreditasi", value: settings.akreditasi || "A" },
                  { label: "Total Santri", value: "500+" },
                  { label: "Tenaga Pengajar", value: "50+" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-[#0A2540]">{item.value}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Fasilitas</div>
            <h2 className="text-4xl font-extrabold text-[#0A2540]">Sarana &amp; Prasarana</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: "🏫", label: "Gedung Kelas Modern" },
              { icon: "📚", label: "Perpustakaan Digital" },
              { icon: "🕌", label: "Masjid Pesantren" },
              { icon: "🏠", label: "Asrama Putra & Putri" },
              { icon: "🔬", label: "Laboratorium Sains" },
              { icon: "💻", label: "Lab. Komputer" },
              { icon: "⚽", label: "Lapangan Olahraga" },
              { icon: "🍽️", label: "Dapur & Kantin Sehat" },
            ].map((f) => (
              <div key={f.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 card-hover">
                <div className="text-4xl mb-3">{f.icon}</div>
                <p className="font-bold text-slate-700 text-sm">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A2540]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Bergabunglah dengan Keluarga Darul Ihsan</h2>
          <p className="text-slate-400 mb-8">Investasikan masa depan putra-putri Anda dengan pendidikan terbaik.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ppdb" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0A2540] px-8 py-4 rounded-2xl font-extrabold hover:bg-[#f0d060] transition-all shadow-lg">
              Daftar PPDB <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/kontak" className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
