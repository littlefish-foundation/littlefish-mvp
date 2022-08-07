import React, { useState, useEffect } from "react";

import "./Main.css";

const Main = ({ selectedNft, listData }) => {
  const [activeNft, setActiveNft] = useState(listData[0]);
  useEffect(() => {
    setActiveNft(listData[selectedNft]);
  }, [listData, selectedNft]);
  return (
    <div className="main">
      <div className="mainContent">
        <div className="highlight">
          <div className="nftContainer">
            <img className="selectedNft" src={activeNft.image} alt="" />
          </div>
        </div>
        <div className="nftDetails" style={{ color: "#fff" }}>
          <div className="title">
            {activeNft.name}
            <span className="itemNumber">.#{activeNft.token_id}</span>
            <br />
            <span className="description">{activeNft.description}</span>
            <br />
            <span className="owner"></span>
          </div>

          <div className="description">
            <a href={activeNft.link_1} style={{ color: "white" }}>
              {" "}
              <i className="pi pi-youtube" style={{ fontSize: "3em" }}></i>
            </a>
            <br />
            <a href={activeNft.link_2} style={{ color: "white" }}>
              {" "}
              <i className="pi pi-globe" style={{ fontSize: "3em" }}></i>
            </a>

            <div className="ownerDetails">
              {" "}
              <i className="pi pi-user" style={{ fontSize: "2em" }}>Action Owner: {activeNft.owner_name} </i>
              <div className="ownerNameAndHandle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
