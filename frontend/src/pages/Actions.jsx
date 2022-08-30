import React, { useState } from "react";

import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";

import NftCard from "../components/UserInterface/Nft-card/NftCard";

import useFetch from "../assets/data/useFetch";

import { Container, Row, Col } from "reactstrap";

import "../styles/actions.css";
import "../components/UserInterface/Live-auction/live-auction.css";

// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const Actions = () => {
  const { NFT__DATA } = useFetch("https://api.littlefish.foundation/action/");
  const [data, setData] = useState([]);

  const handleCategory = () => {};

  const handleSort = (e) => {
    const filterValue = e.target.value;
    console.log( { filterValue})

    if (filterValue === "newest") {
      const filterData = NFT__DATA.sort((tokenId1, tokenId2) =>
        tokenId1.tokenId > tokenId2.tokenId
          ? 1
          : tokenId1.tokenId < tokenId2.tokenId
          ? -1
          : 0
      );
      // console.log(filterData);

      setData(filterData);
    }

    if (filterValue === "oldest") {
      const filterData = NFT__DATA.sort((tokenId1, tokenId2) =>
        tokenId1.tokenId < tokenId2.tokenId
          ? 1
          : tokenId1.tokenId > tokenId2.tokenId
          ? -1
          : 0
      );
      console.log(filterData);

      setData(filterData);
 
    }


    if (filterValue === "Z->A") {
      const filterData = NFT__DATA.sort((name1, name2) =>
        name1.assetName < name2.assetName
          ? 1
          : name1.assetName > name2.assetName
          ? -1
          : 0
      );

      setData(filterData);
    }

    if (filterValue === "A->Z") {
      const filterData = NFT__DATA.sort((name1, name2) =>
        name1.assetName > name2.assetName
          ? 1
          : name1.assetName < name2.assetName
          ? -1
          : 0
      );

      setData(filterData);
    }

    //xsetData("default");
  };

  return (
    <>
      <SubHeader assetName={"Actions"} />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="Software">Software Developing</option>
                      <option value="Research">Research</option>
                      <option value="Community">Community Help</option>
                      <option value="Strategy">Plan & Strategy</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select
                    onChange={handleSort}
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

            {NFT__DATA?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.tokenId}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Actions;
