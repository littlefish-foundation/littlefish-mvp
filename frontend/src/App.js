import "./App.css";
import Header from "./components/Header";

import "./components/Header.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AbstractList from "./components/AbstractList";
import Main from "./components/Main";
import "./formcomponents/modal/index.css";
import "./formcomponents/modal/App.css";

function App() {
  const [listData, setListData] = useState([]);
  const [selectedNft, setSelectedNft] = useState(0);

  useEffect(() => {
    const getMyNfts = async () => {
      // const openseaData = await axios.get(
      //   "https://testnets-api.opensea.io/assets?asset_contract_address=0x646B56b7775e357DA5c35Cd2f8441Bb6aC0EDce1&format=json"
      // );
      const openseaData = await axios.get(
        "http://localhost:8000/nft/chain"
      )
      console.log({openseaData})
      //setListData(openseaData.data.assets.reverse());
      setListData(openseaData.data);
    };
    getMyNfts();
  }, []);

  return (
    <div className="app">
      <Header />

      {listData.length > 0 && (
        <>
          <Main listData={listData} selectedNft={selectedNft} />
          <AbstractList listData={listData} setSelectedNft={setSelectedNft} />
        </>
      )}

      <footer className="footer">
        <br />
        <p className="text-footer">Littlefish</p>
        <div className="social-icons-align">
          <a
            href="https://www.youtube.com/channel/UCqST3YotsWuc0faaqsLjdKQ/videos"
            style={{ color: "white" }}
          >
            <i className="pi pi-youtube" style={{ fontSize: "3em" }}></i>
          </a>
          <a href="https://discord.gg/tBKZd5AGUS" style={{ color: "white" }}>
            <span className="pi pi-discord" style={{ fontSize: "3em" }}></span>
          </a>
          <a
            href="https://twitter.com/LittleFishDAO"
            style={{ color: "white" }}
          >
            <i className="pi pi-twitter" style={{ fontSize: "3em" }}></i>
          </a>
          <a
            href="https://github.com/littlefish-foundation"
            style={{ color: "white" }}
          >
            <span className="pi pi-github" style={{ fontSize: "3em" }}></span>
          </a>
        </div>
        <p className="text-footer">Copyright ©-All rights are reserved</p>
      </footer>
    </div>
  );
}
export default App;
