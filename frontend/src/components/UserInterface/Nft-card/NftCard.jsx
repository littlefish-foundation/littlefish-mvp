import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Col, Card } from "reactstrap";
import { FaUserAlt } from "react-icons/fa";
import "./nft-card.css";
import { FaFish } from "react-icons/fa";
import cardanoIcon from "../../../assets/cardano.png";
import { MdDescription } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import AdaConverter from "../../adaConverter/adaConverter";

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

  const { price } = AdaConverter();
  console.log(price);

  const year = createdAt?.substring(0, 4);
  const month = createdAt?.substring(5, 7);
  const days = createdAt?.substring(8, 10);
  let monthName = months[month - 1];
  let dateFormat = monthName + " " + days + ", " + year;

  const handleActionStatusLabel = () => {
    if (status === "UPLOADING_CONTENT") {
      return "Uploaded";
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

  const actionTypesOnMouseOver = () => {
    if (types.length > 3) {
      return (
        <div>
          <Badge color="primary" pill style={{ fontSize: "0.7rem" }}>
            ...
          </Badge>

          {types?.slice(3, types.length)?.map((type, index) => (
            <Badge
              color="primary"
              pill
              style={{ fontSize: "0.7rem", marginTop: "5px" }}
              key={index}
            >
              #{type} <br />
            </Badge>
          ))}
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
            {actionTypesOnMouseOver()}
            <br />
            <div className="creator__info">
              <Col
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <h6>
                  <FaUserAlt
                    style={{
                      color: "white",
                      fontSize: "0.7rem",
                      marginLeft: "2px",
                    }}
                  />
                  &nbsp;&nbsp;
                  {producerName}
                </h6>
              </Col>
            </div>
            <br />

            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Badge
                color="gold"
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginLeft: "0px",
                  paddingLeft: "0px",
                }}
              >
                <img
                  src={cardanoIcon}
                  alt=""
                  className="cardano__icon__price"
                />
                &nbsp;&nbsp;
                {minimumPrice} ₳ (≈{Math.round(price * minimumPrice)} $)
              </Badge>
              <Badge
                color="gold"
                style={{
                  marginLeft: "0px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                {handleActionStatusLabel()}
              </Badge>
            </div>
            <br />

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Badge
                color="gold"
                style={{
                  marginLeft: "2px",
                  display: "flex",
                  justifyContent: "end",
                  paddingLeft: "0px",
                }}
              >
                <BsCalendarDateFill
                  style={{
                    color: "white",
                    fontSize: "0.7rem",
                    marginLeft: "0px",
                  }}
                />
                &nbsp;&nbsp;
                {dateFormat}
              </Badge>
            </div>

            <br />
            <div className="creator__info">
              <Col
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginLeft: "2px",
                }}
              >
                <div style={{ fontSize: "0.8rem" }}>
                  {" "}
                  <MdDescription
                    style={{
                      justifyContent: "start",
                      fontSize: "0.9rem",
                      marginLeft: "0px",
                    }}
                  />
                  &nbsp;&nbsp;
                  {description}
                </div>
              </Col>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NftCard;
