/*import { useState, useEffect } from "react";
import axios from "axios";

function useGetSortByType(url, queryFilter) {
  const [filteredType, setFilteredType] = useState([]);
  const [loadingByType, setLoadingByType] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingByType(true);

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
        setLoadingByType(false);
      });
  }, [url, queryFilter]);

  return { filteredType, loadingByType, error };
}
export default useGetSortByType;
*/