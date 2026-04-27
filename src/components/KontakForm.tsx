"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

export default function KontakForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nama: "", email: "", telp: "", subjek: "", pesan: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.pesan) {
      toast.error("Nama, email, dan pesan wajib diisi!");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("kontak_pesan").insert([form]);
      if (error) throw error;
      setSent(true);
      toast.success("Pesan berhasil dikirim!");
      setForm({ nama: "", email: "", telp: "", subjek: "", pesan: "" });
    } catch {
      toast.error("Gagal mengirim pesan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-extrabold text-[#0A2540] mb-2">Pesan Terkirim!</h3>
        <p className="text-slate-600 mb-6">Kami akan merespons pesan Anda dalam 1x24 jam kerja.</p>
        <button onClick={() => setSent(false)} className="text-blue-600 font-bold text-sm">Kirim pesan lagi</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap *</label>
          <input name="nama" value={form.nama} onChange={handleChange} required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="Nama Anda" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="email@contoh.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">No. Telepon</label>
          <input name="telp" value={form.telp} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="08xxxxxxxxxx" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subjek</label>
          <select name="subjek" value={form.subjek} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white">
            <option value="">Pilih subjek...</option>
            <option value="Informasi PPDB">Informasi PPDB</option>
            <option value="Informasi Akademik">Informasi Akademik</option>
            <option value="Kerjasama">Kerjasama</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Pesan *</label>
        <textarea name="pesan" value={form.pesan} onChange={handleChange} required rows={5}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 resize-none" placeholder="Tulis pesan Anda di sini..." />
      </div>
      <button type="submit" disabled={loading}
        className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-[#1e3a5f] transition-all shadow-lg disabled:opacity-60 w-full sm:w-auto justify-center">
        {loading ? "Mengirim..." : <><Send className="w-5 h-5" /> Kirim Pesan</>}
      </button>
    </form>
  );
}
