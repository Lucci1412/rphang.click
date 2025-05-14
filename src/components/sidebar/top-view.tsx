"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/trpc/client";
import Link from "next/link";

export function TopView() {
  const [activeTab, setActiveTab] = useState("daily");
  console.log(activeTab);
  return (
    <div className=" h-screen w-80  bg-background   p-2.5 xl:block hidden">
      <Tabs
        defaultValue="daily"
        className="flex h-full flex-col"
        onValueChange={setActiveTab}
      >
        <div className=" px-2 pt-2">
          <TabsList className="grid w-full grid-cols-3 ">
            <TabsTrigger className="cursor-pointer" value="daily">
              Ngày
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="weekly">
              Tuần
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="monthly">
              Tháng
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="daily" className="flex-1 overflow-hidden p-0 ">
          <ScrollArea className="h-full">
            <div className="p-2">
              <TopViewSuspense />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="weekly" className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              <TopViewSuspense />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="monthly" className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              <TopViewSuspense />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const TopViewSuspense = () => {
  const [movies] = trpc.movie.getTopView.useSuspenseQuery({
    limit: 5,
  });

  return (
    <div className="flex flex-col space-y-3">
      {movies?.map((movie, index) => (
        <Link key={index} href={`/xem-phim/${movie.slug}`}>
          <Card className="flex flex-row items-center p-2 h-[105px] overflow-hidden  cursor-pointer">
            <div className="w-[70px] h-[90px] overflow-hidden rounded-md">
              <Image
                src={movie.thumb_url ?? ""}
                alt={movie.name}
                width={70}
                height={90}
                data-loaded="false"
                onLoad={(event) => {
                  event.currentTarget.setAttribute("data-loaded", "true");
                }}
                className="data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10"
              />
            </div>

            <CardContent className="p-0 flex flex-col flex-1 space-y-2 ">
              <div className="text-sm font-semibold line-clamp-1">
                {movie.name}
              </div>
              <div className=" text-xs line-clamp-1">{movie.origin_name}</div>
              <div className="text-muted-foreground text-xs ">
                Lượt xem: {movie.view}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
