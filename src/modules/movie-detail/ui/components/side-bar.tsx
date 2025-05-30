import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  const relatedMovies = [
    {
      id: 1,
      slug: "Không ai chịu nổi sức hút của cô ấy",
      duration: "42:15",
      views: "1.2M",
    },
    {
      id: 2,
      slug: "Vụng trộm với người yêu cũ trong khách sạn",
      duration: "38:30",
      views: "890K",
    },
    {
      id: 3,
      slug: "Bố gái bố sướng không?",
      duration: "45:20",
      views: "2.1M",
    },
    {
      id: 4,
      slug: "Đàm mỹ gái nào và anh tử trường may mắn",
      duration: "41:08",
      views: "1.5M",
    },
    {
      id: 5,
      slug: "Vợ đau lưng, chồng thuê người về massage đến nhà cái kết",
      duration: "47:33",
      views: "980K",
    },
    {
      id: 6,
      slug: "Vụng trộm với đồng nghiệp của chồng",
      duration: "35:42",
      views: "1.8M",
    },
    { id: 7, slug: "Có ý tứ yêu nghệ", duration: "43:17", views: "1.3M" },
    {
      id: 8,
      slug: "Đi du lịch, hút cô vợ say xỉn đi... chồng cho thôi",
      duration: "39:55",
      views: "2.3M",
    },
  ];
  return (
    <div className="space-y-4">
      {relatedMovies.map((movie) => (
        <Link key={movie.id} href={`/phim/${movie.slug}`} className="block group">
          <div className="flex space-x-3">
            <div className="relative w-24 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
              <Image
                src={`/images/chuong-nhuoc-nam.jpg`}
                alt={movie.slug}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-1 left-1">
                <span className="bg-red-600 text-xs px-1 rounded">Vietsub</span>
              </div>
              <div className="absolute bottom-1 right-1">
                <span className="bg-black/70 text-xs px-1 rounded">
                  {movie.duration}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2 group-hover:text-red-500">
                {movie.slug}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {movie.views} lượt xem
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
