import { PAGE_LIMIT } from "@/const";
import { metaDataCustom } from "@/lib/meta-data-custom";
import { SearchMovieView } from "@/modules/search/ui/views/search-movie-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;

  const keyword = Array.isArray(q) ? q[0] : q ?? "";

  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL
  }/tim-kiem?q=${encodeURIComponent(keyword)}`;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
    ...metaDataCustom(url, `Tìm kiếm: ${keyword}`),
    robots: {
      index: false,
      follow: false,
    },
  };
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
