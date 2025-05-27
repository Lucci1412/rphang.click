"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <div className="flex flex-col gap-6 px-2 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <span className="inline-block font-bold text-xl">PhimChill</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-base font-medium text-primary"
              onClick={() => setOpen(false)}
            >
              Trang chủ
            </Link>
             <Link
              href="/chieurap"
              className="text-base font-medium text-primary"
              onClick={() => setOpen(false)}
            >
              Chiếu rạp
            </Link>
            <Link
              href="/list/phim-le"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Phim lẻ
            </Link>
            <Link
              href="/list/phim-bo"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Phim bộ
            </Link>
            <Link
              href="/list/hoat-hinh"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Hoạt hình
            </Link>
            <Link
              href="/quoc-gia/trung-quoc"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Trung Quốc
            </Link>
            <Link
              href="/quoc-gia/han-quoc"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Hàn Quốc
            </Link>
            <Link
              href="/quoc-gia/viet-nam"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Việt Nam
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
