import { useState, useEffect } from "react";
import axios from "axios";

const AdaConverter = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd"
      )
      .then((response) => {
        setPrice(response.data.cardano.usd);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [price]);
  return { price, loading, error };
};

export default AdaConverter;
