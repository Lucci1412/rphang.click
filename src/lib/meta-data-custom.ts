export const metaDataCustom = (
  url: string,
  title: string,
  description?: string,
  imageUrl?: string
) => {
  const desc =
    description ||
    `Xem ${title} PhimChillMoi. Cập nhật phim hằng ngày nhanh nhất, chất lượng HD Full Vietsub + Thuyết Minh.`;

  return {
    title: `${title}`,
    description: desc,
    openGraph: {
      title: `${title}`,
      description: desc,
      images: [
        {
          url: imageUrl ?? "/images/logo_share.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "video.movie",
      url: url,
    },
    icon: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  };
};
