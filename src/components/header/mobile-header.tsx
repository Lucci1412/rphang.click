import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "../ui/button";
import SearchInput from "./search-input";
import { listCate } from "./listCateHeader";

const MobileHeader = () => {
  return (
    <div>
      <header className="md:hidden bg-black border-b border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-red-500 font-bold text-xl">
            VLXX69.CLUB
          </Link>
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
        <Suspense>
          <SearchInput></SearchInput>
        </Suspense>
      </header>
    </div>
  );
};

export default MobileHeader;
