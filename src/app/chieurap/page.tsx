import { PAGE_LIMIT } from "@/const";
import { ChieuRapMovieList } from "@/modules/chieurap/ui/view/chieurap-list";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.movie.getChỉeuRap.prefetch({
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <ChieuRapMovieList></ChieuRapMovieList>
    </HydrateClient>
  );
};
export default Page;
