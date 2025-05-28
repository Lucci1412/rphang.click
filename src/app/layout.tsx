import { Toaster } from "sonner";
import { TRPCProvider } from "@/trpc/client";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { Metadata } from "next";
 import { GoogleAnalytics } from "@next/third-parties/google";
import Sidebar from "@/components/sidebar";
// import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });
const title = "Phim Chill | Phim Mới | Mọt Phim ";
const des =
  "Xem phim online nhanh nhất với Phim Chill | Phim Mới | Mọt Phim . Cập nhật nhanh chóng, tốc độ, nhièu phim mới các thể loại hot";
export const metadata: Metadata = {
  title: title,
  description: des,
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  openGraph: {
    title: title,
    description: des,

    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [
      {
        url: "/images/logo_share.jpg",
        width: 1200,
        height: 630,
        alt: "PhimChill Open Graph Image",
      },
    ],
    siteName: "PhimChill",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: des,
    images: ["/images/logo_share.jpg"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-2Y7422LTWL" />
        <ThemeProvider>
          <Toaster />
          <TRPCProvider>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white">
              <div className="container mx-auto xl:px-4 py-4">
                <div className="flex gap-6">
                  <div className="flex-1">{children}</div>
                  <div className="hidden xl:block">
                    <Sidebar></Sidebar>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
