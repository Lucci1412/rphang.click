import Link from "next/link";
import { Star } from "lucide-react";
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
  rating,
  className,
  slug,
}: MovieCardProps) {
  return (
    <Link href={`/phim/${slug}-${year}-vietsub`} className={cn(className)}>
      <Card className="overflow-hidden transition-all hover:scale-105 hover:shadow-lg py-0 gap-0">
        <div className="aspect-[2/3] relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title ?? ""}
            className="h-full w-full object-cover"
            height={450}
            width={300}
            quality={50}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 opacity-0 transition-opacity hover:opacity-100">
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span>{rating}</span>
            </div>
          </div>
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
