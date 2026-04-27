"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  BookOpen,
  Image,
  Settings,
  Users,
  MessageSquare,
  UserCheck,
  ChevronDown,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Bell,
  Trophy,
  Building2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const menuGroups = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
      { icon: Bell, label: "Pengumuman", href: "/admin/pengumuman" },
      { icon: MessageSquare, label: "Pesan Masuk", href: "/admin/pesan" },
    ],
  },
  {
    label: "Konten",
    items: [
      { icon: Newspaper, label: "Berita", href: "/admin/berita" },
      { icon: Image, label: "Galeri", href: "/admin/galeri" },
      { icon: BookOpen, label: "Program", href: "/admin/program" },
      { icon: Trophy, label: "Prestasi", href: "/admin/prestasi" },
      { icon: GraduationCap, label: "Ekskul", href: "/admin/ekskul" },
      { icon: Building2, label: "Struktur Org", href: "/admin/struktur" },
    ],
  },
  {
    label: "PPDB",
    items: [
      { icon: UserCheck, label: "Pendaftar", href: "/admin/ppdb" },
      { icon: Settings, label: "Setting PPDB", href: "/admin/ppdb-settings" },
    ],
  },
  {
    label: "Pengaturan",
    items: [
      { icon: Settings, label: "Konten Halaman", href: "/admin/settings" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#D4AF37] rounded-lg flex items-center justify-center text-[#0A2540] font-extrabold text-sm">DI</div>
          <div>
            <div className="text-white font-extrabold text-sm leading-tight">Darul Ihsan</div>
            <div className="text-slate-400 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto no-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest px-3 mb-2">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`admin-sidebar-link ${isActive ? "active" : ""}`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button onClick={handleLogout} className="admin-sidebar-link w-full hover:text-red-400">
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0A2540] min-h-screen fixed left-0 top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#0A2540] text-white rounded-xl flex items-center justify-center shadow-lg"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <aside className="w-64 bg-[#0A2540] flex flex-col">
            <SidebarContent />
          </aside>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
