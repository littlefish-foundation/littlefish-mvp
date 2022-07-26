import React, { useEffect, useState } from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
import { Container, Row, Col, Spinner } from "reactstrap";
import "../styles/actions.css";
import "../components/UserInterface/Live-auction/live-auction.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getActions } from "../Hooks/fetchSearchDate";
import useFetchForPopularActionType from "../Hooks/getPopularActionType";
import useFetchByActionStatus from "../Hooks/getActionsByStatus";
import ActionByTypeGallery from "../components/typeGallery/ActionByTypeGallery";
import AllActionTypesGallery from "../components/typeGallery/AllActionTypesGallery";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const Actions = () => {
  const [actionStatus, setActionStatus] = useState(null);
  const [actions, setActions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [key, setKey] = useState("All Actions");
  const { actionsByStatus, loadingActionsByStatus } =
    useFetchByActionStatus(actionStatus);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { popularActionType } = useFetchForPopularActionType();
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

  const handleStatusChange = (e) => {
    console.log(actionStatus);
  };
  useEffect(() => {
    handleStatusChange();
  }, [actionStatus]);

  console.log(actionStatus);

  return (
    <div>
      {/* <SubHeader /> */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div
                style={{
                  marginTop: "7px",
                  marginBottom: "10px",
                  marginLeft: "18px",
                }}
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
                    <option value="">Sort By</option>
                    <option value="FOR_SALE">Ready to mint</option>
                    <option value="RESERVED">Reserved</option>
                    <option value="COMPLETED">Minted</option>
                  </select>
                </div>
              </div>
            </Col>

            {/* <h2
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px ",
              }}
            >
              Actions
            </h2> */}
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              style={{
                marginLeft: "30px",
                marginTop: "10px",
                background: "transparent",
              }}
              className="navBar__menu"
            >
              <Tab
                eventKey="All Actions"
                title="All Actions"
                style={{ background: "transparent !important" }}
                key="All Actions"
              >
                <br />
                {actionStatus === null || actionStatus === "" ? (
                  <AllActionTypesGallery
                    searchResults={searchResults}
                    searchTerm={searchTerm}
                    actionStatus={actionStatus}
                    searchType={searchType}
                  />
                ) : (
                  <div>
                    {loadingActionsByStatus ? (
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
                        <Container
                          style={{ backgroundColor: "transparent !important" }}
                        >
                          <Row>
                            {actionsByStatus?.map((item) => (
                              <Col
                                lg="3"
                                md="4"
                                sm="6"
                                className="mb-4"
                                key={item._id}
                              >
                                <NftCard item={item} key={item._id} />
                              </Col>
                            ))}
                          </Row>
                        </Container>
                      </section>
                    )}
                  </div>
                )}
              </Tab>
              {popularActionType?.actionTypes?.map((item) => (
                <Tab
                  eventKey={item._id}
                  title={"#" + item.name}
                  style={{ backgroundColor: "transparent !important" }}
                  key={item._id}
                >
                  <br />

                  <ActionByTypeGallery
                    actionType={item.name}
                    searchResults={searchResults}
                    searchTerm={searchTerm}
                    actionStatus={actionStatus}
                    searchType={searchType}
                    key={item._id}
                  />
                </Tab>
              ))}
            </Tabs>
          </Row>
        </Container>
      </section>
    </div>
  );
};
export default Actions;
