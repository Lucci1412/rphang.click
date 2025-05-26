"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

export const Navigation = () => {
  return (
    <React.Suspense fallback={<div>...loading</div>}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <NavigationSuspense />
      </ErrorBoundary>
    </React.Suspense>
  );
};
const NavigationSuspense = () => {
  const { data: categories = [] } = trpc.category.getAllCategory.useQuery();
  const { data: countries = [] } = trpc.country.getAllCountry.useQuery();

  return (
    <>
      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        <Link
          href="/"
          className="text-orange-500 hover:text-orange-400 font-medium text-sm"
        >
          Trang chủ
        </Link>
        <Link
          href="/danh-muc/phim-le"
          className="text-gray-300 hover:text-white font-medium text-sm"
        >
          Phim lẻ
        </Link>
        <Link
          href="/danh-muc/phim-bo"
          className="text-gray-300 hover:text-white font-medium text-sm"
        >
          Phim bộ
        </Link>
        <Link
          href="/danh-muc/hoat-hinh"
          className="text-gray-300 hover:text-white font-medium text-sm"
        >
          Anime
        </Link>
        <Link
          href="/danh-muc/tv-shows"
          className="text-gray-300 hover:text-white text-sm"
        >
          TV Show
        </Link>

        {/* Thể Loại Dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1 px-2 cursor-pointer text-gray-300 hover:text-white font-medium text-sm">
              Thể Loại <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-100 grid grid-cols-3 p-2"
          >
            {categories?.map((category) => (
              <Link key={category.id} href={`/the-loai/${category.slug}`}>
                <DropdownMenuItem className="cursor-pointer">
                  {category.name}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quốc Gia Dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1 px-2 cursor-pointer text-gray-300 hover:text-white font-medium text-sm">
              Quốc Gia <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-100 grid grid-cols-3 p-2"
          >
            {countries?.map((country) => (
              <Link key={country.id} href={`/quoc-gia/${country.slug}`}>
                <DropdownMenuItem className="cursor-pointer">
                  {country.name}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
};

export default Navigation;
