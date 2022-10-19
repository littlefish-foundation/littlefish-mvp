import React from "react";
import { Container, Row, Col } from "reactstrap";

import "./trending.css";
import useFetch from "../../../Hooks/useFetch";
import NftCard from "../Nft-card/NftCard";
import { LITTLEFISH_API_URL } from "../../../../config.json";

const Trending = () => {
  const { NFT__DATA } = useFetch(`${LITTLEFISH_API_URL}/action/`);

  console.log(NFT__DATA);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <h3 className="trending__title">Some of Our Actions</h3>
          </Col>

          {NFT__DATA?.slice(8, 16).map((item) => (
            <Col lg="3" md="4" sm="6" key={item.tokenId} className="mb-4">
              <NftCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
