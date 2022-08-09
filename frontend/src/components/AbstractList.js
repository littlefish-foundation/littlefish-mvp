import React from "react";
import CollectionCard from "./CollectionCard";
import "./AbstractList.css";

const AbstractList = ({ listData, setSelectedNft }) => {
  return (
    <div className="list">
      {listData.map((nft) => (
        <div key={nft.tokenId} onClick={() => setSelectedNft(nft.tokenId)}>
          <CollectionCard
            
            id={nft.tokenId}
            assetName={nft.assetName}
            name={nft.name}
            description={nft.description}
            image={nft.image}
            youtubeLink={nft.youtubeLink}
            otherLink={nft.otherLink}
            ownerName={nft.ownerName}
          />
        </div>
      ))}
    </div>
  );
};
export default AbstractList;
