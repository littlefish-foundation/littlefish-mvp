import React from "react";
import NftCard from "../UserInterface/Nft-card/NftCard";
import useFetch from "../../Hooks/useFetch";
import { Container, Row, Col } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

const ColonyGallery = () => {
  const { NFT__DATA } = useFetch(
    "https://api.littlefish.foundation/colony/{colonyName}/actions/"
  );

  return (
    <div>
      <section>
        <Container>
          <Row
            style={{
              borderBottom: "2px solid #959ca2",
              marginBottom: "15px",
              marginTop: "2px",
            }}
          >
            <div className="seller__section-title">
              <h3>Actions</h3>
            </div>
          </Row>
          <Row>
            {NFT__DATA?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item?.tokenId}>
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
