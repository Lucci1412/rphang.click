import { PAGE_LIMIT } from "@/const";
import { metaDataCustom } from "@/lib/meta-data-custom";
import { removeFirstTwoWords, slugToTitle } from "@/lib/utils";
import { CountryMovieView } from "@/modules/country/ui/views/country-movie-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugEdit = removeFirstTwoWords(slug, 2);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/quoc-gia/${slug}`;
  const [country] = await trpc.country.getBySlug({ slug: slugEdit });
  return metaDataCustom(
    url,
    `VLXX - Tuyển Chọn Phim Sex ${slugToTitle(country.name)} Vietsub 18+ Mới Nhất
`
  );
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const slugEdit = removeFirstTwoWords(slug, 2);
  await trpc.movie.getMovieByCountry.prefetch({
    country: slugEdit,
    page: 1,
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <CountryMovieView country={slugEdit}></CountryMovieView>
    </HydrateClient>
  );
};

export default Page;
