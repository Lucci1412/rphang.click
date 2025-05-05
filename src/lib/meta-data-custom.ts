export const metaDataCustom = (
  url: string,
  title: string,
  description?: string,
  imageUrl?: string
) => {
  const desc =
    description ||
    `Xem ${title} miễn phí tại Vietube. Cập nhật phim hằng ngày nhanh nhất, chất lượng HD.`;

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
