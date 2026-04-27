import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="lg:hidden w-8" />
          <div />
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-700">Admin</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <div className="w-9 h-9 bg-[#0A2540] rounded-xl flex items-center justify-center text-white text-sm font-extrabold">
              {user.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
