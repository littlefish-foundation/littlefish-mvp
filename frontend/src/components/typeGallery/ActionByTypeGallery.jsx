import React, { useState, useEffect } from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

import { LITTLEFISH_API_URL } from "../../../config.json";

// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const ActionByTypeGallery = (props) => {
  const [typeActions, setTypeActions] = useState(null);
  const [loadingTypeActions, setLoadingTypeActions] = useState(false);
  const [error, setError] = useState(null);
  let type = props.actionType;
  let searchType = props.searchType;
  let searchResults = props.searchResults;
  let status = props.actionStatus;

  let name, producerName;
  if (searchType === "name") {
    name = props.searchTerm;
  } else if (searchType === "producerName") {
    producerName = props.searchTerm;
  }

  const filtering = {
    params: {
      ...(name ? { name } : undefined),
      ...(type ? { type } : undefined),
      ...(producerName ? { producerName } : undefined),
      ...(status ? { status } : undefined),
    },
  };

  useEffect(() => {
    setLoadingTypeActions(true);
    axios
      .get(`${LITTLEFISH_API_URL}/action`, filtering)
      .then((response) => {
        setTypeActions(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingTypeActions(false);
      });
  }, [type, producerName, status, name]);
  console.log(filtering);
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
