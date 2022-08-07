import React from "react";
import "./CollectionCard.css";

const CollectionCard = ({ id, asset_name, owner_name, description, image }) => {
  return (
    <div className="collectionCard">
      <img src={image} alt="" />
      <div className="details">
        <div className="name">
          {asset_name}{" "}
          <div>
            <i className="pi pi-user" style={{ fontSize: "1em" }}>
              {" "}
              {owner_name}{" "}
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CollectionCard;
