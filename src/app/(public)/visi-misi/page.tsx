import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Target, Eye, Heart, ArrowRight } from "lucide-react";
import { getSiteSettings, getStruktur } from "@/lib/data";

export const metadata: Metadata = {
  title: "Visi & Misi",
  description: "Visi dan Misi MAS Pesantren Modern Darul Ihsan dalam membentuk generasi Qur'ani dan Modern.",
};

export const revalidate = 60;

export default async function VisiMisiPage() {
  const [settings, struktur] = await Promise.all([getSiteSettings(), getStruktur()]);

  const misi = (settings.misi as string[]) || [
    "Menyelenggarakan pendidikan Islam terpadu yang berkualitas",
    "Membentuk karakter Islami yang kuat dan berakhlakul karimah",
    "Mengembangkan potensi akademik dan non-akademik santri",
    "Mempersiapkan generasi yang siap menghadapi era globalisasi",
    "Membangun lingkungan pesantren yang kondusif dan Islami",
  ];

  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-0.5 w-12 bg-[#D4AF37] mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Visi &amp; Misi</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Landasan filosofis dan arah pengembangan MAS Pesantren Modern Darul Ihsan</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Visi &amp; Misi</span>
          </div>
        </div>
      </section>

      {/* Visi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Eye className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">Our Vision</div>
                  <h2 className="text-3xl font-extrabold text-[#0A2540]">Visi Kami</h2>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#0A2540] to-[#1e3a5f] rounded-3xl p-8 text-white">
                <div className="text-6xl font-serif text-[#D4AF37] mb-4">&ldquo;</div>
                <p className="text-xl font-semibold leading-relaxed">
                  {settings.visi || "Mewujudkan insan yang bertaqwa, berilmu, berakhlak mulia, mandiri, dan berwawasan global."}
                </p>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-slate-400 text-sm">MAS Pesantren Modern Darul Ihsan</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1627556704302-624286467c65?w=800"
                alt="Visi Darul Ihsan"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misi */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
                <Target className="w-7 h-7 text-amber-600" />
              </div>
            </div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Our Mission</div>
            <h2 className="text-4xl font-extrabold text-[#0A2540]">Misi Kami</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Langkah-langkah strategis untuk mewujudkan visi pesantren</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {misi.map((item, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover">
                <div className="w-8 h-8 rounded-full bg-[#0A2540] text-white flex items-center justify-center text-sm font-extrabold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-slate-700 font-medium leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Core Values</div>
            <h2 className="text-4xl font-extrabold text-[#0A2540]">Nilai-Nilai Kami</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🕌", title: "Taqwa", desc: "Mengutamakan ketaatan kepada Allah SWT dalam setiap aspek kehidupan" },
              { icon: "📚", title: "Ilmu", desc: "Semangat belajar dan mengajar tanpa henti untuk kemajuan umat" },
              { icon: "🤝", title: "Akhlak", desc: "Berakhlakul karimah sebagai teladan bagi masyarakat" },
              { icon: "🌍", title: "Modern", desc: "Berwawasan global namun tetap berpegang pada nilai Islam" },
            ].map((val, i) => (
              <div key={i} className="text-center bg-slate-50 rounded-2xl p-8 card-hover border border-slate-100">
                <div className="text-5xl mb-4">{val.icon}</div>
                <h3 className="font-extrabold text-[#0A2540] text-lg mb-2">{val.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Preview */}
      {struktur.length > 0 && (
        <section className="py-20 bg-[#0A2540]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="h-0.5 w-12 bg-[#D4AF37] mx-auto mb-4" />
              <h2 className="text-3xl font-extrabold text-white">Pimpinan Pesantren</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {struktur.slice(0, 4).map((s) => (
                <div key={s.id} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-700 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-extrabold">
                    {s.nama.split(" ").slice(0, 2).map((n: string) => n[0]).join("")}
                  </div>
                  <div className="text-white font-bold text-sm">{s.nama}</div>
                  <div className="text-[#D4AF37] text-xs mt-1">{s.jabatan}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/struktur" className="inline-flex items-center gap-2 border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-xl font-bold hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all">
                Lihat Struktur Lengkap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
