import { PAGE_LIMIT } from "@/const";
import { metaDataCustom } from "@/lib/meta-data-custom";
import { CategoryMovieView } from "@/modules/category/ui/views/category-movie-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/the-loai/${slug}`;
  const [country] = await trpc.country.getBySlug({ slug });
  return metaDataCustom(url, `Sex ${country.name} VLXX`);
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  await trpc.movie.getMovieByCountry.prefetch({
    country: slug,
    page: 1,
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <CategoryMovieView category={slug}></CategoryMovieView>
    </HydrateClient>
  );
};

export default Page;
