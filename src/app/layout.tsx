import { Toaster } from "sonner";
import { TRPCProvider } from "@/trpc/client";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import MobileHeader from "@/components/header/mobile-header";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
const inter = Inter({ subsets: ["latin"] });
const keywords = [
  "rphang",
  "rphang clip",
  "nhật ký mây mưa rphang",
  "sex rphang",
  "rphang sex",
  "clip sex rphang",
  "rphang nhật ký mây mưa",
  "rphang mbbg",
];

const title =
  "Rphang - Clip Rphang, Nhật ký mây mưa rphang, sex rphang chọn lọc";
const des =
  "Xem rphang, clip sex rphang, nhật ký mây mưa rphang, sex rphang, rphang mbbg... nội dung chọn lọc, cập nhật nhanh nhất.";

export const metadata: Metadata = {
  title: title,
  description: des,
  keywords: keywords,
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
        alt: "vlxx69.com Open Graph Image",
      },
    ],
    siteName: "vlxx69.com",
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
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} ng-black  text-white`}>
        <GoogleAnalytics gaId="G-BSD34PX7Z7" />

        <ThemeProvider>
          <Toaster />
          <TRPCProvider>
            <Header />
            <MobileHeader />
            <div className="max-w-[1200px] mx-auto">{children}</div>

            <Footer />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
