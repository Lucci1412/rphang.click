import MovieView from "@/modules/movie/ui/views/movie-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";


const Page = async () => {
  void trpc.movie.getTopNew.prefetch({
    limit: 20,
  });
 
  return (
    <HydrateClient>
      <MovieView></MovieView>
    </HydrateClient>
  );
};

export default Page;
