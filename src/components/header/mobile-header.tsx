import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Home, Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const MobileHeader = () => {
  return (
    <div>
      <header className="md:hidden bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-red-500 font-bold text-xl">
            VLXX.COM
          </Link>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gray-800 text-white border-gray-700"
              >
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 text-red-500"
                  >
                    <Home className="h-4 w-4" />
                    <span>Trang chủ</span>
                  </Link>
                  <Link href="/phim-sex-hay" className="hover:text-red-500">
                    Phim sex hay
                  </Link>
                  <Link href="/phim-sex-vietub" className="hover:text-red-500">
                    Phim sex Vietsub
                  </Link>
                  <Link
                    href="/phim-sex-khong-che"
                    className="hover:text-red-500"
                  >
                    Phim sex không che
                  </Link>
                  <Link href="/sex-hoc-sinh" className="hover:text-red-500">
                    Sex học sinh
                  </Link>
                  <Link
                    href="/vung-trom-ngoai-tinh"
                    className="hover:text-red-500"
                  >
                    Vụng trộm
                  </Link>
                  <Link href="/phim-cap-3" className="hover:text-red-500">
                    Phim cấp 3
                  </Link>
                  <Link href="/sex-my-chau-au" className="hover:text-red-500">
                    Sex Mỹ - Châu Âu
                  </Link>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex flex-col space-y-2">
                      <span className="bg-red-600 px-2 py-1 rounded text-xs w-fit">
                        XVIDEOS
                      </span>
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs w-fit">
                        XNXX
                      </span>
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs w-fit">
                        JAV
                      </span>
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs w-fit">
                        XXX
                      </span>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MobileHeader;
