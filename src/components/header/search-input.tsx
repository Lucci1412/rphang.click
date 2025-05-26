"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
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
    if (!trimmedKeyword) return setIsSearchExpanded(false);

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
          className="w-72 bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm"
          disabled={isLoading}
        />
        {keyword && (
          <Search
            onClick={() => {
              handleSearch();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
