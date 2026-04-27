import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBeritaPage() {
  const supabase = await createClient();
  const { data: berita } = await supabase
    .from("berita")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola Berita</h1>
          <p className="text-slate-500 mt-1">{berita?.length || 0} artikel total</p>
        </div>
        <Link href="/admin/berita/baru"
          className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1e3a5f] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Tambah Berita
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" placeholder="Cari berita..." />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-6 py-3.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {berita && berita.length > 0 ? berita.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800 text-sm line-clamp-1 max-w-64">{b.judul}</p>
                    <p className="text-xs text-slate-400 mt-0.5">/berita/{b.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">{b.kategori}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold w-fit px-2.5 py-1 rounded-full ${b.published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {b.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {b.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(b.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/berita/${b.id}`}
                        className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <Link href={`/berita/${b.slug}`} target="_blank"
                        className="w-8 h-8 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                    Belum ada berita. <Link href="/admin/berita/baru" className="text-blue-600 font-bold">Tambah sekarang</Link>
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
