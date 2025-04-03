const baseUrl = process.env.BASE_URL;
const myHeaders = new Headers({
  "Content-Type": "application/json",
});
const defaultRequestOptions = {
  headers: myHeaders,
  redirect: "follow",
};

export const searchBook = async (title) => {
  const raw = JSON.stringify({
    title,
  });
  const requestOptions = {
    ...defaultRequestOptions,
    method: "POST",
    body: raw,
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

export const getBookAuthors = async (authorId) => {
  const requestOptions = {
    ...defaultRequestOptions,
    method: "GET",
  };

  const endpoint = `${baseUrl}/authors/${authorId}`;
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
      return { error: "Author not found" };
    });
};

const booksApi = {
  searchBook,
  getBookAuthors,
};

export default booksApi;
