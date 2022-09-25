import React from "react";
import NftCard from "../UserInterface/Nft-card/NftCard";
import useFetch from "../../Hooks/useFetch";
import { Container, Row, Col } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

const ColonyGallery = (props) => {
  let colonyName = props.colonyName;

  const { NFT__DATA } = useFetch(
    `https://api.littlefish.foundation/colony/${colonyName}/actions/`
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
            {NFT__DATA?.map((item) => (
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
