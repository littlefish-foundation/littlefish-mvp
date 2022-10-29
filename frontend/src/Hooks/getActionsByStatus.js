import { useState, useEffect } from "react";
import axios from "axios";
import { LITTLEFISH_API_URL } from "../config.json";

function useFetchByActionStatus(actionStatus) {
  const [actionsByStatus, setActionsByStatus] = useState([]);
  const [loadingActionsByStatus, setLoadingActionsByStatus] = useState(false);
  const [error, setError] = useState(null);

  const url = `${LITTLEFISH_API_URL}/action?status=${actionStatus}`;

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
