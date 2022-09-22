import React, { useEffect, useState } from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
import useFetch from "../Hooks/useFetch";
import { Container, Row, Col } from "reactstrap";
import "../styles/actions.css";
import "../components/UserInterface/Live-auction/live-auction.css";
import useGetSearchOwnerName from "../Hooks/getSearchActionOwner";
import useGetSearchAssetName from "../Hooks/getSearchActionAssetName";
import useGetSortByType from "../Hooks/getSortByType";
import useFetchForPopularActionType from "../Hooks/getPopularActionType";
import { RotatingLines } from "react-loader-spinner";

const Actions = () => {
  const [ownerName, setOwnerName] = useState("");
  const [assetName, setAssetName] = useState("");
  const [tags, setTags] = useState(null);
  const [term, setTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("assetName");
  const [data, setData] = useState([]);

  const { NFT__DATA, loading, error } = useFetch(
    "https://api.littlefish.foundation/action/"
  );
  /*const { actionSearched, loadingByOwner } = useGetSearchOwnerName(
    `https://api.littlefish.foundation/action/?ownerName=${ownerName}`
  );
  const { actionSearchedByName, loadingActionByName } = useGetSearchAssetName(
    `https://api.littlefish.foundation/action/?assetName=${assetName}`
  );
  const { filteredType, loadingByType } = useGetSortByType(
    `https://api.littlefish.foundation/action/?type=${tags}`
  );
  const { popularActionType, loadingPopularActionType } =
    useFetchForPopularActionType(
      "https://api.littlefish.foundation/action-type/popular"
    );*/
  //const [ownerName, setOwnerName] = useState("");

  // const handleTypeFiltering = (e) => {
  //   console.log(tags);
  // };

  // useEffect(() => {
  //   handleTypeFiltering();
  // }, [tags]);

  // const handleSearchCategory = (e) => {
  //   e.preventDefault();
  //   setSearchCategory(e.target.value);
  // };

  // console.log(searchCategory);

  // const handleSearch = (e) => {
  //   console.log(term);

  //   searchCategory === "ownerName"
  //     ? setOwnerName(term) && setAssetName("")
  //     : setAssetName(term) && setOwnerName("");
  // };

  // useEffect(() => {
  //   handleSearch();
  // }, [term]);

  // const handleSort = (e) => {
  //   const filterValue = e.target.value;
  // };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <>
          <div>
            <SubHeader />
          </div>
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
                          //onChange={handleTypeFiltering}
                          onChange={(e) => setTags(e.target.value)}
                          value={tags}
                        >
                          <option value="null">All categories</option>
                          {/*popularActionType?.actionTypes?.map((item) => (
                            <option value={item.name}>{item.name}</option>
                          ))*/}
                        </select>
                      </div>

                      <form>
                        <div className="all__category__filter">
                          <select
                            //onChange={handleSearchCategory}
                            value={searchCategory}
                            style={{
                              width: "170px",
                              position: "absolute",
                              borderRight: "1px solid black",
                              borderTopRightRadius: "0px",
                              borderBottomRightRadius: "0px",

                              height: "38px",
                            }}
                          >
                            <option value="assetName">Asset Name</option>
                            <option value="ownerName">Owner Name</option>
                          </select>

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
                        </div>

                        <input
                          className="bar-styling"
                          key="random1"
                          placeholder="Search by Asset Name or Owner Name"
                          onChange={(e) => setTerm(e.target.value)}
                          value={term}
                        ></input>
                      </form>
                    </div>

                    <div className="filter__right">
                      <select
                        //onChange={handleSort}
                        onClick={(e) => setData(e.target.value)}
                      >
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

                {NFT__DATA?.map((item) => (
                  <Col lg="3" md="4" sm="6" className="mb-4">
                    <NftCard item={item} />
                  </Col>
                ))}
                {/*term === "" &&
                  tags === null &&
                  NFT__DATA?.map((item) => (
                    <Col lg="3" md="4" sm="6" className="mb-4">
                      <NftCard item={item} />
                    </Col>
                  ))}
                {term !== "" &&
                  searchCategory === "assetName" &&
                  actionSearchedByName?.map((item) => (
                    <Col lg="3" md="4" sm="6" className="mb-4">
                      <NftCard item={item} />
                    </Col>
                  ))}
                {term !== "" &&
                  searchCategory !== "assetName" &&
                  actionSearched?.map((item) => (
                    <Col lg="3" md="4" sm="6" className="mb-4">
                      <NftCard item={item} />
                    </Col>
                  ))}
                {tags !== null &&
                  filteredType?.map((item) => (
                    <Col lg="3" md="4" sm="6" className="mb-4">
                      <NftCard item={item} />
                    </Col>
                  ))*/}
              </Row>
            </Container>
          </section>
        </>
      )}
    </div>
  );
};

export default Actions;
