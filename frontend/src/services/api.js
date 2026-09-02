// Thin wrapper around fetch for talking to the backend API.
// Every product used on screen comes from these calls — nothing is hardcoded.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`);
  } catch {
    throw new ApiError(
      "Could not reach the server. Check your connection and try again.",
      0
    );
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    // Non-JSON response body; leave body as null.
  }

  if (!response.ok) {
    throw new ApiError(
      body?.message || "Something went wrong while loading data.",
      response.status
    );
  }

  return body?.data;
}

export function getProducts() {
  return request("/products");
}

export function getProductBySlug(slug) {
  return request(`/products/${slug}`);
}

export { ApiError };
