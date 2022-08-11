import './Gallery.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import AbstractList from "../components/AbstractList";
//import Main from "./components/Main";



const Gallery = () => {
    const [listData, setListData] = useState([]);
    const [selectedNft, setSelectedNft] = useState(0);
  
    useEffect(() => {
      const getMyNfts = async () => {
        const openseaData = await axios.get("http://localhost:8000/nft/chain", {
          params: { size: 20 },
        });
  
        console.log({ openseaData });
        setListData(openseaData.data);
      };
      getMyNfts();
    }, []);
  
    return (
      <div className="app">
  
        {listData.length > 0 && (
          <>
            <AbstractList listData={listData} setSelectedNft={setSelectedNft} />
            {/* <Main listData={listData} selectedNft={selectedNft} /> */}
          </>
        )}
  
        
      </div>
    );
}

export default Gallery;