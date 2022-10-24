import React from "react";
import { Link } from "react-router-dom";
import "../UserInterface/Nft-card/nft-card.css";
import { Badge } from "reactstrap";

const ActionModal = (props) => {
  const { _id, name, producerName, minimumPrice, types, createdAt } =
    props.item;
  const image64 = window.bas64Data;

  const createdat = createdAt?.substring(0, 10);

  return (
    <Link to={`/action/${_id}`} style={{ textDecoration: "none" }}>
      <div className="single__nft__card">
        <div className="nft__img">
          <img src={image64} alt="" className="w-100" />
        </div>

        <div className="nft__content">
          <h5 className="nft__title">{name}</h5>

          <div className="creator__info-wrapper d-flex gap-3">
            <div className="creator__info w-100 d-flex align-items-center justify-content-between">
              <div>
                <h6>Created By</h6>
                <p>{producerName}</p>
              </div>

              <div>
                <h6>Minimum Action Price</h6>
                <h6>{`${minimumPrice} ADA`}</h6>
              </div>
            </div>
          </div>

          <div className=" mt-3 d-flex align-items-center justify-content-between">
            <div>
              {types?.slice(0, 1)?.map((type) => (
                <Badge color="primary" pill key={type._id}>
                  #{type}
                </Badge>
              ))}
              ...
            </div>

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

export default ActionModal;
