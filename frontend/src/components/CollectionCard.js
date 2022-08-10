import React from "react";
import "./CollectionCard.css";

const CollectionCard = ({ id, assetName, ownerName, description, image }) => {
  return (
    <div className="collectionCard">
      <img src={image} alt="" />
      <div className="details">
        <div className="name">
          {assetName}{" "}
          <div>
            <i className="pi pi-user" style={{ fontSize: "1em" }}>
              {" "}
              {ownerName}{" "}
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CollectionCard;
