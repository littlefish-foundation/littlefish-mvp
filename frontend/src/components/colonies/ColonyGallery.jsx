import React from "react";
import NftCard from "../UserInterface/Nft-card/NftCard";
import useFetch from "../../Hooks/useFetch";
import { Container, Row, Col, Spinner } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";

import { LITTLEFISH_API_URL } from "../../config.json";

const ColonyGallery = (props) => {
  let colony = props.colony;

  const { allActions, loading } = useFetch(
    `${LITTLEFISH_API_URL}/colony/${colony}/actions/`
  );

  return (
    <div>
      {loading ? (
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
          <Container>
            <Row>
              {allActions?.map((item) => (
                <Col lg="3" md="4" sm="6" key={item._id}>
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

export default ColonyGallery;
