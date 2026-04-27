"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Plus, Trash2, Save, BookOpen, ChevronRight } from "lucide-react";

export default function AdminProgramPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);

  const loadData = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("program").select("*").order("created_at", { ascending: false });
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
      res = await supabase.from("program").update(payload).eq("id", id);
    } else {
      res = await supabase.from("program").insert([payload]);
    }

    if (res.error) toast.error("Gagal menyimpan: " + res.error.message);
    else {
      toast.success("Berhasil disimpan!");
      setEditing(null);
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus program ini?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("program").delete().eq("id", id);
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
          <h1 className="text-2xl font-extrabold text-slate-900">Manajemen Program</h1>
          <p className="text-slate-500 mt-1">Kelola program akademik dan pesantren</p>
        </div>
        <button onClick={() => setEditing({ judul: "", deskripsi: "", icon: "BookOpen", fitur: [], published: true })}
          className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1e3a5f]">
          <Plus className="w-4 h-4" />
          Tambah Program
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* List */}
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between group">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.judul}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1">{item.deskripsi}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditing(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        {editing && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl h-fit sticky top-24">
            <h2 className="font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              {editing.id ? "Edit Program" : "Tambah Program Baru"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Program</label>
                <input required value={editing.judul} onChange={(e) => setEditing({...editing, judul: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi</label>
                <textarea required value={editing.deskripsi} onChange={(e) => setEditing({...editing, deskripsi: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Fitur (Pisahkan dengan koma)</label>
                <input value={editing.fitur?.join(", ")} 
                  onChange={(e) => setEditing({...editing, fitur: e.target.value.split(",").map(s => s.trim()).filter(s => s)})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" 
                  placeholder="Misal: Tahfidz 30 Juz, Karantina, dll" />
              </div>
              <div className="flex items-center gap-3 py-2">
                <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({...editing, published: e.target.checked})} className="w-4 h-4 rounded accent-blue-600" />
                <span className="text-sm font-medium text-slate-700">Tampilkan di Website</span>
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
