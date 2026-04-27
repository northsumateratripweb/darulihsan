"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Plus, Trash2, Image as ImageIcon, Search, X } from "lucide-react";

export default function AdminGaleriPage() {
  const [galeri, setGaleri] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ judul: "", url: "", kategori: "UMUM" });

  const load = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
    if (data) setGaleri(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) return toast.error("URL gambar wajib diisi");
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("galeri").insert([form]);
    if (error) toast.error("Gagal menambah foto");
    else {
      toast.success("Foto ditambahkan");
      setShowModal(false);
      setForm({ judul: "", url: "", kategori: "UMUM" });
      load();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus foto ini?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("galeri").delete().eq("id", id);
    if (error) toast.error("Gagal menghapus");
    else {
      toast.success("Foto dihapus");
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola Galeri</h1>
          <p className="text-slate-500 mt-1">{galeri.length} foto di galeri</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1e3a5f] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Tambah Foto
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">Memuat galeri...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {galeri.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 aspect-square">
              <img src={item.url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <button onClick={() => handleDelete(item.id)} className="self-end w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div>
                  <p className="text-white text-xs font-bold truncate">{item.judul || "Tanpa Judul"}</p>
                  <p className="text-[#D4AF37] text-[10px] font-bold uppercase">{item.kategori}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-extrabold text-[#0A2540] mb-6">Tambah Foto Galeri</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">URL Gambar *</label>
                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="https://..." required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul (Opsional)</label>
                <input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Deskripsi singkat foto" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kategori</label>
                <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                  <option value="UMUM">Umum</option>
                  <option value="AKADEMIK">Akademik</option>
                  <option value="EVENT">Event</option>
                  <option value="FASILITAS">Fasilitas</option>
                  <option value="PRESTASI">Prestasi</option>
                </select>
              </div>
              <button type="submit" disabled={saving}
                className="w-full bg-[#0A2540] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#1e3a5f] transition-all disabled:opacity-60 mt-4">
                {saving ? "Menyimpan..." : "Tambah ke Galeri"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
