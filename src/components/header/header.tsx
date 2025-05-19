import Link from "next/link";
import { trpc } from "@/trpc/server";
import MobileNav from "./mobile-nav";
import Navigation from "./navigation";
import SearchInput from "./search-input";
import { Suspense } from "react";
import Image from "next/image";

const Header = () => {
  void trpc.category.getAllCategory.prefetch();
  void trpc.country.getAllCountry.prefetch();

  return (
    <header className="sticky top-0 z-40 w-full overflow-hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link href="/" className="flex  space-x-2 items-center justify-center">

            <div className="w-[250px] h-[250px] rounded-xl overflow-hidden">
              <Image
                src="/images/logo.jpg"
                width={250}
                height={250}
                alt="logo"
                priority
              ></Image>
            </div>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Navigation></Navigation>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Suspense fallback={<div>Đang tải...</div>}>
            <SearchInput></SearchInput>
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;
