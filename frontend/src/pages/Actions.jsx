import React, { useEffect, useState } from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
import { Container, Row, Col } from "reactstrap";
import "../styles/actions.css";
import "../components/UserInterface/Live-auction/live-auction.css";
import { RotatingLines } from "react-loader-spinner";
import { getActions } from "../Hooks/fetchSearchDate";
import useFetchForPopularActionType from "../Hooks/getPopularActionType";
import useFetchActions from "../Hooks/useFetch";
import useFetchByActionStatus from "../Hooks/getActionsByStatus";
import useFetchByActionType from "../Hooks/getActionsByType";

const Actions = () => {
  const [actionStatus, setActionStatus] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [actions, setActions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { allActions } = useFetchActions(
    "https://api.littlefish.foundation/action"
  );
  const { actionsByStatus } = useFetchByActionStatus(
    `https://api.littlefish.foundation/action?status=${actionStatus}`
  );
  const { actionsByType } = useFetchByActionType(
    `https://api.littlefish.foundation/action?type=${actionType}`
  );

  const { popularActionType } = useFetchForPopularActionType(
    `https://api.littlefish.foundation/action-type/popular`
  );

  useEffect(() => {
    getActions()
      .then((data) => {
        setActions(data);
        return data;
      })
      .then((data) => {
        setSearchResults(data);
      });
  }, []);

  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(actions);
    setSearchTerm(e.target.value);

    const resultsArray = actions.filter(
      (action) =>
        action.assetName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        action.ownerName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(searchTerm);
    setSearchResults(resultsArray);
  };

  const handleCategoryChange = (e) => {
    console.log(actionType);
  };

  useEffect(() => {
    handleCategoryChange();
  }, [actionType]);

  const handleStatusChange = (e) => {
    console.log(actionStatus);
  };
  useEffect(() => {
    handleStatusChange();
  }, [actionStatus]);

  return (
    <>
      <SubHeader />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div
                style={{ marginTop: "7px", marginBottom: "10px" }}
                className="market__product__filter d-flex align-items-center justify-content-between"
              >
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select
                      onChange={(e) => setActionType(e.target.value)}
                      value={actionType}
                    >
                      <option value={""}>All categories</option>
                      {popularActionType?.actionTypes?.map((item) => (
                        <option value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <i
                      style={{
                        position: "absolute",
                        paddingLeft: "6px",
                        color: "white",
                        fontSize: "1.3rem",
                        paddingTop: "4px",
                      }}
                      className="ri-search-line"
                    />

                    <input
                      className="bar-styling"
                      key="random1"
                      placeholder="Search by Asset Name or Owner Name"
                      onChange={handleSearchChange}
                    ></input>
                  </form>
                </div>

                <div className="filter__right">
                  <select
                    onChange={(e) => setActionStatus(e.target.value)}
                    value={actionStatus}
                  >
                    <option value={""}>Sort By</option>
                    <option value={"FOR_SALE"}>For Sale</option>
                    <option value={"RESERVED"}>Reserved</option>
                    <option value={"COMPLETED"}>Sold</option>
                  </select>
                </div>
              </div>
            </Col>
            <h2
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px ",
              }}
            >
              Actions
            </h2>
            {searchTerm.length === 0 &&
              actionStatus === null &&
              actionType === null &&
              allActions?.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item?.tokenId}>
                  <NftCard item={item} key={item?.tokenId} />
                </Col>
              ))}

            {searchResults.length &&
              searchTerm.length !== 0 &&
              searchResults?.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item?.tokenId}>
                  <NftCard item={item} key={item?.tokenId} />
                </Col>
              ))}

            {actionType !== null &&
              searchTerm.length === 0 &&
              actionsByType?.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item?.tokenId}>
                  <NftCard item={item} key={item?.tokenId} />
                </Col>
              ))}
            {actionStatus !== null &&
              searchTerm.length === 0 &&
              actionsByStatus?.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item?.tokenId}>
                  <NftCard item={item} key={item?.tokenId} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Actions;
