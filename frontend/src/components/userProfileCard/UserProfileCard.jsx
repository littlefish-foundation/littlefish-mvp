import React from "react";
import { CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./userProfileCard.css";
import { FaUserAlt } from "react-icons/fa";

const UserProfileCard = (props) => {
  const { name, avatar } = props.item;
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

          <div className="user__title">
            <FaUserAlt
              style={{
                color: "white",
                fontSize: "1.3rem",
                alignItems: "center",
              }}
            />
            &nbsp;&nbsp;
            <h5>{name}</h5>
          </div>
        </CardBody>
      </div>
    </Link>
  );
};

export default UserProfileCard;
