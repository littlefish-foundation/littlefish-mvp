import React from "react";
import { CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./userProfileCard.css";

const UserProfileCard = (props) => {
  const { _id, name, walletAddress, colony, avatar, bio, createdAt } =
    props.item;
  return (
    <Link
      to={`/user/${name}`}
      style={{ textDecoration: "none", color: "white" }}
    >
      <div className="single__user__card">
        <div className="user__img">
          <img alt="Sample" src={avatar} />
        </div>
        <CardBody>
          <br />
          <h5 className="user__title">{name}</h5>
        </CardBody>
      </div>
    </Link>
  );
};

export default UserProfileCard;
