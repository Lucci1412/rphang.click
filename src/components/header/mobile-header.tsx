import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {  Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const MobileHeader = () => {
   const listCate = [
    {
      name: "Trang chủ",
      url: "/",
    },
    {
      name: "Phim sex hay",
      url: "/the-loai/khong-che",
    },
    {
      name: "Phim sex không che",
      url: "/the-loai/khong-che",
    },
    {
      name: "Phim sex vụng trộm",
      url: "/the-loai/vung-trom",
    },
    {
      name: "Phim sex hiếp dâm",
     url: "/the-loai/hiep-dam"
  
    },
    {
      name: "Sex Mỹ - Châu Âu",
      url: "/quoc-gia/chau-au",
    },
    //  {
    //   name: "Sex Việt Nam ",
    //   url: "/quoc-gia/viet-nam",
    // },
    {
      name: "Sex Trung Quốc",
      url: "/quoc-gia/trung-quoc",
    },
    // {
    //   name: "Sex Hàn Quốc",
    //   url: "/quoc-gia/han-quoc",
    // },
  ];

  return (
    <div>
      <header className="md:hidden bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-red-500 font-bold text-xl">
            vlxx69.com
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
                className="bg-gray-800 text-white border-gray-700 pl-4"
              >
                <nav className="flex flex-col space-y-4 mt-8">
                
                  {listCate.map((item,index)=>{
                    return <Link key={index} href={item.url} className="hover:text-red-500">
                   {item.name}
                  </Link>
                  })}
                  
                 
                
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
