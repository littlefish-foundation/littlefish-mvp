import React, { useState, useEffect } from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import axios from "axios";
import { Container, Row, Col, Spinner } from "reactstrap";

import { LITTLEFISH_API_URL } from "../../config.json";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";

const AllActionTypesGallery = (props) => {
  const [allActionTypes, setAllActionTypes] = useState([]);
  const [loadingAllActionTypes, setLoadingAllActionTypes] = useState(false);
  const [setError] = useState(null);
  const [page, setPage] = useState(0);

  let status = props.actionStatus;

  const filtering = {
    params: {
      limit: 12,
      page: page,
    },
  };

  useEffect(() => {
    setLoadingAllActionTypes(true);
    axios
      .get(`${LITTLEFISH_API_URL}/action`, filtering)
      .then((response) => {
        allActionTypes.length
          ? setAllActionTypes([...allActionTypes, ...response.data])
          : setAllActionTypes(response.data);
        console.log(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingAllActionTypes(false);
      });
  }, [status, page]);
  console.log(allActionTypes.length);

  return (
    <div>
      <div>
        <section>
          <Container style={{ backgroundColor: "transparent !important" }}>
            <InfiniteScroll
              dataLength={allActionTypes.length}
              scrollThreshold={0.5}
              next={() => setPage(page + 1)}
              hasMore={allActionTypes.length % 12 !== 0 ? false : true}
              loader={
                <Spinner
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    color: "gray",
                  }}
                />
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>You have seen it all</b>
                </p>
              }
              style={{ overflow: "hidden" }}
            >
              <Row>
                {allActionTypes?.map((item, index) => (
                  <Col
                    xxl="3"
                    xl="3"
                    lg="3"
                    md="4"
                    sm="6"
                    className="mb-4"
                    key={item._id}
                  >
                    <NftCard item={item} key={item._id} index={index} />
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          </Container>
        </section>
      </div>
      <ScrollToTop smooth viewBox="0 0 24 24" svgPath="M18 15l-6-6-6 6" />
    </div>
  );
};

export default AllActionTypesGallery;
