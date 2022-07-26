import { useState, useEffect } from "react";
import axios from "axios";
import { LITTLEFISH_API_URL } from "../config.json";

function useFetchActions() {
  const [allActions, setAllActions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `${LITTLEFISH_API_URL}/action`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(url) // limit the number of actions to 12
      .then((response) => {
        console.log(response.data);
        setAllActions(response.data);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { allActions, loading, error };
}
export default useFetchActions;
