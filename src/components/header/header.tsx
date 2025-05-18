import Link from "next/link";
import { trpc } from "@/trpc/server";
import MobileNav from "./mobile-nav";
import Navigation from "./navigation";
import SearchInput from "./search-input";

const Header = () => {
  void trpc.category.getAllCategory.prefetch();
  void trpc.country.getAllCountry.prefetch();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl md:text-2xl">
              PhimChill
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Navigation></Navigation>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="relative w-full max-w-[200px] hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div> */}
          <SearchInput></SearchInput>
          {/* <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
