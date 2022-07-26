import React, { useState, useEffect } from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import axios from "axios";
import { Container, Row, Col, Spinner } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

import { LITTLEFISH_API_URL } from "../../config.json";

const ActionByTypeGallery = (props) => {
  const [typeActions, setTypeActions] = useState([]);
  const [loadingTypeActions, setLoadingTypeActions] = useState(false);
  const [setError] = useState(null);
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
      {loadingTypeActions ? (
        <Spinner
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            color: "gray",
            marginBottom: "300px",
          }}
        />
      ) : (
        <section>
          <Container style={{ backgroundColor: "transparent !important" }}>
            <Row>
              {typeActions?.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item._id}>
                  <NftCard item={item} key={item._id} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
};

export default ActionByTypeGallery;
