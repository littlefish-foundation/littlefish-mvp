import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(a,assetName,price) {
  const [paymentLink, setPaymentLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.request({
        method: "POST",
        url: `http://localhost:8000/action/sale/${assetName}`
      })
      .then((response) => {
        setPaymentLink(response.data.link);
      })
      .catch((err) => {
        console.log({err})
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [a,assetName,price]);

  return { paymentLink, loading, error };
}
export default useFetch;
