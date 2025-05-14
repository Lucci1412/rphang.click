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
  const { slug } = await params;
  const url = ` ${process.env.NEXT_PUBLIC_SITE_URL}/xem-phim/${slug}`;

  const dataMovie = await trpc.movieDetail.getBySlugNoEposide({ slug });
  const title = `${dataMovie.name} - ${dataMovie.origin_name}`;

  return metaDataCustom(
    url,
    title,
    dataMovie.content ?? "",
    dataMovie.thumb_url ?? "/images/logo_share.jpg"
  );
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  void trpc.movieDetail.getBySlug.prefetch({ slug });

  return (
    <HydrateClient>
      <MovieDetailView slug={slug}></MovieDetailView>
    </HydrateClient>
  );
};

export default Page;
