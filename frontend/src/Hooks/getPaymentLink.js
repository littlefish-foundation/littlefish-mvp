import { useState, useEffect } from "react";
import axios from "axios";

function useGetPaymentLink(_id) {
  const [paymentLink1, setPaymentLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://api.littlefish.foundation/action-sale/${_id}`)

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
  }, [_id]);

  return { paymentLink1, loading, error };
}
export default useGetPaymentLink;
