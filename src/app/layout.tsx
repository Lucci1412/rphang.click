import { Toaster } from "sonner";
import { TRPCProvider } from "@/trpc/client";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phim Mới - Xem Phim Trực Tuyến Miễn Phí Tại Vietube",
  description:
    "Xem phim trực tuyến miễn phí tại Vietube. Cập nhật liên tục các bộ phim mới nhất, phim hay, phim chiếu rạp, phim bộ, phim lẻ.",
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  openGraph: {
    title: "Phim Mới",
    description: "Vietube - Xem phim trực tuyến miễn phí, chất lượng cao...",

    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [
      {
        url: "/images/logo_share.jpg",
        width: 1200,
        height: 630,
        alt: "Vietube Open Graph Image",
      },
    ],
    siteName: "Vietube",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phim Mới - Vietube",
    description: "Xem phim trực tuyến miễn phí, chất lượng cao tại Vietube.",
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
      <head>
        <Script id="ads-head-script" strategy="beforeInteractive">
          {`(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',9290616,document.createElement('script'))`}
        </Script>
      </head>
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-5M3PF8BK7M" />
        <ThemeProvider>
          <Toaster />
          <TRPCProvider>
            <Header />

            <div className="w-full max-w-[1400px]  mx-auto">
              <div className="flex min-h-screen pt-[4rem]">
                <main className="flex-1 overflow-y-auto px-2.5 xl:px-0 ">
                  {children}
                </main>

                {/* <Sidebar></Sidebar> */}
              </div>
            </div>
            <Footer />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
