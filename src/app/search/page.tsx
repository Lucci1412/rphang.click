import { PAGE_LIMIT } from "@/const";
import { SearchMovieView } from "@/modules/search/ui/views/search-movie-view";
import { HydrateClient, trpc } from "@/trpc/server";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}


const Page = async ({ searchParams }: PageProps) => {
  const { q, page } = await searchParams;

  const pageNumber = parseInt(Array.isArray(page) ? page[0] : page ?? "1", 10);

  const keyword = Array.isArray(q) ? q[0] : q ?? "";
  void trpc.search.searchMovie.prefetch({
    keyword: keyword,
    page: pageNumber,
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <SearchMovieView search={keyword} page={pageNumber}></SearchMovieView>
    </HydrateClient>
  );
};

export default Page;
