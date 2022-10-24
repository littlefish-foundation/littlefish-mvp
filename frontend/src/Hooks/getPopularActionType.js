import { useState, useEffect } from "react";
import axios from "axios";
import { LITTLEFISH_API_URL } from "../config.json";

function useFetchForPopularActionType() {
  const url = `${LITTLEFISH_API_URL}/action-type/popular`;

  const [popularActionType, setPopularActionType] = useState([]);
  const [loadingPopularActionType, setLoadingPopularActionType] =
    useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingPopularActionType(true);
    axios
      .get(url, { params: { limit: 8 } })
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
