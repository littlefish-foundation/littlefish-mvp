import React, { useEffect, useState } from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
import { Container, Row, Col } from "reactstrap";
import "../styles/actions.css";
import "../components/UserInterface/Live-auction/live-auction.css";
import { RotatingLines } from "react-loader-spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getActions } from "../Hooks/fetchSearchDate";
import useFetchForPopularActionType from "../Hooks/getPopularActionType";
import useFetchActions from "../Hooks/useFetch";
import useFetchByActionStatus from "../Hooks/getActionsByStatus";
import useFetchByActionType from "../Hooks/getActionsByType";
import ActionByTypeGallery from "../components/typeGallery/ActionByTypeGallery";
import AllActionTypesGallery from "../components/typeGallery/AllActionTypesGallery";
const Actions = () => {
  const [actionStatus, setActionStatus] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [actions, setActions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [key, setKey] = useState("All Actions");
  const { actionsByStatus } = useFetchByActionStatus(
    `https://api.littlefish.foundation/action?status=${actionStatus}`
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
        action.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        action.producerName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(searchTerm);
    setSearchResults(resultsArray);
  };
  const handleStatusChange = (e) => {
    console.log(actionStatus);
  };
  useEffect(() => {
    handleStatusChange();
  }, [actionStatus]);
  console.log(actions);
  console.log(actionType);
  console.log(actionStatus);
  console.log(key);
  console.log(searchType);
  return (
    <div>
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
                  {/* <div className="all__category__filter">
                    <select
                      onChange={(e) => setActionType(e.target.value)}
                      value={actionType}
                    >
                      <option value="">All categories</option>
                      {popularActionType?.actionTypes?.map((item) => (
                        <option value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div> */}
                  <div className="all__category__filter">
                    <select
                      onChange={(e) => setSearchType(e.target.value)}
                      value={searchType}
                    >
                      <option value="">Select Search Library</option>
                      <option value="name">By Action Name</option>
                      <option value="producerName">By Producer Name</option>
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
                      placeholder="Search by Name or Producer Name"
                      onChange={(e) => setSearchTerm(e.target.value)}
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
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
              style={{
                marginLeft: "30px",
                marginTop: "10px",
                backgroundColor: "transparent !important",
              }}
            >
              <Tab
                eventKey="All Actions"
                title="All Actions"
                style={{ backgroundColor: "transparent !important" }}
              >
                <AllActionTypesGallery
                  searchResults={searchResults}
                  searchTerm={searchTerm}
                  actionStatus={actionStatus}
                  searchType={searchType}
                />
              </Tab>
              {popularActionType?.actionTypes?.map((item) => (
                <Tab
                  eventKey={item.name}
                  title={"#" + item.name}
                  style={{ backgroundColor: "transparent !important" }}
                >
                  <ActionByTypeGallery
                    actionType={item.name}
                    searchResults={searchResults}
                    searchTerm={searchTerm}
                    actionStatus={actionStatus}
                    searchType={searchType}
                  />
                </Tab>
              ))}
            </Tabs>
            {/*********************************************************************************** */}
            {/*********************************************************************************** */}
            {/*********************************************************************************** */}
            {/* {searchResults.length &&
              searchTerm.length !== 0 &&
              searchResults?.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item?.tokenId}>
                  <NftCard item={item} key={item?.tokenId} />
                </Col>
              ))}
            {actionStatus !== null &&
              actionStatus !== "" &&
              searchTerm.length === 0 &&
              actionsByStatus?.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item?.tokenId}>
                  <NftCard item={item} key={item?.tokenId} />
                </Col>
              ))} */}
            {/*********************************************************************************** */}
            {/*********************************************************************************** */}
            {/*********************************************************************************** */}
          </Row>
        </Container>
      </section>
    </div>
  );
};
export default Actions;
