import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MAS Pesantren Modern Darul Ihsan | Pilihan Terbaik Masa Depan",
    template: "%s | MAS Darul Ihsan",
  },
  description:
    "MAS Pesantren Modern Darul Ihsan - Mencetak Generasi Qur'ani & Modern. Pendidikan terpadu yang memadukan kecerdasan intelektual, kemandirian karakter, dan nilai-nilai luhur Pesantren Modern. Akreditasi A.",
  keywords: [
    "MAS Darul Ihsan",
    "Pesantren Modern",
    "Madrasah Aliyah",
    "Hamparan Perak",
    "Deli Serdang",
    "Tahfidz",
    "PPDB 2025",
    "Sekolah Islam",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://darulihsan.sch.id"
  ),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "MAS Pesantren Modern Darul Ihsan",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 500,
            },
            success: {
              style: {
                background: "#0A2540",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#dc2626",
                color: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
