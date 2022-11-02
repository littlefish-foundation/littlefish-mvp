import { useState, useEffect } from "react";
import axios from "axios";
import { LITTLEFISH_API_URL } from "../config.json";

function useFetch2() {
  const [COLONY__DATA, setCOLONY__DATA] = useState(null);
  const [loadingColony, setLoadingColony] = useState(false);
  const [error, setError] = useState(null);

  const url = `${LITTLEFISH_API_URL}/colony/`;

  useEffect(() => {
    setLoadingColony(true);
    axios
      .get(url)
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
