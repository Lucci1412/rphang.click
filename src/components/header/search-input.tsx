"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const SearchInput = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset loading state when URL changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  const handleSearch = () => {
    if (isLoading) return;

    const trimmedKeyword = keyword.trim();

    const currentQuery = searchParams.get("q");
    const encodedKeyword = encodeURIComponent(trimmedKeyword);

    if (pathname === "/tim-kiem" && currentQuery === trimmedKeyword) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    router.push(`/tim-kiem?q=${encodedKeyword}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (pathname === "/tim-kiem") {
      const currentQuery = searchParams.get("q");
      if (currentQuery) {
        setKeyword(currentQuery);
      }
    }
  }, [pathname, searchParams]);

  return (
    <div className="relative">
      <div className="flex items-center">
        <Input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm kiếm phim..."
          className=" flex-1 w-40  md:w-72 bg-gray-700 border-gray-600 rounded-none text-white placeholder-gray-400 text-sm"
          disabled={isLoading}
        />

        <Button
          onClick={() => {
            if (keyword) {
              handleSearch();
            }
          }}
          size="sm"
          className="bg-[#cf2e2e] rounded-none hover:bg-red-700 text-white h-9"
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
