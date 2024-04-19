export const getImagesByUsername = async (username, page) => {
  try {
    const responseA = await fetch(
      `https://civitai.com/api/v1/images?username=${username}&page=${page}&limit=12`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIVIT_API}`,
        },
      }
    );

    const dataA = await responseA.json();

    const filteredResponse = dataA.items.map((item) => ({
      id: item.id,
      url: item.url,
      width: item.width,
      height: item.height,
      meta: item.meta,
    }));

    return { data: filteredResponse };
  } catch (err) {
    console.log(err);
  }
};

export const downloadImage = async (imageId, imageUrl) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/downloadImage?imageName=${imageId}&imageUrl=${imageUrl}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download image");
    }

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
