"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, User, MapPin, GraduationCap, Phone, Mail, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function PendaftarDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pendaftar, setPendaftar] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("pendaftar").select("*").eq("id", params.id).single();
      if (error) {
        toast.error("Gagal memuat data pendaftar");
        router.push("/admin/ppdb");
      } else {
        setPendaftar(data);
      }
      setLoading(false);
    };
    load();
  }, [params.id, router]);

  const handleUpdateStatus = async (status: string) => {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("pendaftar").update({ status }).eq("id", params.id);
    if (error) {
      toast.error("Gagal memperbarui status");
    } else {
      toast.success("Status berhasil diperbarui");
      setPendaftar((prev: any) => ({ ...prev, status }));
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-16 text-slate-400">Memuat data...</div>;

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    diterima: "bg-emerald-100 text-emerald-700 border-emerald-200",
    ditolak: "bg-red-100 text-red-700 border-red-200",
    cadangan: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/ppdb" className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Detail Pendaftar</h1>
            <p className="text-slate-500 text-sm">#{pendaftar.nomor_pendaftaran || "NO-ID"}</p>
          </div>
        </div>
        <div className={`px-4 py-1.5 rounded-full border text-xs font-bold ${statusColors[pendaftar.status]}`}>
          Status: {pendaftar.status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Utama */}
        <div className="md:col-span-2 space-y-6">
          {/* Data Pribadi */}
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0A2540] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Data Pribadi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Nama Lengkap</p>
                <p className="text-slate-800 font-bold">{pendaftar.nama_lengkap}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">NIK</p>
                <p className="text-slate-800 font-medium">{pendaftar.nik || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">TTL</p>
                <p className="text-slate-800 font-medium">{pendaftar.tempat_lahir || "-"}, {pendaftar.tanggal_lahir || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Jenis Kelamin</p>
                <p className="text-slate-800 font-medium">{pendaftar.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Asal Sekolah</p>
                <p className="text-slate-800 font-medium">{pendaftar.asal_sekolah || "-"}</p>
              </div>
            </div>
          </div>

          {/* Data Orang Tua */}
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0A2540] mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" /> Data Orang Tua
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Nama Ayah</p>
                <p className="text-slate-800 font-medium">{pendaftar.nama_ayah || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Nama Ibu</p>
                <p className="text-slate-800 font-medium">{pendaftar.nama_ibu || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Telp/WhatsApp Wali</p>
                <p className="text-slate-800 font-bold flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" /> {pendaftar.telp_wali}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Email</p>
                <p className="text-slate-800 font-medium">{pendaftar.email || "-"}</p>
              </div>
            </div>
          </div>

          {/* Alamat */}
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0A2540] mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" /> Alamat
            </h3>
            <p className="text-slate-800 leading-relaxed mb-4">{pendaftar.alamat || "-"}</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Kecamatan</p>
                <p className="text-sm font-medium">{pendaftar.kecamatan || "-"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Kabupaten</p>
                <p className="text-sm font-medium">{pendaftar.kabupaten || "-"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Provinsi</p>
                <p className="text-sm font-medium">{pendaftar.provinsi || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Tindakan */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-extrabold text-slate-900 mb-5 text-sm">Status Pendaftaran</h3>
            <div className="space-y-3">
              <button onClick={() => handleUpdateStatus("pending")} disabled={saving}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-colors ${pendaftar.status === "pending" ? "bg-amber-50 border-amber-500 text-amber-700" : "border-slate-100 hover:bg-slate-50 text-slate-600"}`}>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Pending
                </div>
                {pendaftar.status === "pending" && <CheckCircle2 className="w-4 h-4" />}
              </button>
              <button onClick={() => handleUpdateStatus("diterima")} disabled={saving}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-colors ${pendaftar.status === "diterima" ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "border-slate-100 hover:bg-slate-50 text-slate-600"}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Diterima
                </div>
                {pendaftar.status === "diterima" && <CheckCircle2 className="w-4 h-4" />}
              </button>
              <button onClick={() => handleUpdateStatus("cadangan")} disabled={saving}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-colors ${pendaftar.status === "cadangan" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-slate-100 hover:bg-slate-50 text-slate-600"}`}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Cadangan
                </div>
                {pendaftar.status === "cadangan" && <CheckCircle2 className="w-4 h-4" />}
              </button>
              <button onClick={() => handleUpdateStatus("ditolak")} disabled={saving}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-colors ${pendaftar.status === "ditolak" ? "bg-red-50 border-red-500 text-red-700" : "border-slate-100 hover:bg-slate-50 text-slate-600"}`}>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Ditolak
                </div>
                {pendaftar.status === "ditolak" && <CheckCircle2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-extrabold text-slate-900 mb-4 text-sm">Program Pilihan</h3>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <GraduationCap className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-blue-900 font-extrabold">{pendaftar.program_pilihan}</p>
            </div>
            <p className="text-xs text-slate-400 mt-4 italic">Pendaftar mendaftar pada {new Date(pendaftar.created_at).toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Users(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M17 11a4 4 0 0 0 0-8"/></svg>
  )
}
