"use client";

import { Input } from "@/components/ui/input";
import { Loader2, Search, X } from "lucide-react";
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

  const handleClear = () => {
    if (!isLoading) {
      setKeyword("");
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
        <div
          className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchExpanded
              ? "w-[150px] sm:w-[200px] md:w-[250px] xl:w-[300px] ml-2 opacity-100"
              : "w-0 opacity-0"
          }`}
        >
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tìm kiếm phim..."
            className="bg-background border-border rounded-full h-9 pr-8 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary"
            disabled={isLoading}
          />
          {keyword && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
              ) : (
                <X
                  className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={handleClear}
                />
              )}
            </div>
          )}
        </div>
        <button
          onClick={() => {
            if (!isSearchExpanded) {
              setIsSearchExpanded(true);
            } else {
              handleSearch();
            }
          }}
          disabled={isLoading}
          className="flex items-center justify-center h-9 w-9 rounded-full bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer"
          title="Search"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
