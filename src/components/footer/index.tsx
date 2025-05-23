import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Phim Mới */}
        <div>
          <h4 className="text-orange-500 font-bold mb-2">Phim Mới</h4>
          <ul>
            {/* <li><Link href="#" className="hover:underline">Phim chiếu rạp</Link></li> */}
            <li>
              <Link href="/list/phim-le" className="hover:underline">
                Phim lẻ hay
              </Link>
            </li>
            <li>
              <Link href="/list/phim-bo" className="hover:underline">
                Phim bộ hay
              </Link>
            </li>
            <li>
              <Link href="/list/hoat-hinh" className="hover:underline">
                Phim hoạt hình hay
              </Link>
            </li>
            <li>
              <Link href="/list/tv-shows" className="hover:underline">
                TV Shows hay
              </Link>
            </li>
          </ul>
        </div>

        {/* Phim Hay */}
        <div>
          <h4 className="text-orange-500 font-bold mb-2">Phim Hay</h4>
          <ul>
            <li>
              <Link href="/quoc-gia/au-my" className="hover:underline">
                Phim Mỹ
              </Link>
            </li>
            <li>
              <Link href="/quoc-gia/han-quoc" className="hover:underline">
                Phim Hàn Quốc
              </Link>
            </li>
            <li>
              <Link href="/quoc-gia/trung-quoc" className="hover:underline">
                Phim Trung Quốc
              </Link>
            </li>
            <li>
              <Link href="/quoc-gia/viet-nam" className="hover:underline">
                Phim Việt Nam
              </Link>
            </li>
          </ul>
        </div>

        {/* Phim Hot */}
        <div>
          <h4 className="text-orange-500 font-bold mb-2">Phim Hay</h4>
          <ul>
            <li>
              <Link href="/the-loai/hanh-dong" className="hover:underline">
                Phim Hành Động
              </Link>
            </li>
            <li>
              <Link href="/the-loai/co-trang" className="hover:underline">
                Phim Cổ Trang
              </Link>
            </li>

            <li>
              <Link href="/the-loai/tinh-cam" className="hover:underline">
                Phim Tình Cảm
              </Link>
            </li>
            <li>
              <Link href="/the-loai/kinh-di" className="hover:underline">
                Phim Ma Kinh Dị
              </Link>
            </li>
          </ul>
        </div>

        {/* Thông tin */}
        <div>
          <h4 className="text-orange-500 font-bold mb-2">Thông tin</h4>
          <ul>
            <li>
              <Link href="/sitemap_index.xml" className="hover:underline">
                Sitemap
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-sm">© 2025 PhimChill.Online</p>
        </div>
      </div>
    </footer>
  );
}
