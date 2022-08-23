import React from "react";


const SearchBar = ({ assetName, setAssetName }) => {
  const BarStyling = {
    width: "20rem",
    height: "20px",
    borderRadius: "40px",
    background: "inherit",
    border: "none",
    padding: "0.5rem",
  };
  return (
    <input
      style={BarStyling}
      key="random1"
      value={assetName}
      placeholder={"Search Action"}
      onChange={(e) => setAssetName(e.target.value)}
    />
  );
};

export default SearchBar;
