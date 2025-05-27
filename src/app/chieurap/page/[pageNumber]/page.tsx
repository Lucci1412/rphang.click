import { PAGE_LIMIT } from "@/const";
import { ChieuRapMovieList } from "@/modules/chieurap/ui/view/chieurap-list";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ pageNumber: string; slug: string }>;
}
const Page = async ({ params }: PageProps) => {
  const {pageNumber } = await params;

  void trpc.movie.getChỉeuRap.prefetch({
    page: Number(pageNumber),
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <ChieuRapMovieList
        page={Number(pageNumber)}
      ></ChieuRapMovieList>
    </HydrateClient>
  );
};
export default Page;
