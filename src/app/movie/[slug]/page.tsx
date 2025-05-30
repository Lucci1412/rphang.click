// import { metaDataCustom } from "@/lib/meta-data-custom";
import MoviePlayerView from "@/modules/movie-detail/ui/view/movie-player-view";
import { trpc } from "@/trpc/server";
// import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}
// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug, episode } = await params;
//   const maxLength = 200;
//   const parts = slug.split("-");
//   const name = parts.slice(0, -2).join("-");
//   const partsEpisode = episode.split("-");
//   const episodeName = partsEpisode[1];
//   const url = `${process.env.NEXT_PUBLIC_SITE_URL}/xem/${slug}/${episode}`;

//   const dataMovie = await trpc.movieDetail.getBySlugNoEposide({ slug: name });
//   const title = `Phim ${dataMovie.origin_name} ${dataMovie.year} Tập ${episodeName} VietSub + Thuyết Minh`;
//   let limitedContent = dataMovie.content ?? "";

//   if (Number(limitedContent.length) > maxLength) {
//     limitedContent = limitedContent.slice(0, maxLength) + "...";
//   }
//   return metaDataCustom(
//     url,
//     title,
//     limitedContent,
//     dataMovie.thumb_url || "/images/logo_share.jpg"
//   );
// }
const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  void trpc.movieDetail.getBySlug.prefetch({ slug: slug });
 
  return <MoviePlayerView slug={slug}  />;
};

export default Page;
