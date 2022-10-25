import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

import "./nft-card.css";

const NftCard = (props) => {
  const {
    _id,
    name,
    image,
    producerName,
    minimumPrice,
    createdAt,
    types,
  } = props.item;

  const createdat = createdAt?.substring(0, 10);

  return (
    <Link
      to={`/action/${_id}`}
      style={{ textDecoration: "none", color: "rgb(245,243,235)" }}
      key={_id}
    >
      <div className="single__nft__card">
        <div className="nft__img">
          <img src={image} alt="" className="w-100" />
        </div>

        {/* <div className="nft__content"> */}
        <div className="details">
          <div className="center">
            {/* <h5>{name.length <= 20 ? name : name.slice(0, 20) + "..."}</h5> */}
            <h5>{name}</h5>
            <br></br>

            <div className="creator__info-wrapper d-flex gap-3">
              <div className="creator__info w-100 d-flex align-items-center justify-content-between">
                <div>
                  <h6>Created By:</h6>
                  <h6>
                    {" "}
                    {producerName.length <= 9
                      ? producerName
                      : producerName.slice(0, 9) + "..."}
                  </h6>
                </div>
                <br></br>
                <div>
                  <h6>Minimum Price: </h6>
                  <h6>{`${minimumPrice} ADA`}</h6>
                </div>
                <br></br>
                <div>
                  <span className="history__link">
                    <h6>Created:</h6>
                    <h6>{createdat}</h6>
                  </span>
                </div>
              </div>
            </div>
            <br></br>

            <div className=" mt-3 d-flex align-items-center justify-content-between">
              <div>
                {types?.map((type, index) => (
                  <Badge color="primary" pill key={index}>
                    #{type}
                  </Badge>
                ))}
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NftCard;
