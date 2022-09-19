/*import { style } from "@mui/system";
import React, { useState } from "react";
import useGetSearchOwnerName from "../../Hooks/getSearchActionOwner";
import useFetch from "../../Hooks/useFetch";
import { SearchOwnerNameProvider } from "../../store/auth-context";

const SearchBar = () => {
  //const { NFT__DATA } = useFetch("https://api.littlefish.foundation/action/");

  const [ownerName, setOwnerName] = useState("");

  const handleInputChange = (e) => {
    setOwnerName(e.target.value);
  };

  const { actionSearchedOwnerName } = useGetSearchOwnerName(ownerName);

  const BarStyling = {
    width: "25rem",
    height: "45px",
    borderRadius: "10px",
    background: "inherit",
    border: "2px solid white",
    padding: "0.5rem",
    color: "#fff",
    fontWeight: "900",
    position: "relative",
    paddingLeft: "40px",
  };

  return (
    <form>
      <i
        style={{
          position: "absolute",
          paddingLeft: "6px",
          color: "white",
          fontSize: "1.3rem",
        }}
        className="ri-search-line"
      />
      <SearchOwnerNameProvider value={(ownerName, actionSearchedOwnerName)}>
        <input
          style={BarStyling}
          key="random1"
          placeholder="Search"
          onChange={handleInputChange}
        ></input>
      </SearchOwnerNameProvider>
    </form>
  );
};

export default SearchBar;
*/