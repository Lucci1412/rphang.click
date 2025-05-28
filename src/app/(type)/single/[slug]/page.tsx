import MovieDetailView from "@/modules/movie-detail/ui/view/movie-detail-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";
import { Metadata } from "next";
import { metaDataCustom } from "@/lib/meta-data-custom";

interface PageProps {
  params: Promise<{ typeName: string; slug: string }>;
}

// Generate metadata for the movie page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {

  const { slug, typeName } = await params;
  const parts = slug.split("-");
  const name = parts.slice(0, -2).join("-");
  const dataMovie = await trpc.movieDetail.getBySlugNoEposide({ slug: name });
  const title = `Xem ${dataMovie.origin_name} ${dataMovie.year} HD `;
  const url = ` ${process.env.NEXT_PUBLIC_SITE_URL}/${typeName}/${dataMovie.slug}-${dataMovie.quality}-${dataMovie.year}`;

  const content = `Phim ${dataMovie.name} (${
    dataMovie.origin_name ?? ""
  }) phát hành năm ${
    dataMovie.year
  }, thể loại phim lẻ, diễn viên: ${dataMovie.actor
    .slice(0, 3)
    .join(", ")}, chất lượng ${dataMovie.quality ?? "HD"}, ngôn ngữ ${
    dataMovie.lang ?? "không rõ"
  }.`;

  return metaDataCustom(
    url,
    title,
    content,
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
