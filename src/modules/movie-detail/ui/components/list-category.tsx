/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";
interface Props {
  categories: any;
}
const ListCategory = ({ categories }: Props) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((item: any, index: any) => {
          return (
            <Link key={index} href={`/the-loai/${item.category.slug}`}>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                {item.category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ListCategory;
