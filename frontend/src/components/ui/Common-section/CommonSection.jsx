import React from "react";

import "./common-section.css";

import { Container } from "reactstrap";
const CommonSection = ({ assetName }) => {
  return (
    <section className="common__section">
      <Container className="text-center">
        <h2>{assetName}</h2>
      </Container>
    </section>
  );
};

export default CommonSection;
