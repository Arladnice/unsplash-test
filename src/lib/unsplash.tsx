"use server";

const headers = {
  Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
};

export const getPhotos = async (value: string, page: number) => {
  const url = new URL(
    `https://api.unsplash.com/search/photos?client_id=T7nCAf_aVelQVpRStBGzqTEf8seBbeMNuw5_0dcFvRI&query=snow&page=${page}`
  );

  url.searchParams.set("per_page", "9");
  url.searchParams.set("order_by", "popular");
  url.searchParams.set("query", value);

  const response = await fetch(url);

  return response.json();
};

export const getPhoto = async (id: string) => {
  return await fetch(`https://api.unsplash.com/photos/${id}`, {
    headers,
  });
};
