import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

interface MovieDescriptionProps {
  description: string | "";
}

export const MovieDescription = ({ description }: MovieDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded((current) => !current)}
      // className="bg-secondary/50 rounded-xl p-3 cursor-pointer hover:bg-secondary/70 transition"
    >
      <div className="relative">
        <div
          className={cn(
            "text-sm whitespace-pre-wrap",
            !isExpanded && "line-clamp-2"
          )}
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
        <div className="flex items-center gap-1 mt-4 text-sm font-medium cursor-pointer">
          {isExpanded ? (
            <>
              Thu gọn <ChevronUpIcon className="size-4" />
            </>
          ) : (
            <>
              Xem thêm <ChevronDownIcon className="size-4" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
