import { useState, useEffect } from "react";
import axios from "axios";

function useFetchActions(url) {
  const [allActions, setAllActions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, {
        params: {
          limit: 12,
        },
      }) // limit the number of actions to 12
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
