import React from "react";

import "./sub-header.css";

import { Container } from "reactstrap";
const SubHeader = ({ assetName }) => {
  return (
    <section className="sub__header">
      <Container className="text-center">
        <h2>{assetName}</h2>
      </Container>
    </section>
  );
};

export default SubHeader;
