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
            asset_name={nft.asset_name}
            description={nft.description}
            image={nft.image}
            link_1={nft.link_1}
            link_2={nft.link_2}
            owner_name={nft.owner_name}
          />
        </div>
      ))}
    </div>
  );
};
export default AbstractList;
