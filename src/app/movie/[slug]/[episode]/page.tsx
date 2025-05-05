import { metaDataCustom } from "@/lib/meta-data-custom";
import MoviePlayerView from "@/modules/movie-detail/ui/view/movie-player-view";
import { trpc } from "@/trpc/server";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ episode: string; slug: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, episode } = await params;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/phim/${slug}/${episode}`;

  const dataMovie = await trpc.movieDetail.getBySlugNoEposide({ slug });
  const title = `${dataMovie.name} Tập ${episode}`;
  return metaDataCustom(
    url,
    title,
    dataMovie.content ?? "",
    dataMovie.thumb_url || "/images/logo_share.jpg"
  );
}
const Page = async ({ params }: PageProps) => {
  const { episode, slug } = await params;
  
  void trpc.movieDetail.getBySlug.prefetch({ slug: slug });
  return <MoviePlayerView slug={slug} episodeId={episode} />;
};

export default Page;
