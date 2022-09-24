import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [NFT__DATA, setNFT__DATA] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, {
        params: { limit: 10 },
      })
      .then((response) => {
        console.log(response.data);
        setNFT__DATA(response.data);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { NFT__DATA, loading, error };
}
export default useFetch;
