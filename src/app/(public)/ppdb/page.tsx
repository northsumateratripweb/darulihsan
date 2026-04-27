import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Calendar, Download, ArrowRight, Info, Phone } from "lucide-react";
import { getSiteSettings, getPpdbInfo } from "@/lib/data";
import PPDBForm from "@/components/PPDBForm";

export const metadata: Metadata = {
  title: "PPDB 2025/2026 - Pendaftaran Peserta Didik Baru",
  description: "Daftar sekarang untuk Tahun Ajaran 2025/2026 di MAS Pesantren Modern Darul Ihsan. Formulir pendaftaran online tersedia.",
};

export const revalidate = 60;

export default async function PPDBPage() {
  const [settings, ppdbInfo] = await Promise.all([getSiteSettings(), getPpdbInfo()]);

  const persyaratan = (ppdbInfo.persyaratan as string[]) || [];
  const alurPendaftaran = (ppdbInfo.alur_pendaftaran as string[]) || [];
  const jadwal = (ppdbInfo.jadwal as Array<{ kegiatan: string; tanggal: string }>) || [];
  const biaya = (ppdbInfo.biaya as Array<{ item: string; nominal: string }>) || [];

  const isOpen = settings.ppdb_open !== "false";

  return (
    <>
      {/* Header */}
      <section className="relative py-20 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="h-0.5 w-12 bg-[#D4AF37] mb-4" />
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">PPDB {settings.ppdb_tahun || "2025/2026"}</h1>
              <p className="text-slate-400 text-lg max-w-2xl">Pendaftaran Peserta Didik Baru MAS Pesantren Modern Darul Ihsan</p>
              <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda</Link>
                <span>/</span>
                <span className="text-[#D4AF37]">PPDB</span>
              </div>
            </div>
            {isOpen ? (
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Pendaftaran Sedang Dibuka
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-full font-bold text-sm">
                <div className="w-2 h-2 bg-red-400 rounded-full" />
                Pendaftaran Ditutup
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-blue-50 rounded-2xl p-6">
              <div className="text-3xl font-extrabold text-[#0A2540]">{settings.ppdb_quota || "120"}</div>
              <div className="text-sm font-bold text-slate-600 mt-1">Kuota Santri</div>
            </div>
            <div className="text-center bg-amber-50 rounded-2xl p-6">
              <div className="text-2xl font-extrabold text-[#0A2540]">{settings.ppdb_tahun || "2025/2026"}</div>
              <div className="text-sm font-bold text-slate-600 mt-1">Tahun Ajaran</div>
            </div>
            <div className="text-center bg-emerald-50 rounded-2xl p-6">
              <div className="text-2xl font-extrabold text-[#0A2540]">A</div>
              <div className="text-sm font-bold text-slate-600 mt-1">Akreditasi</div>
            </div>
            <div className="text-center bg-purple-50 rounded-2xl p-6">
              <div className="text-2xl font-extrabold text-[#0A2540]">3</div>
              <div className="text-sm font-bold text-slate-600 mt-1">Program Pilihan</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-[#0A2540] mb-8">Formulir Pendaftaran Online</h2>
              {isOpen ? <PPDBForm /> : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
                  <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-extrabold text-[#0A2540] mb-3">Pendaftaran Belum Dibuka</h3>
                  <p className="text-slate-500">Pendaftaran untuk tahun ajaran berikutnya akan segera dibuka. Pantau terus website kami.</p>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-6 py-3 rounded-xl font-bold mt-6">
                    <Phone className="w-4 h-4" /> Hubungi Kami
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Jadwal */}
              {jadwal.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <h3 className="font-extrabold text-[#0A2540] mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Jadwal PPDB
                  </h3>
                  <div className="space-y-3">
                    {jadwal.map((j, i) => (
                      <div key={i} className="flex flex-col gap-0.5 border-l-2 border-[#D4AF37] pl-3 py-1">
                        <span className="text-xs font-bold text-[#D4AF37]">{j.tanggal}</span>
                        <span className="text-sm font-medium text-slate-700">{j.kegiatan}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Persyaratan */}
              {persyaratan.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <h3 className="font-extrabold text-[#0A2540] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Persyaratan
                  </h3>
                  <ul className="space-y-2">
                    {persyaratan.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Biaya */}
              {biaya.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <h3 className="font-extrabold text-[#0A2540] mb-4">Estimasi Biaya</h3>
                  <div className="space-y-3">
                    {biaya.map((b, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">{b.item}</span>
                        <span className="font-bold text-[#0A2540]">{b.nominal}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-4">* Biaya dapat berubah, hubungi kami untuk info terbaru</p>
                </div>
              )}

              {/* WhatsApp */}
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-emerald-600 text-white rounded-2xl p-5 hover:bg-emerald-700 transition-colors">
                <Phone className="w-6 h-6 shrink-0" />
                <div>
                  <div className="font-bold">Butuh Bantuan?</div>
                  <div className="text-emerald-200 text-sm">Chat via WhatsApp</div>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Alur Pendaftaran */}
      {alurPendaftaran.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Step by Step</div>
              <h2 className="text-3xl font-extrabold text-[#0A2540]">Alur Pendaftaran</h2>
            </div>
            <div className="relative">
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-slate-100 hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {alurPendaftaran.map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3 relative z-10">
                    <div className="w-16 h-16 bg-[#0A2540] text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg">
                      {i + 1}
                    </div>
                    <p className="text-sm font-semibold text-slate-700 leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
