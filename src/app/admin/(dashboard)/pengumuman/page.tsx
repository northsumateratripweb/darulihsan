"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Plus, Trash2, Save, Bell, CheckCircle2, AlertTriangle } from "lucide-react";

export default function AdminPengumumanPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);

  const loadData = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("pengumuman").select("*").order("created_at", { ascending: false });
    if (data) setData(data);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { id, created_at, ...payload } = editing;
    
    let res;
    if (id) {
      res = await supabase.from("pengumuman").update(payload).eq("id", id);
    } else {
      res = await supabase.from("pengumuman").insert([payload]);
    }

    if (res.error) toast.error("Gagal menyimpan: " + res.error.message);
    else {
      toast.success("Berhasil disimpan!");
      setEditing(null);
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("pengumuman").delete().eq("id", id);
    if (error) toast.error("Gagal menghapus");
    else {
      toast.success("Terhapus");
      loadData();
    }
  };

  if (loading) return <div className="text-center py-16 text-slate-400">Memuat data...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Pengumuman & Notifikasi</h1>
          <p className="text-slate-500 mt-1">Kelola banner pengumuman di bagian atas website</p>
        </div>
        <button onClick={() => setEditing({ judul: "", konten: "", tipe: "INFO", active: true })}
          className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1e3a5f]">
          <Plus className="w-4 h-4" />
          Buat Pengumuman
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.id} className={`p-5 rounded-2xl border flex items-start justify-between group shadow-sm ${item.active ? 'bg-white border-slate-100' : 'bg-slate-50 border-slate-200 grayscale opacity-60'}`}>
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.tipe === 'WARNING' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                  {item.tipe === 'WARNING' ? <AlertTriangle className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    {item.judul}
                    {item.active && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mt-1">{item.konten}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditing(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-sm">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl h-fit sticky top-24">
            <h2 className="font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              {editing.id ? "Edit Pengumuman" : "Buat Baru"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Singkat</label>
                <input required value={editing.judul} onChange={(e) => setEditing({...editing, judul: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipe</label>
                <select value={editing.tipe} onChange={(e) => setEditing({...editing, tipe: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="INFO">Informasi (Biru)</option>
                  <option value="WARNING">Penting/Peringatan (Oranye)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Isi Pengumuman</label>
                <textarea required value={editing.konten} onChange={(e) => setEditing({...editing, konten: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="flex items-center gap-3 py-2">
                <input type="checkbox" checked={editing.active} onChange={(e) => setEditing({...editing, active: e.target.checked})} className="w-4 h-4 rounded accent-blue-600" />
                <span className="text-sm font-medium text-slate-700">Aktifkan Pengumuman</span>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setEditing(null)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50">Batal</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-[#0A2540] text-white rounded-xl font-bold text-sm hover:bg-[#1e3a5f] flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
