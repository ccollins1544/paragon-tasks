const baseUrl = process.env.BASE_URL || "https://ejditq67mwuzeuwrlp5fs3egwu0yhkjz.lambda-url.us-east-2.on.aws/api";
const myHeaders = new Headers({
  "Content-Type": "application/json",
});
const defaultRequestOptions = {
  headers: myHeaders,
  redirect: "follow",
};

// Default TTL: 24 hours in milliseconds
const DEFAULT_TTL_HOURS = process.env.DEFAULT_TTL_HOURS || 24;
const DEFAULT_TTL_MINUTES = process.env.DEFAULT_TTL_MINUTES || 0;
const DEFAULT_TTL_SECONDS = process.env.DEFAULT_TTL_SECONDS || 0;
export const DEFAULT_TTL =
  DEFAULT_TTL_HOURS * 60 * 60 * 1000 + DEFAULT_TTL_MINUTES * 60 * 1000 + DEFAULT_TTL_SECONDS * 1000;

// Cache storage with expiration tracking
const cache = new Map();

// CLEAN_EXPIRED_CACHE_INTERVAL: Clear expired cache entries periodically
const CLEAN_EXPIRED_CACHE_INTERVAL_HOURS = process.env.CLEAN_EXPIRED_CACHE_INTERVAL_HOURS || 1;
const CLEAN_EXPIRED_CACHE_INTERVAL_MINUTES = process.env.CLEAN_EXPIRED_CACHE_INTERVAL_MINUTES || 0;
const CLEAN_EXPIRED_CACHE_INTERVAL_SECONDS = process.env.CLEAN_EXPIRED_CACHE_INTERVAL_SECONDS || 0;
export const CLEAN_EXPIRED_CACHE_INTERVAL =
  CLEAN_EXPIRED_CACHE_INTERVAL_HOURS * 60 * 60 * 1000 +
  CLEAN_EXPIRED_CACHE_INTERVAL_MINUTES * 60 * 1000 +
  CLEAN_EXPIRED_CACHE_INTERVAL_SECONDS * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache) {
    if (now - value.timestamp >= DEFAULT_TTL) {
      cache.delete(key);
      // console.log(`Cleaned expired cache for ${key}`);
    }
  }
}, CLEAN_EXPIRED_CACHE_INTERVAL);

export const searchBook = async (title, ttl = DEFAULT_TTL) => {
  const cacheKey = `searchBook:${title}`; // Unique key for each title
  const now = Date.now();

  // Check cache first
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (now - cached.timestamp < ttl) {
      // console.log(`Cache hit for ${cacheKey}`);
      return cached.data; // Return cached data if not expired
    } else {
      // console.log(`Cache expired for ${cacheKey}`);
      cache.delete(cacheKey); // Remove expired entry
    }
  }

  const raw = JSON.stringify({
    title,
  });
  const requestOptions = {
    ...defaultRequestOptions,
    method: "POST",
    body: raw,
  };

  const endpoint = `${baseUrl}/books/search`;
  try {
    const response = await fetch(endpoint, requestOptions);
    const contentType = response.headers.get("content-type");
    let data = null;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Store in cache with timestamp
    cache.set(cacheKey, {
      data,
      timestamp: now,
    });
    // console.log(`Cached response for ${cacheKey}`);
    return data;
  } catch (error) {
    console.error(`Error fetching data at endpoint: ${endpoint}`, error);
    return { error: "Book not found" };
  }
};

export const getBookAuthors = async (authorId, ttl = DEFAULT_TTL) => {
  const cacheKey = `getBookAuthors:${authorId}`; // Unique key for each authorId
  const now = Date.now();

  // Check cache first
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (now - cached.timestamp < ttl) {
      // console.log(`Cache hit for ${cacheKey}`);
      return cached.data; // Return cached data if not expired
    } else {
      // console.log(`Cache expired for ${cacheKey}`);
      cache.delete(cacheKey); // Remove expired entry
    }
  }

  const requestOptions = {
    ...defaultRequestOptions,
    method: "GET",
  };

  const endpoint = `${baseUrl}/authors/${authorId}`;
  try {
    const response = await fetch(endpoint, requestOptions);
    const contentType = response.headers.get("content-type");
    let data = null;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Store in cache with timestamp
    cache.set(cacheKey, {
      data,
      timestamp: now,
    });
    // console.log(`Cached response for ${cacheKey}`);
    return data;
  } catch (error) {
    console.error(`Error fetching data at endpoint: ${endpoint}`, error);
    return { error: "Author not found" };
  }
};

const booksApi = {
  searchBook,
  getBookAuthors,
  DEFAULT_TTL,
  CLEAN_EXPIRED_CACHE_INTERVAL,
};

export default booksApi;
