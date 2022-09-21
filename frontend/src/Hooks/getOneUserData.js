import { useState, useEffect } from "react";
import axios from "axios";

function useGetOneUserData(url) {
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingUserData(true);
    axios
      .get(url)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingUserData(false);
      });
  }, [url]);

  return { userData, loadingUserData, error };
}

export default useGetOneUserData;
