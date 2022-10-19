import { useState, useEffect } from "react";
import axios from "axios";
import { LITTLEFISH_API_URL } from "../../config.json";

function useGetOneUserData(name) {
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [error, setError] = useState(null);

  const url = `${LITTLEFISH_API_URL}/user/${name}`;

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
