import { PAGE_LIMIT } from "@/const";
import { MovieList } from "@/modules/list/ui/view/movie-type-list";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ episode: string; slug: string }>;
}
const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  void trpc.movie.getAllByType.prefetch({
    type: slug,
    page: 1,
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <MovieList type={slug}></MovieList>
    </HydrateClient>
  );
};
export default Page;
