import React from "react";
import NftCard from "../UserInterface/Nft-card/NftCard";
import useFetch from "../../Hooks/useFetch";
import { Container, Row, Col } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";


// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const ColonyGallery = () => {
  const { NFT__DATA } = useFetch(
    "https://api.littlefish.foundation/colony/Littlefish%20Foundation/actions/"
  );

  return (
    <>
      <section>
        <Container>
          <Row>
            <div className="seller__section-title">
              <h3>Actions of the Colony</h3>
              <br />
            </div>
            {NFT__DATA?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.tokenId}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ColonyGallery;
