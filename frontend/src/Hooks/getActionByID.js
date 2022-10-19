import { useState, useEffect } from "react";
import axios from "axios";
import { LITTLEFISH_API_URL } from "../config.json";

function useFetchByActionID(_id) {
  const url = `${LITTLEFISH_API_URL}/action/${_id}`;

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
