import React, { useState, useEffect } from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import axios from "axios";
import { Container, Row, Col, Spinner } from "reactstrap";

import { LITTLEFISH_API_URL } from "../../config.json";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";

// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const AllActionTypesGallery = (props) => {
  const [allActionTypes, setAllActionTypes] = useState([]);
  const [loadingAllActionTypes, setLoadingAllActionTypes] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

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
      page,
      limit: 8,
      ...(name ? { name } : undefined),
      ...(type ? { type } : undefined),
      ...(producerName ? { producerName } : undefined),
      ...(status ? { status } : undefined),
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
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingAllActionTypes(false);
      });
  }, [type, producerName, status, name, page]);
  console.log(allActionTypes.length);

  return (
    <div>
      <section>
        <Container style={{ backgroundColor: "transparent !important" }}>
          <InfiniteScroll
            dataLength={allActionTypes.length}
            next={() => setPage(page + 1)}
            hasMore={allActionTypes.length % 8 !== 0 ? false : true}
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
                  key={item.tokenId}
                >
                  <NftCard item={item} key={item.tokenId} index={index} />
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        </Container>
      </section>
    </div>
  );
};

export default AllActionTypesGallery;
