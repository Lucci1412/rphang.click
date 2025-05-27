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
import { usePathname } from "next/navigation";
import clsx from "clsx";
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
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/danh-muc/phim-le", label: "Phim lẻ" },
    { href: "/danh-muc/phim-bo", label: "Phim bộ" },
    { href: "/danh-muc/hoat-hinh", label: "Anime" },
    { href: "/danh-muc/tv-shows", label: "TV Show" },
     { href: "/chieurap", label: "Chiếu rạp" },
  ];
  return (
    <>
      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "font-medium text-sm",
              pathname === item.href
                ? "text-orange-500 hover:text-orange-400"
                : "text-gray-300 hover:text-white"
            )}
          >
            {item.label}
          </Link>
        ))}

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
