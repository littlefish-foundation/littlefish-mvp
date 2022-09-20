import { useState, useEffect } from "react";
import axios from "axios";

function useCreatePaymentLink(url, _id, price) {
  const [paymentLink, setPaymentLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .post(url, {
        actionID: _id,
        price: price,
      })
      .then((response) => {
        setPaymentLink(response.data.paymentLink);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, _id, price]);

  return { paymentLink, loading, error };
}
export default useCreatePaymentLink;
