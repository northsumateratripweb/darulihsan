import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Tag, ArrowRight } from "lucide-react";
import { getBeritaBySlug, getBerita, formatDate } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);
  if (!berita) return { title: "Berita Tidak Ditemukan" };
  return {
    title: berita.judul,
    description: berita.ringkasan || "",
    openGraph: {
      title: berita.judul,
      description: berita.ringkasan || "",
      images: berita.gambar ? [berita.gambar] : [],
    },
  };
}

export const revalidate = 60;

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  const [berita, related] = await Promise.all([
    getBeritaBySlug(slug),
    getBerita(4),
  ]);

  if (!berita) notFound();

  const relatedItems = related.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-96 overflow-hidden bg-[#0A2540]">
        {berita.gambar && (
          <Image
            src={berita.gambar}
            alt={berita.judul}
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/70 to-transparent" />
        <div className="relative h-full max-w-4xl mx-auto px-4 flex flex-col justify-end pb-10">
          <span className="inline-block bg-[#D4AF37] text-[#0A2540] text-xs font-extrabold px-4 py-1.5 rounded-full mb-4 w-fit">
            {berita.kategori}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            {berita.judul}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {berita.published_at ? formatDate(berita.published_at) : formatDate(berita.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {berita.penulis}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            <Link href="/berita" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0A2540] mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Berita
            </Link>

            {berita.ringkasan && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl mb-8">
                <p className="text-blue-900 font-medium italic leading-relaxed">{berita.ringkasan}</p>
              </div>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-[#0A2540] prose-a:text-blue-600 prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: berita.konten || "" }}
            />

            {berita.tags && berita.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-10 border-t border-slate-100">
                <Tag className="w-4 h-4 text-slate-400" />
                {berita.tags.map((tag: string) => (
                  <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside>
            <h3 className="text-lg font-extrabold text-[#0A2540] mb-6">Berita Lainnya</h3>
            <div className="space-y-6">
              {relatedItems.map((item) => (
                <Link key={item.id} href={`/berita/${item.slug}`} className="group flex gap-4">
                  {item.gambar && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={item.gambar}
                        alt={item.judul}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">{item.kategori}</p>
                    <h4 className="text-sm font-bold text-[#0A2540] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {item.judul}
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">
                      {item.published_at ? formatDate(item.published_at) : formatDate(item.created_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <Link href="/berita" className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm">
                Lihat Semua Berita <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
