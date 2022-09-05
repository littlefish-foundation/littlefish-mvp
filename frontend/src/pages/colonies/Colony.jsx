import React from "react";
import useFetch2 from "../../assets/data/useFetch2";
import { Row } from "reactstrap";
import ColonyCard from "./ColonyCard";
import SubHeader from "../../components/UserInterface/Sub-Header/SubHeader";

import "./Colony.css";

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
