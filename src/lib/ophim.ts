interface OphimResponse {
  status: boolean;
  items: Array<{
    _id: string;
    name: string;
    origin_name: string;
    thumb_url: string;
    slug: string;
    year: number;
    poster_url: string;
    tmdb?: {
      type: string;
      id: string;
      season: number | null;
      vote_average: number;
      vote_count: number;
    };
    imdb?: {
      id: string;
    };
    modified?: {
      time: string;
    };
  }>;
}

export async function getOphimSlugs(page: number = 1): Promise<string[]> {
  try {
    const response = await fetch(
      `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: OphimResponse = await response.json();

    // Lấy ra array của slugs
    const slugs = data.items.map((item) => item.slug);

    return slugs;
  } catch (error) {
    console.error("Error fetching Ophim data:", error);
    return [];
  }
}


