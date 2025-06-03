import { PAGE_LIMIT } from "@/const";
import { metaDataCustom } from "@/lib/meta-data-custom";
import { ActorMovieView } from "@/modules/actor/ui/views/actor-movie-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/dien-vien/${slug}`;
  const [category] = await trpc.category.getBySlug({ slug });
  return metaDataCustom(url, `Sex ${category.name} VLXX`);
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  await trpc.movie.getMovieByActor.prefetch({
    actor: slug,
    page: 1,
    limit: PAGE_LIMIT,
  });
  return (
    <HydrateClient>
      <ActorMovieView actor={slug}></ActorMovieView>
    </HydrateClient>
  );
};

export default Page;
