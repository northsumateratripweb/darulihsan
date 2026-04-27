import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { UserCheck, Clock, CheckCircle, XCircle, AlertCircle, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPPDBPage() {
  const supabase = await createClient();
  const { data: pendaftar } = await supabase
    .from("pendaftar")
    .select("*")
    .order("created_at", { ascending: false });

  const stats = {
    total: pendaftar?.length || 0,
    pending: pendaftar?.filter((p) => p.status === "pending").length || 0,
    diterima: pendaftar?.filter((p) => p.status === "diterima").length || 0,
    ditolak: pendaftar?.filter((p) => p.status === "ditolak").length || 0,
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    diterima: "bg-emerald-100 text-emerald-700 border-emerald-200",
    ditolak: "bg-red-100 text-red-700 border-red-200",
    cadangan: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-3 h-3" />,
    diterima: <CheckCircle className="w-3 h-3" />,
    ditolak: <XCircle className="w-3 h-3" />,
    cadangan: <AlertCircle className="w-3 h-3" />,
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Data Pendaftar PPDB</h1>
          <p className="text-slate-500 mt-1">Kelola semua pendaftar tahun ajaran 2025/2026</p>
        </div>
        <button className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Pendaftar", value: stats.total, color: "blue", icon: UserCheck },
          { label: "Menunggu", value: stats.pending, color: "amber", icon: Clock },
          { label: "Diterima", value: stats.diterima, color: "emerald", icon: CheckCircle },
          { label: "Ditolak", value: stats.ditolak, color: "red", icon: XCircle },
        ].map((s) => {
          const colorMap: Record<string, string> = {
            blue: "bg-blue-50 text-blue-600",
            amber: "bg-amber-50 text-amber-600",
            emerald: "bg-emerald-50 text-emerald-600",
            red: "bg-red-50 text-red-600",
          };
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colorMap[s.color]}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-5 py-3.5 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">No. Daftar</th>
                <th className="px-5 py-3.5 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
                <th className="px-5 py-3.5 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Program</th>
                <th className="px-5 py-3.5 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Telp. Wali</th>
                <th className="px-5 py-3.5 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-5 py-3.5 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pendaftar && pendaftar.length > 0 ? pendaftar.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold text-[#0A2540] bg-blue-50 px-2 py-1 rounded-lg">{p.nomor_pendaftaran || "-"}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{p.nama_lengkap}</p>
                      <p className="text-xs text-slate-400">{p.asal_sekolah || "-"}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.program_pilihan}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.telp_wali}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${statusColors[p.status] || statusColors.pending}`}>
                      {statusIcons[p.status]}
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {new Date(p.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/ppdb/${p.id}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                      Detail →
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 text-sm">
                    Belum ada pendaftar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
