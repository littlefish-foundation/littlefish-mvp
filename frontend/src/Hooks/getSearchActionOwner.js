import { useState, useEffect } from "react";
import axios from "axios";

function useGetSearchOwnerName(url, searchQuery) {
  const [actionSearched, setActionSearched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      // .get("https://api.littlefish.foundation/action/", {
      //   params: { ownerName },
      // })
      .get(url, {
        params: { ownerName: searchQuery, assetName: searchQuery },
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
  }, [url, searchQuery]);

  return { actionSearched, loading, error };
}
export default useGetSearchOwnerName;
