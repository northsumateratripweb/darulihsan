import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Users, ArrowRight, Star } from "lucide-react";
import { getProgram, getEkskul, getPrestasi } from "@/lib/data";

export const metadata: Metadata = {
  title: "Program Akademik",
  description: "Program akademik unggulan MAS Pesantren Modern Darul Ihsan - MA Reguler, Tahfidz, Bahasa, dan Ekskul.",
};

export const revalidate = 60;

const iconMap: Record<string, string> = {
  GraduationCap: "🎓",
  BookOpen: "📖",
  Languages: "🌐",
  Star: "⭐",
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  green: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  yellow: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
};

export default async function ProgramPage() {
  const [program, ekskul, prestasi] = await Promise.all([
    getProgram(),
    getEkskul(),
    getPrestasi(),
  ]);

  return (
    <>
      {/* Header */}
      <section className="relative py-20 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-0.5 w-12 bg-[#D4AF37] mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Program Akademik</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Program unggulan yang dirancang untuk mencetak generasi terbaik</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Program</span>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Akademik</div>
            <h2 className="text-4xl font-extrabold text-[#0A2540]">Program Unggulan</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Kurikulum terpadu yang dirancang untuk mengembangkan potensi santri secara menyeluruh</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {program.map((prog) => {
              const colors = colorMap[prog.warna] || colorMap.blue;
              return (
                <div key={prog.id} className={`rounded-3xl border-2 ${colors.border} p-8 card-hover bg-white shadow-sm`}>
                  <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
                    {iconMap[prog.icon] || "📚"}
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-extrabold text-[#0A2540]">{prog.nama}</h3>
                    {prog.durasi && (
                      <span className={`flex items-center gap-1 text-xs font-bold ${colors.text} ${colors.bg} px-3 py-1 rounded-full`}>
                        <Clock className="w-3 h-3" />
                        {prog.durasi}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">{prog.deskripsi}</p>
                  {prog.fitur && prog.fitur.length > 0 && (
                    <ul className="space-y-2">
                      {prog.fitur.map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ekskul */}
      <section id="ekskul" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Pengembangan Diri</div>
            <h2 className="text-4xl font-extrabold text-[#0A2540]">Ekstrakurikuler</h2>
            <p className="text-slate-600 mt-4">15+ pilihan kegiatan untuk mengembangkan bakat dan minat santri</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ekskul.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    📌
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540] mb-1">{item.nama}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-2">{item.deskripsi}</p>
                    {item.jadwal && (
                      <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {item.jadwal}
                      </div>
                    )}
                    {item.pembina && (
                      <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mt-1">
                        <Users className="w-3 h-3" />
                        {item.pembina}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestasi */}
      <section id="prestasi" className="py-20 bg-[#0A2540]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-0.5 w-12 bg-[#D4AF37] mx-auto mb-4" />
            <h2 className="text-4xl font-extrabold text-white">Prestasi Gemilang</h2>
            <p className="text-slate-400 mt-4">Capaian terbaik santri Darul Ihsan di berbagai tingkat</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prestasi.map((item) => {
              const levelColor =
                item.tingkat === "Nasional" ? "text-amber-400 bg-amber-400/10 border-amber-400/20" :
                item.tingkat === "Provinsi" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" :
                "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
              return (
                <div key={item.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${levelColor}`}>
                      {item.tingkat}
                    </span>
                  </div>
                  <h4 className="font-bold text-white mb-2">{item.nama_prestasi}</h4>
                  {item.peraih && <p className="text-[#D4AF37] text-sm font-medium mb-2">{item.peraih}</p>}
                  {item.deskripsi && <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.deskripsi}</p>}
                  <p className="text-slate-500 text-xs">{item.tahun}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#0A2540] mb-4">Tertarik Bergabung?</h2>
          <p className="text-slate-600 mb-8">Daftarkan putra-putri Anda sekarang dan jadilah bagian dari keluarga besar Darul Ihsan.</p>
          <Link href="/ppdb" className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-[#1e3a5f] transition-all shadow-lg">
            Daftar PPDB 2025 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
