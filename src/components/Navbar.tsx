"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang",
    href: "#",
    children: [
      { label: "Profil & Sejarah", href: "/profil" },
      { label: "Visi & Misi", href: "/visi-misi" },
      { label: "Struktur Organisasi", href: "/struktur" },
    ],
  },
  { label: "Program", href: "/program" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100"
          : "bg-white/80 backdrop-blur-sm border-b border-white/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#0A2540] flex items-center justify-center text-white font-extrabold text-base shadow-lg group-hover:shadow-[#D4AF37]/30 transition-shadow">
              DI
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                MAS Pesantren Modern
              </div>
              <div className="text-base font-extrabold text-[#0A2540] leading-tight">
                Darul Ihsan
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#0A2540] rounded-lg hover:bg-slate-50 transition-all"
                    onMouseEnter={() => setDropdownOpen(link.label)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 transition-all duration-200 ${
                      dropdownOpen === link.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                    onMouseEnter={() => setDropdownOpen(link.label)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-[#0A2540] hover:bg-blue-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    pathname === link.href
                      ? "text-[#0A2540] bg-blue-50 font-semibold"
                      : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/ppdb"
              className="bg-[#0A2540] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#1e3a5f] transition-all shadow-lg hover:shadow-[#0A2540]/30 pulse-gold"
            >
              PPDB 2025 →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-4 py-4 space-y-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {link.label}
                </div>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-[#0A2540] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "text-[#0A2540] bg-blue-50 font-semibold"
                    : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-2 pb-1">
            <Link
              href="/ppdb"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-[#0A2540] text-white px-6 py-3 rounded-xl text-sm font-bold"
            >
              PPDB 2025/2026 →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
