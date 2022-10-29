import React from "react";
import "./subcolonyCard.css";
import { Card, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { FaFish } from "react-icons/fa";

const SubcolonyCard = (props) => {
  const { name } = props.item;
  const coverImage = props.coverImage;
  return (
    <div>
      <Link
        to={`/subcolony/${name}`}
        style={{ textDecoration: "none", color: "rgb(245,243,235)" }}
      >
        <div className="single__subcolony__card">
          <div className="subcolony__img">
            <img src={coverImage} alt="" className="w-100" />
          </div>
          <div className="subcolony__content">
            <h5>{name}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SubcolonyCard;

{
  /* <Card
style={{
  background: "rgb(55,60,78)",
  //margin: "50px",
  //border: "5px solid rgb(53,52,67)",
  width: "18rem",
}}
>
<img
  src={coverImage}
  alt="placeholder"
  style={{
    width: "100%",
    borderRadius: "2%",
    height: "123px",
    objectFit: "cover",
  }}
/>

<CardText style={{ display: "flex", justifyContent: "center" }}>
  {name} &nbsp;
</CardText>
</Card> */
}
