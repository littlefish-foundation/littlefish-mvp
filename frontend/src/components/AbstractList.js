import React from "react";
import CollectionCard from "./CollectionCard";
import "./AbstractList.css";

const AbstractList = ({ listData, setSelectedNft }) => {
  return (
    <div className="list">
      {listData.map((nft) => (
        <div key={nft.token_id} onClick={() => setSelectedNft(nft.token_id)}>
          <CollectionCard
            
            id={nft.token_id}
            name={nft.asset_name}
            description={nft.description}
            image={nft.image}
          />
        </div>
      ))}
    </div>
  );
};
export default AbstractList;
