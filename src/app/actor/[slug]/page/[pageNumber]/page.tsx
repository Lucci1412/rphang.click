import { PAGE_LIMIT } from "@/const";
import { CategoryMovieView } from "@/modules/category/ui/views/category-movie-view";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ pageNumber: string; slug: string }>;
}
const Page = async ({ params }: PageProps) => {
  const { slug, pageNumber } = await params;

  void trpc.movie.getMovieByCategory.prefetch({
    category: slug,
    page: Number(pageNumber),
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <CategoryMovieView
        category={slug}
        page={Number(pageNumber)}
      ></CategoryMovieView>
    </HydrateClient>
  );
};
export default Page;
