import { useState, useEffect } from "react";
import axios from "axios";

function useFetchIpfsLink(assetName,image) {
  const [actionIpfsLink, setActionIpfsLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.request({
        method: "GET",
        url: `https://api.littlefish.foundation/action/${assetName}`
      })
      .then((response) => {
        setActionIpfsLink(response.data.image);
      })
      .catch((err) => {
        console.log({err})
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [assetName,image]);

  return { actionIpfsLink, loading, error };
}
export default useFetchIpfsLink;
