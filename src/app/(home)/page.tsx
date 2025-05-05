import MovieView from "@/modules/movie/ui/views/movie-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Trang Chủ - Vietube | Xem Phim Mới Miễn Phí",
  description:
    "Vietube - cập nhật phim mới nhất, hot nhất. Xem phim chiếu rạp, phim bộ miễn phí chất lượng cao.",
};

const Page = async () => {
  void trpc.movie.getAllByType.prefetch({
    type: "series",
    page: 1,
    limit: 20,
  });
  void trpc.movie.getAllByType.prefetch({
    type: "single",
    page: 1,
    limit: 20,
  });
  void trpc.movie.getAllByType.prefetch({
    type: "hoathinh",
    page: 1,
    limit: 20,
  });
  void trpc.movie.getAllByType.prefetch({
    type: "tvshows",
    page: 1,
    limit: 20,
  });
  void trpc.movie.getMovieHot.prefetch({
    limit: 5,
  });
  return (
    <HydrateClient>
      <MovieView></MovieView>
    </HydrateClient>
  );
};

export default Page;
