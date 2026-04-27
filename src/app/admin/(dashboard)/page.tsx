import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Newspaper,
  Users,
  MessageSquare,
  UserCheck,
  TrendingUp,
  Eye,
  Bell,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: beritaCount },
    { count: pendaftarCount },
    { count: pesanCount },
    { count: unreadPesanCount },
    { data: recentPendaftar },
    { data: recentBerita },
  ] = await Promise.all([
    supabase.from("berita").select("*", { count: "exact", head: true }),
    supabase.from("pendaftar").select("*", { count: "exact", head: true }),
    supabase.from("kontak_pesan").select("*", { count: "exact", head: true }),
    supabase.from("kontak_pesan").select("*", { count: "exact", head: true }).eq("dibaca", false),
    supabase.from("pendaftar").select("nama_lengkap, status, program_pilihan, created_at, nomor_pendaftaran").order("created_at", { ascending: false }).limit(5),
    supabase.from("berita").select("judul, slug, published, created_at").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Total Berita", value: beritaCount ?? 0, icon: Newspaper, color: "blue", href: "/admin/berita" },
    { label: "Pendaftar PPDB", value: pendaftarCount ?? 0, icon: UserCheck, color: "emerald", href: "/admin/ppdb" },
    { label: "Pesan Masuk", value: pesanCount ?? 0, icon: MessageSquare, color: "amber", href: "/admin/pesan" },
    { label: "Pesan Belum Dibaca", value: unreadPesanCount ?? 0, icon: Bell, color: "red", href: "/admin/pesan" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    diterima: "bg-emerald-100 text-emerald-700",
    ditolak: "bg-red-100 text-red-700",
    cadangan: "bg-blue-100 text-blue-700",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Selamat datang di panel admin MAS Pesantren Modern Darul Ihsan</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const colorMap: Record<string, string> = {
            blue: "bg-blue-50 text-blue-600",
            emerald: "bg-emerald-50 text-emerald-600",
            amber: "bg-amber-50 text-amber-600",
            red: "bg-red-50 text-red-600",
          };
          return (
            <Link key={stat.label} href={stat.href} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[stat.color]}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Tambah Berita", href: "/admin/berita/baru", icon: Newspaper },
          { label: "Lihat Pendaftar", href: "/admin/ppdb", icon: UserCheck },
          { label: "Kelola Galeri", href: "/admin/galeri", icon: Eye },
          { label: "Pengaturan", href: "/admin/settings", icon: TrendingUp },
        ].map((action) => (
          <Link key={action.href} href={action.href}
            className="flex flex-col items-center gap-2 bg-[#0A2540] text-white rounded-2xl p-4 hover:bg-[#1e3a5f] transition-colors text-center">
            <action.icon className="w-6 h-6 text-[#D4AF37]" />
            <span className="text-xs font-bold">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Pendaftar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="font-extrabold text-slate-900">Pendaftar Terbaru</h2>
            <Link href="/admin/ppdb" className="text-xs font-bold text-blue-600 hover:text-blue-800">
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentPendaftar && recentPendaftar.length > 0 ? recentPendaftar.map((p, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-extrabold">
                    {p.nama_lengkap[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{p.nama_lengkap}</p>
                    <p className="text-xs text-slate-400">{p.program_pilihan}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[p.status] || statusColors.pending}`}>
                  {p.status}
                </span>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">Belum ada pendaftar</div>
            )}
          </div>
        </div>

        {/* Recent Berita */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="font-extrabold text-slate-900">Berita Terbaru</h2>
            <Link href="/admin/berita" className="text-xs font-bold text-blue-600 hover:text-blue-800">
              Kelola →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentBerita && recentBerita.length > 0 ? recentBerita.map((b, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Newspaper className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 line-clamp-1 max-w-48">{b.judul}</p>
                    <p className="text-xs text-slate-400">{new Date(b.created_at).toLocaleDateString("id-ID")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {b.published ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-500" />
                  )}
                  <span className={`text-xs font-bold ${b.published ? "text-emerald-600" : "text-amber-600"}`}>
                    {b.published ? "Live" : "Draft"}
                  </span>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">Belum ada berita</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
