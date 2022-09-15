import React from "react";

import { CardBody, CardText } from "reactstrap";

import "./userProfileCard.css";

const UserProfileCard = (props) => {
  const { key, image, name } = props.item;
  return (
    <div className="single__user__card">
      <div className="user__img">
        <img alt="Sample" src={image} />
      </div>
      <CardBody>
        <br />
        <h5 className="user__title">{name}</h5>

        <CardText></CardText>
      </CardBody>
    </div>
  );
};

export default UserProfileCard;

/*
<div className="nft__content">
<h5 className="nft__title">{assetName}</h5>
</div>

<div className=" mt-3 d-flex align-items-center justify-content-between">
  <button
    className="bid__btn d-flex align-items-center gap-1"
    onClick={() => {}}
  >
    <i className="ri-shopping-bag-line"></i> Reward Action
  </button>

  {showModal && <Modal setShowModal={setShowModal} />}
  <span className="history__link">
    <h6>Creation Date</h6>
    <h6>{createdat}</h6>
  </span>
</div>
</div>
*/
