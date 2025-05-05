export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-center text-white py-6">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2 text-3xl font-bold">
          <span className="text-red-600">Phim Chill</span>
          <span>
            TV<sup>+</sup>
          </span>
        </div>

        <p className="text-sm text-gray-300">
          Copyright © 2025 Phim Chill All Rights Reserved.
        </p>
        <p className="text-sm text-gray-300">
          Email:{" "}
          <a
            href="mailto:cubebaothu@gmail.com"
            className="underline hover:text-white"
          >
            cubebaothu@gmail.com
          </a>
        </p>
        <p className="text-sm text-gray-300 text-center max-w-xl">
          Đối với các vấn đề về bản quyền, vui lòng liên hệ qua email này. Chúng
          tôi sẽ tiến hành gỡ bỏ nội dung đó một cách nhanh chóng.
        </p>
      </div>
    </footer>
  );
}
