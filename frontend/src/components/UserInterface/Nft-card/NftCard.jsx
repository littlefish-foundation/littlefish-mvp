import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Col } from "reactstrap";
import { FaUserAlt } from "react-icons/fa";
import "./nft-card.css";
import { FaFish } from "react-icons/fa";
import cardanoIcon from "../../../assets/cardano.png";
import { MdDescription } from "react-icons/md";

const NftCard = (props) => {
  const {
    _id,
    name,
    image,
    producerName,
    minimumPrice,
    createdAt,
    types,
    colony,
    description,
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

        <div className="nft__content">
          {/* <div className="details"> */}
          <div>
            <h5>{name.length <= 20 ? name : name.slice(0, 20) + "..."}</h5>

            <div className="creator__info">
              <h6>
                <FaUserAlt
                  style={{
                    color: "white",
                    fontSize: "0.7rem",
                  }}
                />
                &nbsp;&nbsp;
                {producerName}
              </h6>

              <h6>
                <FaFish
                  style={{
                    color: "white",
                    fontSize: "0.7rem",
                  }}
                />
                &nbsp;&nbsp;
                {colony}
              </h6>
            </div>

            <div>
              <Badge color="primary" pill style={{ fontSize: "0.7rem" }}>
                {types[0].length > 15
                  ? types[0].slice(0, 15) + "..."
                  : types[0]}
              </Badge>
              <Badge color="primary" pill style={{ fontSize: "0.7rem" }}>
                ...
              </Badge>

              <Badge color="gold" style={{ marginLeft: "10px" }}>
                <img
                  src={cardanoIcon}
                  alt=""
                  className="cardano__icon__price"
                />
                {minimumPrice} ₳
              </Badge>
              <br />
            </div>
          </div>
        </div>

        <div className="details">
          <div className="center">
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1px",
              }}
            >
              Action Types:
            </p>
            {types?.map((type, index) => (
              <Col
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Badge
                  color="primary"
                  pill
                  style={{ fontSize: "0.7rem", marginTop: "5px" }}
                  key={index}
                >
                  #{type} <br />
                </Badge>
              </Col>
            ))}
            <br />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "0.7rem",
              }}
            >
              <div>
                <MdDescription
                  style={{ height: "25px", width: "25px", marginRight: "8px" }}
                />{" "}
              </div>
              <div>{description}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NftCard;
