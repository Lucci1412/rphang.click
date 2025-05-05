"use client";

import Link from "next/link";

export default function NotFoundContent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Không tìm thấy trang</h2>
      <p className="text-gray-600 mb-4">
        Trang bạn đang tìm kiếm không tồn tại.
      </p>
      <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
        Quay về trang chủ
      </Link>
    </div>
  );
}
