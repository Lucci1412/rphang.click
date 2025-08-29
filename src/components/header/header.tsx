import Link from "next/link";
import { Button } from "../ui/button";
import SearchInput from "./search-input";
import { listCate, listOrigin } from "./listCateHeader";
import { Suspense } from "react";
const Header = () => {
  return (
    <header className="bg-black border-b border-gray-700 hidden md:block">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-red-500 font-bold text-xl">
             RPHANG.CLICK
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Suspense>
              {" "}
              <SearchInput></SearchInput>
            </Suspense>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex items-center flex-wrap space-x-2 space-y-2 py-3 text-sm">
          {listCate.map((item, index) => {
            return (
              <Link key={index} href={item.url} className="hover:text-red-500">
                <Button variant="secondary" size="sm">
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Category Tags */}
        <div className="flex items-center space-x-4 pb-2 text-xs">
          {listOrigin.map((item, index) => {
            return (
              <Link key={index} href={item.url} className="hover:text-red-500">
                <Button variant="secondary" size="sm">
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
