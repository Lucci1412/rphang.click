import { PAGE_LIMIT } from "@/const";
import { CountryMovieView } from "@/modules/country/ui/views/country-movie-view";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ pageNumber: string; slug: string }>;
}
const Page = async ({ params }: PageProps) => {
  const { slug, pageNumber } = await params;

  void trpc.movie.getMovieByCountry.prefetch({
    country: slug,
    page: Number(pageNumber),
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <CountryMovieView country={slug} page={Number(pageNumber)}></CountryMovieView>
    </HydrateClient>
  );
};
export default Page;
