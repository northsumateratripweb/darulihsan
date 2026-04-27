"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Plus, Trash2, User, Search, X, Edit } from "lucide-react";

export default function AdminStrukturPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ nama: "", jabatan: "", kategori: "GURU", foto: "", nip: "", urutan: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("struktur_organisasi").select("*").order("urutan", { ascending: true });
    if (data) setMembers(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.jabatan) return toast.error("Nama dan jabatan wajib diisi");
    setSaving(true);
    const supabase = createClient();
    
    if (editingId) {
      const { error } = await supabase.from("struktur_organisasi").update(form).eq("id", editingId);
      if (error) toast.error("Gagal memperbarui");
      else {
        toast.success("Data diperbarui");
        closeModal();
        load();
      }
    } else {
      const { error } = await supabase.from("struktur_organisasi").insert([form]);
      if (error) toast.error("Gagal menambah anggota");
      else {
        toast.success("Anggota ditambahkan");
        closeModal();
        load();
      }
    }
    setSaving(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({ nama: "", jabatan: "", kategori: "GURU", foto: "", nip: "", urutan: 0 });
  };

  const handleEdit = (member: any) => {
    setForm({ ...member });
    setEditingId(member.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus anggota ini?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("struktur_organisasi").delete().eq("id", id);
    if (error) toast.error("Gagal menghapus");
    else {
      toast.success("Data dihapus");
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Struktur Organisasi</h1>
          <p className="text-slate-500 mt-1">Kelola pimpinan, guru, dan staff</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1e3a5f] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Tambah Anggota
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Anggota</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Jabatan</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                      {m.foto ? <img src={m.foto} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 text-slate-300" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{m.nama}</p>
                      <p className="text-xs text-slate-400 font-mono">{m.nip || "-"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#D4AF37]">{m.jabatan}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full">{m.kategori}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(m)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
            <button onClick={closeModal} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-extrabold text-[#0A2540] mb-6">{editingId ? "Edit" : "Tambah"} Anggota</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap *</label>
                  <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jabatan *</label>
                  <input value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIP (Opsional)</label>
                  <input value={form.nip} onChange={(e) => setForm({ ...form, nip: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kategori</label>
                  <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                    <option value="PIMPINAN">Pimpinan</option>
                    <option value="GURU">Guru</option>
                    <option value="STAFF">Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Urutan Tampil</label>
                  <input type="number" value={form.urutan} onChange={(e) => setForm({ ...form, urutan: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Foto URL</label>
                  <input value={form.foto} onChange={(e) => setForm({ ...form, foto: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="https://..." />
                </div>
              </div>
              <button type="submit" disabled={saving}
                className="w-full bg-[#0A2540] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#1e3a5f] transition-all disabled:opacity-60 mt-4">
                {saving ? "Menyimpan..." : "Simpan Data"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
