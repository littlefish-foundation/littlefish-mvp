import React from "react";
import "./CollectionCard.css";

const CollectionCard = ({ id, asset_name, description, image }) => {
  return (
    <div className="collectionCard">
      <img src={image} alt="" />
      <div className="details">
        <div className="name">
          {asset_name} <div className="id">.#{id}</div>
        </div>
      </div>
    </div>
  );
};
export default CollectionCard;