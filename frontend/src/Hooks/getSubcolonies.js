import { useState, useEffect } from "react";
import axios from "axios";
import { LITTLEFISH_API_URL } from "../config.json";

function useGetSubcolonies() {
  const [subcolonyData, setSubcolonyData] = useState(null);
  const [loadingSubcolony, setLoadingSubcolony] = useState(false);
  const [error, setError] = useState(null);

  const url = `https://api.littlefish.foundation/colony/Littlefish%20Foundation/parent-and-subs`;

  useEffect(() => {
    setLoadingSubcolony(true);
    axios
      .get(url)
      .then((response) => {
        setSubcolonyData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingSubcolony(false);
      });
  }, [url]);

  return { subcolonyData, loadingSubcolony, error };
}
export default useGetSubcolonies;
