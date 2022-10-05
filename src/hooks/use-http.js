import { useCallback } from "react";

export const DOMAIN = `https://portfoliobackenddamian.herokuapp.com/api/v1`;

const useHttp = () => {
  const sendRequest = useCallback(async (fetchOptions) => {
    try {
      const response = await fetch(`${DOMAIN}/${fetchOptions.url}`, {
        method: fetchOptions.method ? fetchOptions.method : "GET",
        body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
        headers: fetchOptions.headers ? fetchOptions.headers : null,
      });

      if (response.status === 204) return;
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  return { sendRequest };
};

export default useHttp;
