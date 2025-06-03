import { metaDataCustom } from "@/lib/meta-data-custom";
import MoviePlayerView from "@/modules/movie-detail/ui/view/movie-player-view";
import { trpc } from "@/trpc/server";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/phim/${slug}`;

  const dataMovie = await trpc.movieDetail.getBySlugNoEposide({ slug });
  const title = `${dataMovie.name} - vlxx `;

  return metaDataCustom(
    url,
    title,
    dataMovie.content ?? "",
    dataMovie.thumb_url || "/images/logo_share.jpg"
  );
}
const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  void trpc.movieDetail.getBySlug.prefetch({ slug });
  void trpc.movie.getTopNew.prefetch({ limit: 10 });

  return <MoviePlayerView slug={slug} />;
};

export default Page;
