import React, { useState, useEffect } from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const ActionByTypeGallery = (props) => {
  const [typeActions, setTypeActions] = useState(null);
  const [loadingTypeActions, setLoadingTypeActions] = useState(false);
  const [error, setError] = useState(null);
  let type = props.actionType;
  let searchResults = props.searchResults;
  let searchTerm = props.searchTerm;

  useEffect(() => {
    setLoadingTypeActions(true);
    axios
      .get(
        `https://api.littlefish.foundation/colony/Littlefish%20Foundation/actions?type=${type}`
      )
      .then((response) => {
        setTypeActions(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingTypeActions(false);
      });
  }, []);
  return (
    <div>
      <section>
        <Container style={{ backgroundColor: "transparent !important" }}>
          <Row>
            {typeActions?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.type}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ActionByTypeGallery;
