import React, {  useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";
import Modal from "../Modal/Modal";

const NftCard = (props) => {
  const { assetName, image, ownerName, price } = props.item;

  const [showModal, setShowModal] = useState(false);
  //const { NFT__DATA } = useFetch("http://localhost:8000/action");


  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={image} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/action/${assetName}`}>{assetName}</Link>
        </h5>

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
            onClick={() => {
            
            } }
          >
            <i className="ri-shopping-bag-line"></i> Buy Action
          </button>

          {showModal && <Modal setShowModal={setShowModal} />}

         
        </div>
      </div>
    </div>
  );
};

export default NftCard;
