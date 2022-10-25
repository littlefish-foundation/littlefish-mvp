import React, { useState, useEffect } from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { LITTLEFISH_API_URL } from "../../config.json";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

const UserGallery = (props) => {
  const [userActions, setUserActions] = useState(null);
  const [loadingUserActions, setLoadingUserActions] = useState(false);
  const [setError] = useState(null);
  let producerName = props.producerName;

  useEffect(() => {
    setLoadingUserActions(true);
    axios
      .get(
        `${LITTLEFISH_API_URL}/colony/Littlefish%20Foundation/actions?producerName=${producerName}`
      )
      .then((response) => {
        setUserActions(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingUserActions(false);
      });
  }, []);
  return (
    <div>
      <section>
        <Container style={{ backgroundColor: "transparent !important" }}>
          <Row>
            {userActions?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item._id}>
                <NftCard item={item} key={item._id} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default UserGallery;
