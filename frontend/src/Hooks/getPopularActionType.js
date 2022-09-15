import { useState, useEffect } from "react";
import axios from "axios";

function useFetchForPopularActionType(url) {
  const [popularActionType, setPopularActionType] = useState(null);
  const [loadingPopularActionType, setLoadingPopularActionType] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingPopularActionType(true);
    axios
      .get(url)
      .then((response) => {
        setPopularActionType(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingPopularActionType(false);
      });
  }, [url]);

  return { popularActionType, loadingPopularActionType, error };
}

export default useFetchForPopularActionType;
