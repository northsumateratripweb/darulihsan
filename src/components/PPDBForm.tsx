"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Calendar, Clock, Phone, ArrowRight, FileText, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

export default function PPDBForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [noPendaftaran, setNoPendaftaran] = useState("");
  const [form, setForm] = useState({
    nama_lengkap: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "L",
    asal_sekolah: "",
    nama_ayah: "",
    nama_ibu: "",
    telp_wali: "",
    email: "",
    alamat: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    program_pilihan: "MA Reguler",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama_lengkap || !form.telp_wali) {
      toast.error("Nama dan nomor telepon wajib diisi!");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("pendaftar")
        .insert([form])
        .select("nomor_pendaftaran")
        .single();
      if (error) throw error;
      setNoPendaftaran(data?.nomor_pendaftaran || "");
      setSubmitted(true);
      toast.success("Pendaftaran berhasil!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-12 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0A2540] mb-3">Pendaftaran Berhasil!</h2>
          <p className="text-slate-600 mb-6">Terima kasih telah mendaftar di MAS Pesantren Modern Darul Ihsan.</p>
          {noPendaftaran && (
            <div className="bg-[#0A2540] text-white rounded-2xl p-4 mb-6">
              <p className="text-sm text-slate-400 mb-1">Nomor Pendaftaran Anda</p>
              <p className="text-2xl font-extrabold text-[#D4AF37]">{noPendaftaran}</p>
              <p className="text-xs text-slate-400 mt-2">Simpan nomor ini untuk keperluan selanjutnya</p>
            </div>
          )}
          <p className="text-slate-500 text-sm mb-6">
            Tim kami akan menghubungi Anda melalui nomor WhatsApp yang didaftarkan untuk informasi lebih lanjut.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-6 py-3 rounded-xl font-bold">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Data Pribadi */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#0A2540] mb-6 flex items-center gap-2">
          <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-extrabold">1</span>
          Data Pribadi Calon Santri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
            <input name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-slate-900" placeholder="Nama sesuai akta kelahiran" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIK</label>
            <input name="nik" value={form.nik} onChange={handleChange} maxLength={16}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="16 digit NIK" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jenis Kelamin</label>
            <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white">
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tempat Lahir</label>
            <input name="tempat_lahir" value={form.tempat_lahir} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="Kota kelahiran" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tanggal Lahir</label>
            <input type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Asal Sekolah</label>
            <input name="asal_sekolah" value={form.asal_sekolah} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="Nama SMP/MTs asal" />
          </div>
        </div>
      </div>

      {/* Data Orang Tua */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#0A2540] mb-6 flex items-center gap-2">
          <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-extrabold">2</span>
          Data Orang Tua / Wali
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Ayah</label>
            <input name="nama_ayah" value={form.nama_ayah} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="Nama ayah kandung" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Ibu</label>
            <input name="nama_ibu" value={form.nama_ibu} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="Nama ibu kandung" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">No. Telepon Wali <span className="text-red-500">*</span></label>
            <input name="telp_wali" value={form.telp_wali} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="08xxxxxxxxxx (WhatsApp aktif)" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" placeholder="email@contoh.com" />
          </div>
        </div>
      </div>

      {/* Alamat & Program */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#0A2540] mb-6 flex items-center gap-2">
          <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-extrabold">3</span>
          Alamat &amp; Program
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Lengkap</label>
            <textarea name="alamat" value={form.alamat} onChange={handleChange} rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 resize-none" placeholder="Jalan, nomor rumah, RT/RW" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kecamatan</label>
            <input name="kecamatan" value={form.kecamatan} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kabupaten/Kota</label>
            <input name="kabupaten" value={form.kabupaten} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Provinsi</label>
            <input name="provinsi" value={form.provinsi} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Program Pilihan</label>
            <select name="program_pilihan" value={form.program_pilihan} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white">
              <option value="MA Reguler">MA Reguler</option>
              <option value="MA Tahfidz">MA + Program Tahfidz</option>
              <option value="MA Bahasa">MA + Program Bahasa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-start gap-3 text-sm text-slate-500">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p>Dengan mendaftar, Anda menyetujui bahwa data yang diisi adalah benar dan dapat dipertanggungjawabkan.</p>
        </div>
        <button type="submit" disabled={loading}
          className="shrink-0 inline-flex items-center gap-2 bg-[#D4AF37] text-[#0A2540] px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-[#f0d060] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
}
