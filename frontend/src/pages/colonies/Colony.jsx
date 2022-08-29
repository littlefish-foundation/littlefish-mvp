import React from "react";
import useFetch2 from "../../assets/data/useFetch2";
import ColonyCard from "./ColonyCard";
import { Col } from "reactstrap";
import CommonSection from "../../components/ui/Common-section/CommonSection";

//import "./Colony.css";

const Colony = (props) => {
  const { COLONY__DATA } = useFetch2("https://api.littlefish.foundation/colony/");

  return (
    <div>
      <CommonSection assetName={"Colonies"}/>
      {COLONY__DATA?.map((item) => (
        <Col>
          <ColonyCard item={item} />
        </Col>
      ))}
    </div>
  );
};

export default Colony;
