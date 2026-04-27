import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getStruktur } from "@/lib/data";
import { User, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Struktur Organisasi",
  description: "Struktur Organisasi MAS Pesantren Modern Darul Ihsan - Pimpinan, Guru, dan Staff.",
};

export const revalidate = 60;

export default async function StrukturPage() {
  const struktur = await getStruktur();

  const pimpinan = struktur.filter(s => s.divisi?.toLowerCase() === "pimpinan");
  const guru = struktur.filter(s => s.divisi?.toLowerCase() === "guru");
  const staff = struktur.filter(s => s.divisi?.toLowerCase() === "staff" || s.divisi?.toLowerCase() === "administrasi");

  const MemberCard = ({ member }: { member: any }) => (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 text-center group">
      <div className="relative w-32 h-32 mx-auto mb-5 rounded-2xl overflow-hidden bg-slate-100 border-4 border-slate-50 group-hover:border-[#D4AF37] transition-colors">
        {member.foto ? (
          <Image
            src={member.foto}
            alt={member.nama}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
            <User className="w-12 h-12" />
          </div>
        )}
      </div>
      <h3 className="font-extrabold text-[#0A2540] text-lg mb-1">{member.nama}</h3>
      <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">{member.jabatan}</p>
      {member.kualifikasi && <p className="text-slate-400 text-[10px] font-mono">{member.kualifikasi}</p>}
    </div>
  );

  return (
    <>
      {/* Header */}
      <section className="relative py-20 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-0.5 w-12 bg-[#D4AF37] mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Struktur Organisasi</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Tenaga pendidik dan kependidikan profesional Darul Ihsan</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Struktur</span>
          </div>
        </div>
      </section>

      {/* Pimpinan */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Leadership</div>
            <h2 className="text-4xl font-extrabold text-[#0A2540]">Pimpinan Pondok</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {pimpinan.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Guru */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Educators</div>
            <h2 className="text-4xl font-extrabold text-[#0A2540]">Dewan Guru</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {guru.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Support System</div>
            <h2 className="text-4xl font-extrabold text-[#0A2540]">Staff &amp; Kependidikan</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {staff.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Info */}
      <section className="py-16 bg-[#0A2540]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShieldCheck className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="text-2xl font-extrabold text-white mb-4">Berkomitmen pada Kualitas Pendidikan</h2>
          <p className="text-slate-400 text-lg">
            Seluruh tenaga pendidik kami memiliki kualifikasi akademik yang sesuai dan dedikasi tinggi 
            dalam membimbing santri menuju kesuksesan dunia dan akhirat.
          </p>
        </div>
      </section>
    </>
  );
}
