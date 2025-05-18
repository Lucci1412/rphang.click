"use client";
import { Button } from "@/components/ui/button";
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
      <nav className="flex   items-center space-x-6">
        <Link
          href="/list/phim-le"
          className="text-foreground hover:text-primary"
        >
          <Button
            variant="ghost"
            size="default"
            className="flex items-center gap-1 px-2 cursor-pointer text-md"
          >
            Phim lẻ
          </Button>
        </Link>
        <Link
          href="/list/phim-bo"
          className="text-foreground hover:text-primary"
        >
          <Button
            variant="ghost"
            size="default"
            className="flex items-center gap-1 px-2 cursor-pointer text-md"
          >
            Phim bộ
          </Button>
        </Link>
        <Link
          href="/list/hoat-hinh"
          className="text-foreground hover:text-primary"
        >
          <Button
            variant="ghost"
            size="default"
            className="flex items-center gap-1 px-2 cursor-pointer text-md"
          >
            Hoạt Hình
          </Button>
        </Link>
        <Link
          href="/list/tv-shows"
          className="text-foreground hover:text-primary"
        >
          <Button
            variant="ghost"
            size="default"
            className="flex items-center gap-1 px-2 cursor-pointer text-md"
          >
            TV Show
          </Button>
        </Link>

        {/* Thể Loại Dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-1 px-2 cursor-pointer"
            >
              Thể Loại <ChevronDown className="h-4 w-4" />
            </Button>
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
            <Button
              variant="ghost"
              className="flex items-center gap-1 px-2 cursor-pointer"
            >
              Quốc Gia <ChevronDown className="h-4 w-4" />
            </Button>
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
