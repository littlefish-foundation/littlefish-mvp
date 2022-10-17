import React, { useState, useEffect } from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const AllActionTypesGallery = (props) => {
  const [allActionTypes, setAllActionTypes] = useState(null);
  const [loadingAllActionTypes, setLoadingAllActionTypes] = useState(false);
  const [error, setError] = useState(null);
  let searchResults = props.searchResults;
  let searchTerm = props.searchTerm;
  let actionStatus = props.actionStatus;


  useEffect(() => {
    setLoadingAllActionTypes(true);
    axios
      .get(`https://api.littlefish.foundation/action`, {
        params: {
          limit: 12,
        },
      })
      .then((response) => {
        setAllActionTypes(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingAllActionTypes(false);
      });
  }, []);
  return (
    <div>
      <section>
        <Container style={{ backgroundColor: "transparent !important" }}>
          <Row>
            {searchResults.length && searchTerm.length !== 0
              ? searchResults.map((item) => (
                  <Col lg="3" md="4" sm="6" className="mb-4" key={item.type}>
                    <NftCard item={item} />
                  </Col>
                ))
              : allActionTypes?.map((item) => (
                  <Col lg="3" md="4" sm="6" className="mb-4" key={item.tokenId}>
                    <NftCard item={item} key={item.tokenId} />
                  </Col>
                ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AllActionTypesGallery;
