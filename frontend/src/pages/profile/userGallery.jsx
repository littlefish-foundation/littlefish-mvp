import React from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import useFetch from "../../Hooks/useFetch";
import { Container, Row, Col } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";
import { BsDownload } from "react-icons/bs";

// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const UserGallery = () => {
  const { NFT__DATA } = useFetch(
    "https://api.littlefish.foundation/colony/{colonyName}/actions/"
  );

  return (
    <>
      <section>
        <Container  style={{ backgroundColor:"transparent !important" }}>
          <Row>
            {NFT__DATA?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.ownerName}>
                {item.ownerName === "donald.littlefish" && (
                  <NftCard item={item} />
                )}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UserGallery;
