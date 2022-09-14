import { useState, useEffect } from "react";
import axios from "axios";

function useFetchByActionID(url) {
  const [actionData, setActionData] = useState(null);
  const [loadingActionData, setLoadingActionData] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingActionData(true);
    axios
      .get(url)
      .then((response) => {
        setActionData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingActionData(false);
      });
  }, [url]);

  return { actionData, loadingActionData, error };
}

export default useFetchByActionID;
