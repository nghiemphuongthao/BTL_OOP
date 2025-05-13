import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}${text}`);
  }
}

export async function apiRequest(method, url, data) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

export const getQueryFn = (options401) => {
  return async ({ queryKey }) => {
    const res = await fetch(queryKey[0], {
      credentials: "include",
    });

    if (options401 === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
      refetchOnWindowFocus: false,
      staleTime: 0,
      retry: false,
    },
    mutations: {
      retry: false, // Disable automatic retries for all mutations
      onError: (error) => {
        // Global fallback for mutation errors
        console.error('Global mutation error:', error);
      },
    },
  },
});
