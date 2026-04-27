import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MessageSquare, Eye, EyeOff } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPesanPage() {
  const supabase = await createClient();
  const { data: pesan } = await supabase.from("kontak_pesan").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Pesan Masuk</h1>
        <p className="text-slate-500 mt-1">{pesan?.filter(p => !p.dibaca).length || 0} pesan belum dibaca</p>
      </div>

      <div className="space-y-4">
        {pesan && pesan.length > 0 ? pesan.map((p) => (
          <div key={p.id} className={`bg-white rounded-2xl border p-6 shadow-sm ${!p.dibaca ? "border-blue-200 bg-blue-50/30" : "border-slate-100"}`}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-extrabold text-sm">
                  {p.nama[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{p.nama}</p>
                  <p className="text-xs text-slate-400">{p.email} {p.telp && `· ${p.telp}`}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {!p.dibaca && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                <p className="text-xs text-slate-400">{new Date(p.created_at).toLocaleDateString("id-ID")}</p>
              </div>
            </div>
            {p.subjek && <p className="text-sm font-semibold text-slate-700 mb-2">Re: {p.subjek}</p>}
            <p className="text-slate-600 text-sm leading-relaxed">{p.pesan}</p>
            <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
              <a href={`mailto:${p.email}`} className="text-xs font-bold text-blue-600 hover:text-blue-800">Balas via Email →</a>
              {p.telp && <a href={`https://wa.me/${p.telp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-600 hover:text-emerald-800">WhatsApp →</a>}
            </div>
          </div>
        )) : (
          <div className="text-center py-16 text-slate-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Belum ada pesan masuk</p>
          </div>
        )}
      </div>
    </div>
  );
}
