import { MovieList } from "@/modules/list/ui/view/movie-type-list";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ pageNumber: string; slug: string }>;
}
const Page = async ({ params }: PageProps) => {
  const { slug, pageNumber } = await params;

  void trpc.movie.getAllByType.prefetch({
    type: "",
    page: Number(pageNumber),
    limit: 20,
  });
  return (
    <HydrateClient>
      <MovieList type={slug} page={Number(pageNumber)}></MovieList>
    </HydrateClient>
  );
};
export default Page;
