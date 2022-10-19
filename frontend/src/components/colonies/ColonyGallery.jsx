import React from "react";
import NftCard from "../UserInterface/Nft-card/NftCard";
import useFetch from "../../Hooks/useFetch";
import { Container, Row, Col } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

import { LITTLEFISH_API_URL } from "../../config.json";

const ColonyGallery = (props) => {
  let colony = props.colony;

  const { allActions } = useFetch(
    `${LITTLEFISH_API_URL}/colony/${colony}/actions/`
  );

  return (
    <div>
      <section>
        <Container>
          <Row
            style={{
              borderBottom: "2px solid rgb(205,173,72)",
              marginBottom: "2px",
              marginTop: "15px",
            }}
          >
            <Col lg="12" style={{ marginBottom: "10px" }}>
              <div className="seller__section-title">
                <h3 style={{ color: "#fff" }}>Actions</h3>
              </div>
            </Col>
          </Row>
          <Row>
            {allActions?.map((item) => (
              <Col lg="3" md="4" sm="6" key={item?.tokenId}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ColonyGallery;
