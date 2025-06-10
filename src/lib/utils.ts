import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeFirstTwoWords=(str:string,number:number )=> {
  return str.split("-").slice(number).join("-");
}
export const slugToTitle=(slug:string)=> {
  return slug
    .split('-') // Tách chuỗi thành các từ
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa từng từ
    .join(' '); // Nối lại thành chuỗi tiêu đề
}