import { useState, useEffect } from "react";
import axios from "axios";

function useGetSearchOwnerName(url, query) {
  const [actionSearched, setActionSearched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get(url, {
        params: { ownerName: query },
      })

      .then((response) => {
        setActionSearched(response.data);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, query]);

  return { actionSearched, loading, error };
}
export default useGetSearchOwnerName;