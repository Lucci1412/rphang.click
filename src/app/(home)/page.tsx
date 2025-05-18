import MovieView from "@/modules/movie/ui/views/movie-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Trang Chủ - PhimChill | Xem Phim Mới Miễn Phí",
  description:
    "PhimChill - cập nhật phim mới nhất, hot nhất. Xem phim chiếu rạp, phim bộ miễn phí chất lượng cao.",
};

const Page = async () => {
  // void trpc.movie.getTopViewByTime.prefetch({
  //   limit: 5,
  // });
  void trpc.movie.getAllByType.prefetch({
    limit: 5,
    type: "single",
  });
  void trpc.movie.getTopViewByTime.prefetch({
    page: 1,
    type: "day",
    limit: 10,
  });
  return (
    <HydrateClient>
      <MovieView></MovieView>
    </HydrateClient>
  );
};

export default Page;
