import { trpc } from "@/trpc/server";


import AuthButton from "./auth-button";
import Navigation from "./navigation";
import Link from "next/link";
import { Suspense } from "react";
import SearchInput from "./search-input";
const Header = () => {
  void trpc.category.getAllCategory.prefetch();
  void trpc.country.getAllCountry.prefetch();

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-orange-500">motphim</span>
              <span className="text-xs text-white bg-orange-500 px-1 rounded">
                VIP
              </span>
            </Link>

            <nav className="hidden md:flex gap-6">
              <Navigation></Navigation>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {/* <div className="relative">
              <Input
                type="text"
                placeholder="Tìm kiếm phim, diễn viên..."
                className="w-72 bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div> */}
            <div className="flex items-center gap-4">
              <Suspense fallback={<div>Đang tải...</div>}>
                <SearchInput></SearchInput>
              </Suspense>
            </div>
            <AuthButton></AuthButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
