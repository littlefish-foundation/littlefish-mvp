import React from "react";
import { Link } from "react-router-dom";
import "./ColonyCard.css";

const ColonyCard = (props) => {
  const { coverImage, name } = props.item;
  return (
    <div className="single__colony__card">
      <div className="colony__img">
        <img src={coverImage.src} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="colony__name">{name}</h5>
        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button className="explore__btn d-flex align-items-center gap-2">
            <i className="ri-rocket-line"></i>{" "}
            <Link to={`/colony/${name}`}>Explore the Colony</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ColonyCard;
