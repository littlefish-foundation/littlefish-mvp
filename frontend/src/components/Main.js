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
            <br/>
            <span className="description">{activeNft.description}</span>
          </div>
          
          <div className="description">{activeNft.OwnerName}
            <div className="ownerDetails"> {activeNft.YouTubeLink} 
              <div className="ownerNameAndHandle"></div>{activeNft.OtherLink}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
