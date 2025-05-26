import MovieView from "@/modules/movie/ui/views/movie-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PhimChill | Phim Mới | Phim VietSub | Phim Online",
  description: "PhimChill - Phim mới nhanh nhẩt",
};

const Page = async () => {
  void trpc.movie.getTopNew.prefetch({
    limit: 16,
  });
  void trpc.movie.getTopViewByTime.prefetch({
    page: 1,
    type: "weekly",
    limit: 16,
  });
  void trpc.movie.getAllByType.prefetch({
    page: 1,
    limit: 16,
    type:'phim-le'
  });
  void trpc.movie.getAllByType.prefetch({
    page: 1,
    limit: 16,
    type:'phim-bo'
  });
   void trpc.movie.getAllByType.prefetch({
    page: 1,
    limit: 16,
    type:'hoat-hinh'
  });
  return (
    <HydrateClient>
      <MovieView></MovieView>
    </HydrateClient>
  );
};

export default Page;
