/* eslint-disable @typescript-eslint/no-explicit-any */
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
            <span key={index} className="bg-gray-800 px-2 py-1 rounded text-xs">
              {item.category.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ListCategory;
