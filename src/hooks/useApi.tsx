import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

const useApi = (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body = null,
  dependencies = []
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient({
          url: endpoint,
          method: method,
          data: body,
        });
        setData(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, method, body, ...dependencies]);

  return { data, error, loading };
};

export default useApi;
