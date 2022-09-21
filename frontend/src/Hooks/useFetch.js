import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [NFT__DATA, setNFT__DATA] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, { params: { limit: 20 } })
      .then((response) => {
        setNFT__DATA(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { NFT__DATA, loading, error };
}
export default useFetch;
