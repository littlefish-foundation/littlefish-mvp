import React, { useState, useEffect } from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

import { LITTLEFISH_API_URL } from "../../config.json";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const AllActionTypesGallery = (props) => {
  const [allActionTypes, setAllActionTypes] = useState(null);
  const [loadingAllActionTypes, setLoadingAllActionTypes] = useState(false);
  const [error, setError] = useState(null);
  let type = props.actionType;
  let searchType = props.searchType;
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
      limit: 12,
    },
  };

  useEffect(() => {
    setLoadingAllActionTypes(true);
    axios
      .get(`${LITTLEFISH_API_URL}/action`, filtering)
      .then((response) => {
        setAllActionTypes(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingAllActionTypes(false);
      });
  }, [type, producerName, status, name]);
  return (
    <div>
      <section>
        <Container style={{ backgroundColor: "transparent !important" }}>
          <Row>
            {allActionTypes?.map((item) => (
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
