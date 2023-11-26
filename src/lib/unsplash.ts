const headers = {
  Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
};

export const getPhotos = async (value: string, page: number) => {
  const url = new URL(
    `https://api.unsplash.com/search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query=snow&page=${page}`
  );
  console.log(url);

  url.searchParams.set("per_page", "20");
  url.searchParams.set("order_by", "popular");
  url.searchParams.set("query", value);

  const response = await fetch(url, {
    headers,
  });

  return response.json();
};

export const getPhoto = async (id: string) => {
  return await fetch(`https://api.unsplash.com/photos/${id}`, {
    headers,
  });
};
