import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { FrownIcon } from "lucide-react";

interface NoMoviesFoundProps {
  search?: string;
}

const NoMoviesFound = ({ search }: NoMoviesFoundProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8 rounded-lg w-full ">
        <h2 className="text-2xl font-semibold mb-4">
          {search ? (
            <div className="flex flex-row justify-center">
              {" "}
              Không tìm thấy phim nào cho &quot;{search}&quot;
              <FrownIcon className="h-8 w-8  text-yellow-600 ml-2.5 " />
            </div>
          ) : (
            <div className="flex flex-row justify-center">
              Không tìm thấy phim nào{" "}
              <FrownIcon className="h-8 w-8 text-yellow-600 ml-2.5 " />
            </div>
          )}
        </h2>
        <p className="mt-4 text-lg mb-6">
          Hãy thử tìm kiếm lại với từ khóa khác hoặc quay về trang chủ.
        </p>
        <Link href="/">
          <Button variant="default" className=" max-w-xs mx-auto">
            Quay về Trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoMoviesFound;
