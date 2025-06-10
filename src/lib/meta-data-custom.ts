export const metaDataCustom = (
  url: string,
  title: string,
  description?: string,
  imageUrl?: string
) => {
  const desc =
    description ||
    `Tuyển chọn phim sex ${title} vietsub 18+ chất lượng cao. VLXX cập nhật mỗi ngày các phim người lớn Việt Nam, Nhật Bản, Châu Âu hot nhất hiện nay.
`;

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
