import { trpc } from "@/trpc/server";

//  import AuthButton from "./auth-button";
import Link from "next/link";

import { Button } from "../ui/button";
import { Home } from "lucide-react";
const Header = () => {
  void trpc.category.getAllCategory.prefetch();
  void trpc.country.getAllCountry.prefetch();

  return (
    <header className="bg-gray-800 border-b border-gray-700 hidden md:block">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-red-500 font-bold text-xl">
              VLXX.COM
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Thể loại, diễn viên, code...</span>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Tìm kiếm
            </Button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex items-center space-x-6 py-3 text-sm">
          <Link href="/" className="flex items-center space-x-1 text-red-500">
            <Home className="h-4 w-4" />
            <span>Trang chủ</span>
          </Link>
          <Link href="/phim-sex-hay" className="hover:text-red-500">
            Phim sex hay
          </Link>
          <Link href="/phim-sex-vietub" className="hover:text-red-500">
            Phim sex Vietsub
          </Link>
          <Link href="/phim-sex-khong-che" className="hover:text-red-500">
            Phim sex không che
          </Link>
          <Link href="/sex-hoc-sinh" className="hover:text-red-500">
            Sex học sinh
          </Link>
          <Link href="/vung-trom-ngoai-tinh" className="hover:text-red-500">
            Vụng trộm - Ngoại tình
          </Link>
          <Link href="/phim-cap-3" className="hover:text-red-500">
            Phim cấp 3
          </Link>
          <Link href="/sex-my-chau-au" className="hover:text-red-500">
            Sex Mỹ - Châu Âu
          </Link>
        </nav>

        {/* Category Tags */}
        <div className="flex items-center space-x-4 py-2 text-xs">
          <span className="bg-red-600 px-2 py-1 rounded">XVIDEOS</span>
          <span className="bg-gray-700 px-2 py-1 rounded">XNXX</span>
          <span className="bg-gray-700 px-2 py-1 rounded">JAV</span>
          <span className="bg-gray-700 px-2 py-1 rounded">XXX</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
