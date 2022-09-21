import { useState, useEffect } from "react";
import axios from "axios";

function useGetSearchAssetName(url, searchQuery) {
  const [actionSearchedByName, setActionSearchedByName] = useState([]);
  const [loadingActionByName, setLoadingActionByName] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingActionByName(true);

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
        setLoadingActionByName(false);
      });
  }, [url, searchQuery]);

  return { actionSearchedByName, loadingActionByName, error };
}
export default useGetSearchAssetName;
