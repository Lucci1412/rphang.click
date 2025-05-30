import Image from "next/image";
import Link from "next/link";
import React from "react";

const ListRelated = () => {
  const relatedMovies = [
    {
      id: 1,
      title: "Không ai chịu nổi sức hút của cô ấy",
      duration: "42:15",
      views: "1.2M",
    },
    {
      id: 2,
      title: "Vụng trộm với người yêu cũ trong khách sạn",
      duration: "38:30",
      views: "890K",
    },
    {
      id: 3,
      title: "Bố gái bố sướng không?",
      duration: "45:20",
      views: "2.1M",
    },
    {
      id: 4,
      title: "Đàm mỹ gái nào và anh tử trường may mắn",
      duration: "41:08",
      views: "1.5M",
    },
    {
      id: 5,
      title: "Vợ đau lưng, chồng thuê người về massage đến nhà cái kết",
      duration: "47:33",
      views: "980K",
    },
    {
      id: 6,
      title: "Vụng trộm với đồng nghiệp của chồng",
      duration: "35:42",
      views: "1.8M",
    },
    { id: 7, title: "Có ý tứ yêu nghệ", duration: "43:17", views: "1.3M" },
    {
      id: 8,
      title: "Đi du lịch, hút cô vợ say xỉn đi... chồng cho thôi",
      duration: "39:55",
      views: "2.3M",
    },
  ];
  return (
    <div>
      <div className="mt-12">
        <h2 className="text-lg font-bold mb-6">Có thể bạn sẽ thích</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {relatedMovies.slice(0, 10).map((movie) => (
            <Link
              key={movie.id}
              href={`/play/${movie.id + 100}`}
              className="group"
            >
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=180&width=320&text=Related+${movie.id}`}
                  alt={movie.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-red-600 text-xs px-2 py-1 rounded">
                    Vietsub
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="bg-black/70 text-xs px-2 py-1 rounded">
                    {movie.duration}
                  </span>
                </div>
              </div>
              <h3 className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-red-500">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {movie.views} lượt xem
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListRelated;
