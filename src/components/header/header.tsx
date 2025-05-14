import Link from "next/link";
import Image from "next/image";
import AuthButton from "./auth-button";
import Navigation from "./navigation";
import { ModeToggle } from "./mode-toggle";
import SearchInput from "./search-input";
import { trpc } from "@/trpc/server";
import HeaderBackgroundWrapper from "./header-background-wrapper";
import { MobileMenu } from "./mobile-menu";
import { Suspense } from "react";

const Header = () => {
  void trpc.category.getAllCategory.prefetch();
  void trpc.country.getAllCountry.prefetch();

  return (
    <div className="flex ">
      <HeaderBackgroundWrapper>
        <div className="w-full items-center justify-between flex gap-4 max-w-[1400px]">
          <div className="items-center flex ">
            <Link href="/" className="flex items-center mx-auto cursor-pointer">
              <div className="w-[50px] h-[50px] rounded-xl overflow-hidden">
                <Image
                  src="/images/logo.jpg"
                  width={150}
                  height={150}
                  alt="logo"
                  priority
                ></Image>
              </div>
              <p className="text-xl font-semibold tracking-tight ml-1">
                PhimChill
              </p>
            </Link>
          </div>
          <div className="flex-1 items-center flex-row hidden xl:flex">
            <Navigation></Navigation>
          </div>
          <div className="flex flex-row items-center">
            <Suspense fallback={<div>Đang tải...</div>}>
              <SearchInput />
            </Suspense>
            <MobileMenu></MobileMenu>
          </div>
          <div className="hidden xl:block">
            <ModeToggle />
          </div>
          <div className=" hidden xl:block">
            <AuthButton></AuthButton>
          </div>
        </div>
      </HeaderBackgroundWrapper>
    </div>
  );
};

export default Header;
