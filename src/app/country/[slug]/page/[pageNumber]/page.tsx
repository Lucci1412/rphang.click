import { PAGE_LIMIT } from "@/const";
import { removeFirstTwoWords } from "@/lib/utils";
import { CountryMovieView } from "@/modules/country/ui/views/country-movie-view";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ pageNumber: string; slug: string }>;
}
const Page = async ({ params }: PageProps) => {
  const { slug, pageNumber } = await params;
  const slugEdit = removeFirstTwoWords(slug, 2);

  void trpc.movie.getMovieByCountry.prefetch({
    country: slugEdit,
    page: Number(pageNumber),
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <CountryMovieView
        country={slugEdit}
        page={Number(pageNumber)}
      ></CountryMovieView>
    </HydrateClient>
  );
};
export default Page;
