import { useState, useEffect } from "react";
import axios from "axios";

function useGetSearchAssetName(url, searchQuery) {
  const [actionSearchedByName, setActionSearchedByName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios

      .get(url, {
        params: { assetName: searchQuery },
      })

      .then((response) => {
        setActionSearchedByName(response.data);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, searchQuery]);

  return { actionSearchedByName, loading, error };
}
export default useGetSearchAssetName;
