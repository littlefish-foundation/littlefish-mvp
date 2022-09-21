import { useState, useEffect } from "react";
import axios from "axios";

function useGetSearchOwnerName(url, query) {
  const [actionSearched, setActionSearched] = useState([]);
  const [loadingByOwner, setLoadingByOwner] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingByOwner(true);

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
        setLoadingByOwner(false);
      });
  }, [url, query]);

  return { actionSearched, loadingByOwner, error };
}
export default useGetSearchOwnerName;
