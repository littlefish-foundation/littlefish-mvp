import React from "react";
import useFetch2 from "../Hooks/useFetch2";
import ColonyCard from "../components/colonies/ColonyCard";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";

import "../styles/Colony.css";

const Colony = (props) => {
  const { COLONY__DATA } = useFetch2(
    "https://api.littlefish.foundation/colony/"
  );

  return (
    <div>
      <SubHeader assetName={"Colonies"} />
      {COLONY__DATA?.map((item) => (
        <ColonyCard
          style={{ leftMargin: "auto", rightMargin: "auto" }}
          item={item}
        />
      ))}
    </div>
  );
};

export default Colony;
