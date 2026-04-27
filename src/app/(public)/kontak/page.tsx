import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import KontakForm from "@/components/KontakForm";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi MAS Pesantren Modern Darul Ihsan untuk informasi PPDB, akademik, atau kerjasama.",
};

export const revalidate = 60;

export default async function KontakPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Header */}
      <section className="relative py-20 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-0.5 w-12 bg-[#D4AF37] mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Hubungi Kami</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Kami siap membantu menjawab pertanyaan Anda</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Kontak</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h3 className="font-extrabold text-[#0A2540] mb-5">Informasi Kontak</h3>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat</p>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        {settings.alamat || "Jl. H Mustafa Kamil, Desa Selemak, Kec. Hamparan Perak, Kab. Deli Serdang"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Telepon / WhatsApp</p>
                      <a href={`tel:${settings.telp}`} className="text-sm font-bold text-[#0A2540] hover:text-blue-600 transition-colors">
                        {settings.telp || "0812-3456-7890"}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                      <a href={`mailto:${settings.email}`} className="text-sm font-bold text-[#0A2540] hover:text-blue-600 transition-colors">
                        {settings.email || "info@darulihsan.sch.id"}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Jam Operasional</p>
                      <p className="text-sm font-medium text-slate-700">Sen - Jum: 08.00 - 17.00 WIB</p>
                      <p className="text-sm font-medium text-slate-700">Sabtu: 08.00 - 13.00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h3 className="font-extrabold text-[#0A2540] mb-4">Media Sosial</h3>
                <div className="space-y-3">
                  <a href={settings.instagram || "https://instagram.com/darulihsan"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 transition-colors group">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 group-hover:text-pink-600 transition-colors">Instagram</p>
                      <p className="text-xs text-slate-400">@darulihsan</p>
                    </div>
                  </a>
                  <a href={settings.youtube || "https://youtube.com/@darulihsan"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group">
                    <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors">YouTube</p>
                      <p className="text-xs text-slate-400">Darul Ihsan Official</p>
                    </div>
                  </a>
                  <a href={`https://wa.me/${settings.whatsapp || "6281234567890"}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors group">
                    <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">WhatsApp</p>
                      <p className="text-xs text-slate-400">Chat langsung dengan kami</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Form + Map */}
            <div className="lg:col-span-2 space-y-8">
              {/* Form */}
              <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                <h2 className="text-2xl font-extrabold text-[#0A2540] mb-6">Kirim Pesan</h2>
                <KontakForm />
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-extrabold text-[#0A2540]">Lokasi Kami</h3>
                </div>
                <div className="h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15926.868!2d98.6!3d3.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMy43NcKwNDUnMDEuNyJOIDk4wrAzNicwMC4wIkU!5e0!3m2!1sid!2sid!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi MAS Pesantren Modern Darul Ihsan"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
