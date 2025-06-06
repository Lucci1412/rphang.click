import Link from "next/link";
import { Button } from "../ui/button";
const Header = () => {
  const listCate = [
    {
      name: "Trang chủ",
      url: "/",
    },
    {
      name: "Phim sex hay",
      url: "/the-loai/khong-che",
    },
    {
      name: "Phim sex không che",
      url: "/the-loai/khong-che",
    },
    {
      name: "Phim sex vụng trộm",
      url: "/the-loai/vung-trom",
    },
    {
      name: "Phim sex hiếp dâm",
     url: "/the-loai/hiep-dam"
  
    },
    {
      name: "Sex Mỹ - Châu Âu",
      url: "/quoc-gia/chau-au",
    },
     {
      name: "Sex Việt Nam ",
      url: "/quoc-gia/viet-nam",
    },
    {
      name: "Sex Trung Quốc",
      url: "/quoc-gia/trung-quoc",
    },
    // {
    //   name: "Sex Hàn Quốc",
    //   url: "/quoc-gia/han-quoc",
    // },
  ];
  const listOrigin = [
    {
      name: "XVIDEOS",
      url: "/the-loai/xvideos",
    },
    {
      name: "XNXX",
      url: "/",
    },
    {
      name: "JAV",
      url: "/quoc-gia/nhat-banban",
    },
    {
      name: "XXX",
      url: "/",
    },
  ];
  return (
    <header className="bg-black border-b border-gray-700 hidden md:block">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-red-500 font-bold text-xl">
              VLXX69.COM
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Thể loại, diễn viên, code...</span>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex items-center flex-wrap space-x-2 space-y-2 py-3 text-sm">
          {listCate.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.url}
                className="hover:text-red-500"
              >
                <Button variant="secondary" size="sm">
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Category Tags */}
        <div className="flex items-center space-x-4 pb-2 text-xs">
          {listOrigin.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.url}
                className="hover:text-red-500"
              >
                <Button variant="secondary" size="sm">
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
