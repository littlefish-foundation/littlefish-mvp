import { useState, useEffect } from "react";
import axios from "axios";

function useFetchByActionType(url, queryFilter) {
  const [actionsByType, setActionsByType] = useState(null);
  const [loadingActionsByType, setLoadingActionsByType] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingActionsByType(true);
    axios
      .get(url)
      .then((response) => {
        setActionsByType(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingActionsByType(false);
      });
  }, [url]);

  return { actionsByType, loadingActionsByType, error };
}

export default useFetchByActionType;
