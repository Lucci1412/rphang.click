import MovieDetailView from "@/modules/movie-detail/ui/view/movie-detail-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";
import { Metadata } from "next";
import { metaDataCustom } from "@/lib/meta-data-custom";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for the movie page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const maxLength = 200;

  const { slug } = await params;
  const url = ` ${process.env.NEXT_PUBLIC_SITE_URL}/phim/${slug}`;
  const parts = slug.split("-");
  const name = parts.slice(0, -2).join("-");
  const dataMovie = await trpc.movieDetail.getBySlugNoEposide({ slug: name });
  const title = `Phim ${dataMovie.name} ${dataMovie.year} FulL VietSub + Thuyết Minh `;
  let limitedContent = dataMovie.content ?? "";

  if (Number(limitedContent.length) > maxLength) {
    limitedContent = limitedContent.slice(0, maxLength) + "...";
  }

  return metaDataCustom(
    url,
    title,
    limitedContent,
    dataMovie.thumb_url ?? "/images/logo_share.jpg"
  );
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const parts = slug.split("-");
  const name = parts.slice(0, -2).join("-");
  void trpc.movieDetail.getBySlug.prefetch({ slug: name });
  void trpc.movie.getTopViewByTime.prefetch({
    page: 1,
    type: "monthly",
    limit: 10,
  });
  return (
    <HydrateClient>
      <MovieDetailView slug={name}></MovieDetailView>
    </HydrateClient>
  );
};

export default Page;
