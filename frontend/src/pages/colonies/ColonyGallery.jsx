import React, { useState } from "react";

import CommonSection from "../../components/ui/Common-section/CommonSection";
import NftCard from "../../components/ui/Nft-card/NftCard";

import useFetch from "../../assets/data/useFetch";
import { Container, Row, Col } from "reactstrap";

import "../../styles/market.css";
import "../../components/ui/Live-auction/live-auction.css";

// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const ColonyGallery = () => {
  const { NFT__DATA } = useFetch(
    "http://185.203.34.66:8080/colony/Littlefish%20Foundation/actions/"
  );
  // const [data, setData] = useState([]);

  // const handleCategory = () => {};

  // const handleSort = (e) => {
  //   const filterValue = e.target.value;
  //   console.log( { filterValue})
  //   if (filterValue === "newest") {
  //     const filterData = NFT__DATA.sort((tokenId1, tokenId2) =>
  //       tokenId1.tokenId < tokenId2.tokenId
  //         ? 1
  //         : tokenId1.tokenId > tokenId2.tokenId
  //         ? -1
  //         : 0
  //     );
  //     console.log(filterData);

  //     setData(filterData);

  //   }

  //   if (filterValue === "oldest") {
  //     const filterData = NFT__DATA.sort((tokenId1, tokenId2) =>
  //       tokenId1.tokenId > tokenId2.tokenId
  //         ? 1
  //         : tokenId1.tokenId < tokenId2.tokenId
  //         ? -1
  //         : 0
  //     );
  //     // console.log(filterData);

  //     setData(filterData);
  //   }

  //   if (filterValue === "Z->A") {
  //     const filterData = NFT__DATA.sort((name1, name2) =>
  //       name1.assetName < name2.assetName
  //         ? 1
  //         : name1.assetName > name2.assetName
  //         ? -1
  //         : 0
  //     );

  //     setData(filterData);
  //   }

  //   if (filterValue === "A->Z") {
  //     const filterData = NFT__DATA.sort((name1, name2) =>
  //       name1.assetName > name2.assetName
  //         ? 1
  //         : name1.assetName < name2.assetName
  //         ? -1
  //         : 0
  //     );

  //     setData(filterData);
  //   }

  //   //xsetData("default");
  // };

  return (
    <>
      <section>
        <Container>
          <Row>
            <div className="seller__section-title">
              <h3>Actions of the Colony</h3>
              <br/>
            </div>
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

export default ColonyGallery;
