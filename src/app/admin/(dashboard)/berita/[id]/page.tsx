"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, EyeOff, Image, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function EditBeritaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    judul: "",
    slug: "",
    ringkasan: "",
    konten: "",
    gambar: "",
    kategori: "UMUM",
    penulis: "Admin",
    published: false,
    featured: false,
    published_at: null as string | null,
  });

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("berita").select("*").eq("id", params.id).single();
      if (error) {
        toast.error("Gagal memuat berita");
        router.push("/admin/berita");
      } else {
        setForm(data);
      }
      setLoading(false);
    };
    load();
  }, [params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `berita/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Gagal upload: " + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(filePath);
      setForm((prev) => ({ ...prev, gambar: publicUrl }));
      toast.success("Foto berhasil diunggah!");
    }
    setUploading(false);
  };

  const handleSave = async (publish?: boolean) => {
    if (!form.judul || !form.slug) {
      toast.error("Judul dan slug wajib diisi!");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const payload = {
      ...form,
      published: publish !== undefined ? publish : form.published,
      published_at: (publish !== undefined ? publish : form.published) ? (form.published_at || new Date().toISOString()) : null,
    };
    
    // Remove ID and other internal fields for update
    const { id, created_at, updated_at, ...updateData } = payload as any;

    const { error } = await supabase.from("berita").update(updateData).eq("id", params.id);
    if (error) {
      toast.error("Gagal memperbarui: " + error.message);
    } else {
      toast.success("Berita berhasil diperbarui!");
      router.push("/admin/berita");
      router.refresh();
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("berita").delete().eq("id", params.id);
    if (error) {
      toast.error("Gagal menghapus berita");
    } else {
      toast.success("Berita dihapus");
      router.push("/admin/berita");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-16 text-slate-400">Memuat berita...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/berita" className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Edit Berita</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleDelete} disabled={saving}
            className="inline-flex items-center gap-2 border border-red-100 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 disabled:opacity-60">
            <Trash2 className="w-4 h-4" />
            Hapus
          </button>
          <button onClick={() => handleSave()} disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#1e3a5f] disabled:opacity-60">
            <Save className="w-4 h-4" />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main */}
        <div className="xl:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Berita *</label>
              <input name="judul" value={form.judul} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 text-lg"
                placeholder="Judul berita menarik..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Slug (URL)</label>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">/berita/</span>
                <input name="slug" value={form.slug} onChange={handleChange}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm text-slate-700" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ringkasan</label>
              <textarea name="ringkasan" value={form.ringkasan} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 resize-none text-sm"
                placeholder="Deskripsi singkat berita untuk ditampilkan di listing..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Konten Berita</label>
              <textarea name="konten" value={form.konten} onChange={handleChange} rows={18}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 resize-none text-sm font-mono"
                placeholder="<p>Tulis konten berita di sini. Mendukung HTML.</p>" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Thumbnail */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-extrabold text-slate-900 mb-4 text-sm">Gambar Thumbnail</h3>
            {form.gambar ? (
              <div className="relative rounded-xl overflow-hidden mb-3 h-40 bg-slate-100">
                <img src={form.gambar} alt="preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center mb-3">
                <Image className="w-8 h-8 text-slate-300" />
              </div>
            )}
            <div className="flex gap-2">
              <input name="gambar" value={form.gambar} onChange={handleChange}
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-700"
                placeholder="URL gambar (https://...)" />
              <label className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-200 shrink-0">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                <Image className={`w-5 h-5 text-slate-500 ${uploading ? 'animate-pulse' : ''}`} />
              </label>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm">Meta Berita</h3>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kategori</label>
              <select name="kategori" value={form.kategori} onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-700 bg-white">
                <option value="UMUM">Umum</option>
                <option value="AKADEMIK">Akademik</option>
                <option value="PRESTASI">Prestasi</option>
                <option value="EVENT">Event</option>
                <option value="PENGUMUMAN">Pengumuman</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Penulis</label>
              <input name="penulis" value={form.penulis} onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-700" />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="w-4 h-4 rounded accent-blue-600" />
                <span className="text-sm font-medium text-slate-700">Terbitkan (Publish)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 rounded accent-blue-600" />
                <span className="text-sm font-medium text-slate-700">Tampilkan sebagai Featured</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
