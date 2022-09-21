/*import { useState, useEffect } from "react";
import axios from "axios";

function useGetPaymentLink(url) {
  const [paymentLink1, setPaymentLink1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get(url)

      .then((response) => {
        console.log(response.data);
        setPaymentLink1(response.data.paymentLink);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { paymentLink1, loading, error };
}
export default useGetPaymentLink;
*/