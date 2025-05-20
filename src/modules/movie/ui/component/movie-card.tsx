import Link from "next/link";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  image: string;
  year: string;
  rating: string;
  className?: string;
  slug: string;
}

export default function MovieCard({
  title,
  image,
  year,
  className,
  slug,
}: MovieCardProps) {
  return (
    <Link href={`/phim/${slug}-${year}-vietsub`} className={cn(className)}>
      <Card className="overflow-hidden transition-all hover:scale-105 hover:shadow-lg py-0 gap-0 h-[280px] rounded-sm">
        <div className="aspect-[2/3] relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title ?? ""}
            className="h-full w-full object-cover "
            height={280}
            width={200}
            quality={50}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity hover:opacity-100" />
        </div>
        <CardContent className="p-2 sm:p-3">
          <h3 className="text-sm sm:text-base font-medium line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">{year}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
