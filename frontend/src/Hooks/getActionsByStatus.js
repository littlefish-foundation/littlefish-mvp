import { useState, useEffect } from "react";
import axios from "axios";

function useFetchByActionStatus(url) {
  const [actionsByStatus, setActionsByStatus] = useState(null);
  const [loadingActionsByStatus, setLoadingActionsByStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingActionsByStatus(true);
    axios
      .get(url)
      .then((response) => {
        setActionsByStatus(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingActionsByStatus(false);
      });
  }, [url]);

  return { actionsByStatus, loadingActionsByStatus, error };
}

export default useFetchByActionStatus;
