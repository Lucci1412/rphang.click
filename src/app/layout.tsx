import { Toaster } from "sonner";
import { TRPCProvider } from "@/trpc/client";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { Metadata } from "next";
//  import { GoogleAnalytics } from "@next/third-parties/google";
// import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phim Chill Phim Mới - Xem Phim mới nhanh nhất tại PhimChill",
  description: "Cập nhật phim nhanh nhẩt, tất cả thể loại ,...",
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  openGraph: {
    title: "Phim Chill Online",
    description: "PhimChill - Xem phim cực nhanh, chất lượng cao...",

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
    title: "Phim Chill Onlinee",
    description: "PhimChill - Xem phim cực nhanh, chất lượng cao...",
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
        {/* <GoogleAnalytics gaId="G-PS2EVMD25F" /> */}
        <ThemeProvider>
          <Toaster />
          <TRPCProvider>
            <Header />

            <div className="w-full max-w-[1200px]  mx-auto">
              <div className="flex min-h-screen">
                <main className="flex-1 overflow-y-auto px-2.5 xl:px-0 ">
                  {children}
                </main>
              </div>
            </div>
            <Footer />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
