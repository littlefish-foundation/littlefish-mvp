import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";
import Modal from "../Modal/Modal";

const NftCard = (props) => {
  const { assetName, image, ownerName, price, createdAt } = props.item;

  const createdat = createdAt.substring(0, 10);

  console.log(createdat);

  const [showModal, setShowModal] = useState(false);
  //const { NFT__DATA } = useFetch("https://api.littlefish.foundation/action");

  return (
    <Link to={`/action/${assetName}`} style={{ textDecoration: "none" }}>
      <div className="single__nft__card">
        <div className="nft__img">
          <img src={image} alt="" className="w-100" />
        </div>

        <div className="nft__content">
          <h5 className="nft__title">{assetName}</h5>

          <div className="creator__info-wrapper d-flex gap-3">
            <div className="creator__info w-100 d-flex align-items-center justify-content-between">
              <div>
                <h6>Created By</h6>
                <p>{ownerName}</p>
              </div>

              <div>
                <h6>Action Price</h6>
                <h6>{`${price} ADA`}</h6>
              </div>
            </div>
          </div>

          <div className=" mt-3 d-flex align-items-center justify-content-between">
            <button
              className="bid__btn d-flex align-items-center gap-1"
              onClick={() => {}}
            >
              <i className="ri-shopping-bag-line"></i> Buy Action
            </button>

            {showModal && <Modal setShowModal={setShowModal} />}
            <span className="history__link">
              <h6>Creation Date</h6>
              <h6>{createdat}</h6>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NftCard;
