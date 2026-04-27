"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Plus, Trash2, Save, GraduationCap, Clock } from "lucide-react";

export default function AdminEkskulPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);

  const loadData = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("ekskul").select("*").order("nama");
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
      res = await supabase.from("ekskul").update(payload).eq("id", id);
    } else {
      res = await supabase.from("ekskul").insert([payload]);
    }

    if (res.error) toast.error("Gagal menyimpan: " + res.error.message);
    else {
      toast.success("Berhasil disimpan!");
      setEditing(null);
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus ekskul ini?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("ekskul").delete().eq("id", id);
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
          <h1 className="text-2xl font-extrabold text-slate-900">Manajemen Ekskul</h1>
          <p className="text-slate-500 mt-1">Kelola kegiatan ekstrakurikuler santri</p>
        </div>
        <button onClick={() => setEditing({ nama: "", deskripsi: "", icon: "Star", hari: "Sabtu" })}
          className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1e3a5f]">
          <Plus className="w-4 h-4" />
          Tambah Ekskul
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.nama}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 font-semibold text-emerald-600"><Clock className="w-3 h-3" /> {item.hari}</span>
                    <span className="line-clamp-1">{item.deskripsi}</span>
                  </div>
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
            <h2 className="font-extrabold text-slate-900 mb-6">
              {editing.id ? "Edit Ekskul" : "Tambah Ekskul"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Ekskul</label>
                <input required value={editing.nama} onChange={(e) => setEditing({...editing, nama: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hari Latihan</label>
                <select value={editing.hari} onChange={(e) => setEditing({...editing, hari: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Senin</option><option>Selasa</option><option>Rabu</option><option>Kamis</option><option>Jumat</option><option>Sabtu</option><option>Minggu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi Singkat</label>
                <textarea required value={editing.deskripsi} onChange={(e) => setEditing({...editing, deskripsi: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 resize-none" />
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
