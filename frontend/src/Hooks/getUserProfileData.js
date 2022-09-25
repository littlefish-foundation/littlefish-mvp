import { useState, useEffect } from "react";
import axios from "axios";

function useGetUserProfileData(url) {
  const [userProfileData, setUserProfileData] = useState(null);
  const [loadingProfileData, setLoadingProfileData] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingProfileData(true);
    axios
      .get(url, { params: { limit: 20 } })
      .then((response) => {
        setUserProfileData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingProfileData(false);
      });
  }, [url]);

  return { userProfileData, loadingProfileData, error };
}

export default useGetUserProfileData;
