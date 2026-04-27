"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Save, Settings, Eye, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const defaultSettings: Record<string, string> = {
  site_name: "MAS Pesantren Modern Darul Ihsan",
  site_tagline: "Mencetak Generasi Qur'ani & Modern",
  hero_title: "Wujudkan Masa Depan Gemilang",
  hero_subtitle: "Mencetak Generasi Qur'ani & Modern dengan kurikulum terpadu yang menyeimbangkan ilmu agama dan pengetahuan umum.",
  hero_image: "",
  hero_cta_text: "Daftar PPDB 2025",
  akreditasi: "A",
  alamat: "Jl. H Mustafa Kamil, Desa Selemak, Kec. Hamparan Perak, Kab. Deli Serdang",
  telp: "0812-3456-7890",
  email: "info@darulihsan.sch.id",
  instagram: "https://instagram.com/darulihsan",
  youtube: "https://youtube.com/@darulihsan",
  whatsapp: "6281234567890",
  visi: "Mewujudkan insan yang bertaqwa, berilmu, berakhlak mulia, mandiri, dan berwawasan global.",
  principal_name: "Dr. H. Ahmad Rifa'i, M.Pd.",
  principal_quote: "Kami berkomitmen untuk tidak hanya mentransfer ilmu pengetahuan, tetapi juga membentuk karakter Islami yang kuat.",
  ppdb_open: "true",
  ppdb_tahun: "2025/2026",
  ppdb_quota: "120",
};

const settingGroups = [
  {
    label: "Informasi Dasar",
    keys: ["site_name", "site_tagline", "akreditasi", "alamat", "telp", "email"],
    labels: ["Nama Sekolah", "Tagline", "Akreditasi", "Alamat", "Telepon", "Email"],
    types: ["text", "text", "text", "textarea", "text", "text"],
  },
  {
    label: "Hero Section",
    keys: ["hero_title", "hero_subtitle", "hero_image", "hero_cta_text"],
    labels: ["Judul Hero", "Subtitle Hero", "Foto Hero Utama", "Teks Tombol CTA"],
    types: ["text", "textarea", "image", "text"],
  },
  {
    label: "Profil & Pimpinan",
    keys: ["visi", "principal_name", "principal_photo", "principal_quote"],
    labels: ["Visi Pesantren", "Nama Pimpinan", "Foto Pimpinan", "Kutipan Pimpinan"],
    types: ["textarea", "text", "image", "textarea"],
  },
  {
    label: "Media Sosial",
    keys: ["instagram", "youtube", "whatsapp"],
    labels: ["URL Instagram", "URL YouTube", "Nomor WhatsApp (62xxx)"],
    types: ["text", "text", "text"],
  },
  {
    label: "PPDB",
    keys: ["ppdb_open", "ppdb_tahun", "ppdb_quota"],
    labels: ["Buka Pendaftaran (true/false)", "Tahun Ajaran", "Kuota Santri"],
    types: ["text", "text", "text"],
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("site_settings").select("key, value");
      if (data) {
        const map: Record<string, string> = { ...defaultSettings };
        data.forEach((row) => { if (row.value) map[row.key] = row.value; });
        setSettings(map);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingKey(key);
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `settings/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Gagal upload: " + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(filePath);
      setSettings((prev) => ({ ...prev, [key]: publicUrl }));
      toast.success("Foto berhasil diunggah!");
    }
    setUploadingKey(null);
  };

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("site_settings").upsert(upserts, { onConflict: "key" });
    if (error) toast.error("Gagal menyimpan: " + error.message);
    else toast.success("Pengaturan disimpan!");
    setSaving(false);
  };

  if (loading) return <div className="text-center py-16 text-slate-400">Memuat pengaturan...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Pengaturan Konten</h1>
          <p className="text-slate-500 mt-1">Kelola semua konten website dari sini</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50">
            <Eye className="w-4 h-4" />
            Lihat Website
          </Link>
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1e3a5f] disabled:opacity-60">
            <Save className="w-4 h-4" />
            {saving ? "Menyimpan..." : "Simpan Semua"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {settingGroups.map((group) => (
          <div key={group.label} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="font-extrabold text-slate-900 mb-5 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-600" />
              {group.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {group.keys.map((key, i) => (
                <div key={key} className={group.types[i] === "textarea" ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{group.labels[i]}</label>
                  {group.types[i] === "textarea" ? (
                    <textarea
                      value={settings[key] || ""}
                      onChange={(e) => setSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 resize-none text-sm"
                    />
                  ) : group.types[i] === "image" ? (
                    <div className="flex gap-2">
                      <input
                        value={settings[key] || ""}
                        onChange={(e) => setSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm"
                        placeholder="URL Gambar atau Upload ->"
                      />
                      <label className="w-12 h-[46px] bg-slate-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-200 shrink-0">
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, key)} disabled={uploadingKey === key} />
                        <ImageIcon className={`w-5 h-5 text-slate-500 ${uploadingKey === key ? 'animate-pulse' : ''}`} />
                      </label>
                    </div>
                  ) : (
                    <input
                      value={settings[key] || ""}
                      onChange={(e) => setSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
