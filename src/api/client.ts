import { ApiError } from "../models/Error";

const _baseUrl = "https://dummyjson.com";

async function apiRequest(endpoint: string, options?: RequestInit) {
  const url = `${_baseUrl}/${endpoint}`;

  const config: RequestInit = {
    headers: {
      "content-type": "application/json",
      ...options?.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error: ApiError = new Error(
      `API request failed with status ${response.status}`
    );
    error.status = response.status;
    error.data = await response.json().catch(() => null);
    throw error;
  }

  return response.json();
}

export function get(endpoint: string, options?: RequestInit) {
  return apiRequest(endpoint, {
    method: "GET",
    ...options,
  });
}

//here data can be any because we just pass it through as body
export function post(endpoint: string, data: any, options = {}) {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  });
}

export function put(endpoint: string, data: any, options = {}) {
  return apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
    ...options,
  });
}

export function del(endpoint: string, options = {}) {
  return apiRequest(endpoint, {
    method: "DELETE",
    ...options,
  });
}
