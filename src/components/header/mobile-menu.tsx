"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { List } from "lucide-react";
import AuthButton from "./auth-button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button"; // import Button từ shadcn/ui
import { ModeToggle } from "./mode-toggle";

export function MobileMenu() {
  const side = "left";
  return (
    <div className="grid grid-cols-1 gap-2 xl:hidden">
      <Sheet modal={false} key={side}>
        <SheetTrigger asChild>
          <List className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="w-[280px]" side={side}>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-x-2">
              Vietube
              <ModeToggle />
            </SheetTitle>
          </SheetHeader>

          <Separator />

          <div className="grid gap-2 py-4 ">
            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/danh-sach/phim-le" className="pl-4">
                  Phim Lẻ
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/danh-sach/phim-bo" className="pl-4">
                  Phim Bộ
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/danh-sach/hoat-hinh" className="pl-4">
                  Phim Hoạt Hình
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/danh-sach/tv-shows" className="pl-4">
                  TV Show
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/quoc-gia/trung-quoc" className="pl-4">
                  Phim Trung Quốc
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/quoc-gia/han-quoc" className="pl-4">
                  Phim Hàn Quốc
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/quoc-gia/au-my" className="pl-4">
                  Phim Âu Mỹ
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/the-loai/co-trang" className="pl-4">
                  Phim Cổ Trang
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/the-loai/vo-thuat" className="pl-4">
                  Phim Võ Thuật
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/the-loai/tinh-cam" className="pl-4">
                  Phim Tình Cảm
                </Link>
              </Button>
            </SheetClose>
          </div>

          <Separator />

          <SheetFooter>
            <SheetClose asChild>
              <AuthButton />
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
