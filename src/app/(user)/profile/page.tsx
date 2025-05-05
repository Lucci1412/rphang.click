import ProfileView from "@/modules/profile/ui/views/profile-view";
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <ProfileView></ProfileView>
    </HydrateClient>
  );
};

export default Page;
