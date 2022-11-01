export const fetcher = (url: string, data: any = undefined) => {
  return fetch(`/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
