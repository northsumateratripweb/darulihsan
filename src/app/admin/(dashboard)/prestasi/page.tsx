"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Plus, Trash2, Save, Trophy, Image as ImageIcon } from "lucide-react";

export default function AdminPrestasiPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const loadData = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("prestasi").select("*").order("tahun", { ascending: false });
    if (data) setData(data);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `prestasi/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Gagal upload: " + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(filePath);
      setEditing({ ...editing, gambar: publicUrl });
      toast.success("Foto berhasil diunggah!");
    }
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { id, created_at, ...payload } = editing;
    
    let res;
    if (id) {
      res = await supabase.from("prestasi").update(payload).eq("id", id);
    } else {
      res = await supabase.from("prestasi").insert([payload]);
    }

    if (res.error) toast.error("Gagal menyimpan: " + res.error.message);
    else {
      toast.success("Berhasil disimpan!");
      setEditing(null);
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus prestasi ini?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("prestasi").delete().eq("id", id);
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
          <h1 className="text-2xl font-extrabold text-slate-900">Manajemen Prestasi</h1>
          <p className="text-slate-500 mt-1">Kelola daftar pencapaian santri & sekolah</p>
        </div>
        <button onClick={() => setEditing({ judul: "", kategori: "UMUM", tahun: new Date().getFullYear().toString(), deskripsi: "", gambar: "" })}
          className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1e3a5f]">
          <Plus className="w-4 h-4" />
          Tambah Prestasi
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group">
              <div className="aspect-video bg-slate-100 rounded-xl mb-3 overflow-hidden">
                <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{item.judul}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] font-extrabold px-2 py-1 bg-blue-50 text-blue-600 rounded-full uppercase">{item.kategori}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditing(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl h-fit sticky top-24">
            <h2 className="font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              {editing.id ? "Edit Prestasi" : "Tambah Prestasi"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Prestasi</label>
                <input required value={editing.judul} onChange={(e) => setEditing({...editing, judul: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kategori</label>
                  <input required value={editing.kategori} onChange={(e) => setEditing({...editing, kategori: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tahun</label>
                  <input required value={editing.tahun} onChange={(e) => setEditing({...editing, tahun: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi</label>
                <textarea required value={editing.deskripsi} onChange={(e) => setEditing({...editing, deskripsi: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Foto Prestasi</label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input value={editing.gambar} onChange={(e) => setEditing({...editing, gambar: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm" 
                      placeholder="URL Gambar atau Upload ->" />
                  </div>
                  <label className="w-12 h-[42px] bg-slate-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                    <ImageIcon className={`w-5 h-5 text-slate-500 ${uploading ? 'animate-pulse' : ''}`} />
                  </label>
                </div>
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
