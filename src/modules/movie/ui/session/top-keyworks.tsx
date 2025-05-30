import Link from "next/link";
import React from "react";

const TopKeywords = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Top từ khóa</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            "Bo Chong Hang Dau",
            "Xuat Tinh",
            "Suzu Honjo",
            "Da Den",
            "Me Ban Than",
            "Bu Voi Co",
            "Ban Than",
            "Con Trai",
            "Mei Itsukaichi",
            "Azumi Mizushima Khong Che",
            "Kana Momonogi",
            "Yume Nishimiya",
            "Cong Tac",
            "Riri Nanatsumori",
            "Loan Luan",
            "Me Cha Ban Gai",
            "Bai Qua Tang Con",
            "Len Du Me",
            "Em Chi Dau Yeu Tom",
            "Y Ta",
            "Pham Loan Luan",
            "Me Con",
            "Em Nu Sinh",
            "Bo Chong",
            "Bo Chong",
          ].map((keyword, index) => (
            <Link
              key={index}
              href={`/tag/${keyword.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-gray-800 hover:bg-red-600 px-3 py-1 rounded text-xs transition-colors"
            >
              {keyword}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopKeywords;
