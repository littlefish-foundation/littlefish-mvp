import React from "react";
import { Link } from "react-router-dom";
import "./ColonyCard.css";
import "../../components/ui/Live-auction/live-auction.css";

const ColonyCard = (props) => {
  const { coverImage, name } = props.item;
  return (
    <div className="single__colony__card">
      <div className="nft__img">
        <img src={coverImage.src} alt="" className="w-100" />
      </div>

      <div className="colony__content">
        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <div className="hero__btns d-flex align-items-center gap-4">
            <button className=" explore__btn d-flex align-items-center gap-2">
              <i className="ri-rocket-line"></i>{" "}
              <Link to={`/colony/${name}`}>Explore the Colony</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ColonyCard;
