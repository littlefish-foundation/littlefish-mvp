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
    status,
  } = props.item;

  const createdat = createdAt?.substring(0, 10);

  const handleActionStatusLabel = () => {
    if (status === "UPLOADING_CONTENT") {
      return "Uploading Content";
    } else if (status === "FOR_SALE") {
      return "Ready to Mint";
    } else if (status === "RESERVED") {
      return "Reserved";
    } else {
      return "Minted";
    }
  };

  const typeRenderingLogic = () => {
    if (types.length <= 3) {
      return types?.map((type, index) => (
        <Badge
          color="primary"
          pill
          style={{ fontSize: "0.7rem", marginTop: "5px" }}
          key={index}
        >
          #{type} <br />
        </Badge>
      ));
    } else {
      return (
        <div>
          {types?.slice(0, 3)?.map((type, index) => (
            <Badge
              color="primary"
              pill
              style={{ fontSize: "0.7rem", marginTop: "5px" }}
              key={index}
            >
              #{type} <br />
            </Badge>
          ))}
          <Badge color="primary" pill style={{ fontSize: "0.7rem" }} index={3}>
            ...
          </Badge>
        </div>
      );
    }
  };

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
          <div>
            <h6>{name}</h6>

            <div className="creator__info">
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
              {typeRenderingLogic()}

              <br />
            </div>
          </div>
        </div>

        <div className="details">
          <div className="center">
            <div className="creator__info">
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
              </Col>
            </div>
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
              <div style={{ marginRight: "8px" }}>{description}</div>
            </div>
            <br />
            <div style={{ display: "inline-flex" }}>
              <Badge
                color="gold"
                style={{
                  marginLeft: "10px",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                {handleActionStatusLabel()}
              </Badge>
              <Badge
                color="gold"
                style={{
                  marginLeft: "10px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <img
                  src={cardanoIcon}
                  alt=""
                  className="cardano__icon__price"
                />
                {minimumPrice} ₳
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NftCard;
