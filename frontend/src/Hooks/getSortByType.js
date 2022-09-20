import { useState, useEffect } from "react";
import axios from "axios";

function useGetSortByType(url, queryFilter) {
  const [filteredType, setFilteredType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get(url, {
        params: { type: queryFilter },
      })

      .then((response) => {
        setFilteredType(response.data);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, queryFilter]);

  return { filteredType, loading, error };
}
export default useGetSortByType;
