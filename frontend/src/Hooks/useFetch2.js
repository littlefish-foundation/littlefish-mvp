import { useState, useEffect } from "react";
import axios from "axios";

function useFetch2(url) {
  const [COLONY__DATA, setCOLONY__DATA] = useState(null);
  const [loadingColony, setLoadingColony] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingColony(true);
    axios
      .get(url, { params: { limit: 20 } })
      .then((response) => {
        setCOLONY__DATA(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingColony(false);
      });
  }, [url]);

  return { COLONY__DATA, loadingColony, error };
}
export default useFetch2;