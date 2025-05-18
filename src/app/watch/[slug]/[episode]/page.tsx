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
  const parts = slug.split("-");
  const yearIndex = parts.findIndex((part) => /^\d{4}$/.test(part));
  const name = parts.slice(0, yearIndex).join("-");
  const partsEpisode = episode.split("-");
  const episodeName = partsEpisode[1];
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/xem-phim/${slug}/${episode}`;

  const dataMovie = await trpc.movieDetail.getBySlugNoEposide({ slug:name });
  const title = `${dataMovie.name} ${dataMovie.year} Tập ${episodeName}`;
  return metaDataCustom(
    url,
    title,
    dataMovie.content ?? "",
    dataMovie.thumb_url || "/images/logo_share.jpg"
  );
}
const Page = async ({ params }: PageProps) => {
  const { episode, slug } = await params;
  const parts = slug.split("-");
  const yearIndex = parts.findIndex((part) => /^\d{4}$/.test(part));
  const name = parts.slice(0, yearIndex).join("-");
  const partsEpisode = episode.split("-");
  const episodeName = partsEpisode[1];
  void trpc.movieDetail.getBySlug.prefetch({ slug: name });
  return <MoviePlayerView slug={name} episodeId={episodeName} />;
};

export default Page;
