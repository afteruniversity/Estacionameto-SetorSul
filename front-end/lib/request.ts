// lib/request.ts

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

class RequestError extends Error implements ApiError {
  status?: number;
  data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = "RequestError";
    this.status = status;
    this.data = data;
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Global request function with error handling, timeout, and automatic JSON parsing
 */
export async function request<T = any>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<T> {
  const {
    params,
    timeout = 30000,
    headers: customHeaders,
    ...restConfig
  } = config;

  // Build URL with query parameters
  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  // Default headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...restConfig,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle non-OK responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }

      throw new RequestError(
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData,
      );
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (!contentType || response.status === 204) {
      return {} as T;
    }

    // Parse JSON response
    if (contentType.includes("application/json")) {
      return await response.json();
    }

    // Return text for non-JSON responses
    return (await response.text()) as unknown as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof RequestError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new RequestError("Request timeout", 408);
      }
      throw new RequestError(error.message);
    }

    throw new RequestError("An unknown error occurred");
  }
}

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "GET" }),

  post: <T = any>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T = any>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T = any>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T = any>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "DELETE" }),
};

// Usage example:
//
// import { api } from '@/lib/request';
//
// // GET request
// const users = await api.get('/users', { params: { page: 1 } });
//
// // POST request
// const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' });
//
// // With custom headers
// const data = await api.get('/protected', {
//   headers: { Authorization: `Bearer ${token}` }
// });
//
// // Error handling
// try {
//   const data = await api.get('/endpoint');
// } catch (error) {
//   if (error instanceof RequestError) {
//     console.error(`Error ${error.status}: ${error.message}`);
//   }
// }
