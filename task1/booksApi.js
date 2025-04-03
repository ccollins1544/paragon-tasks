const baseUrl = process.env.BASE_URL;

export const searchBook = async (title) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    title,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const endpoint = `${baseUrl}/books/search`;
  return await fetch(endpoint, requestOptions)
    .then(async (response) => {
      const contentType = response.headers.get("content-type");
      let data = null;
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      return data;
    })
    .catch((error) => {
      console.error(`Error fetching data at endpoint: ${endpoint}`, error);
      return { error: "Book not found" };
    });
};

const booksApi = {
  searchBook,
};

export default booksApi;
