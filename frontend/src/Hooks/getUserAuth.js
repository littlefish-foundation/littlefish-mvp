/*import React, { useState, useEffect } from "react";
import axios from "axios";

function useUserAuth() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .request({
        method: "POST",
        url: `https://api.littlefish.foundation/login/`,
      })
      .then((response) => {
        setToken(response.data.token);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { token, loading, error };
}
export default useUserAuth;*/