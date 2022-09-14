import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(actionId , price, actionCollection) {
  const [paymentLink, setPaymentLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .request({
        method: "POST",
        url: `https://api.littlefish.foundation/action-sale/`,
      })
      .then((response) => {
        setPaymentLink(response.data.link);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [actionId , price, actionCollection]);

  return { paymentLink, loading, error };
}
export default useFetch;
