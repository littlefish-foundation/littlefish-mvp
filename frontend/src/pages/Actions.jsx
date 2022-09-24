import React, { useEffect, useState } from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
import { Container, Row, Col } from "reactstrap";
import "../styles/actions.css";
import "../components/UserInterface/Live-auction/live-auction.css";
import { RotatingLines } from "react-loader-spinner";
import { getActions } from "../Hooks/fetchSearchDate";

const Actions = () => {
  const [tags, setTags] = useState(null);
  const [actions, setActions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

    const resultsArray = actions.filter(
      (action) =>
        action.assetName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        action.ownerName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(resultsArray);
  };
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
                      onChange={(e) => setTags(e.target.value)}
                      value={tags}
                    >
                      <option value="null">All categories</option>
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
                  <select>
                    <option>Sort By</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="A->Z">A-Z</option>
                    <option value="Z->A">Z-A</option>
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

            {searchResults.length ? (
              searchResults.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4">
                  <NftCard item={item} key={item._id} />
                </Col>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <RotatingLines color="#fff" />
              </div>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Actions;
