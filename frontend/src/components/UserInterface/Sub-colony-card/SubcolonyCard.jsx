import React from "react";
import "./subcolonyCard.css";
import { Container, Button, Card, CardText, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const SubcolonyCard = (props) => {
  const { name, description } = props.item;
  const coverImage = props.coverImage;
  return (
    <div>
      <Link
        to={`/subcolony/${name}`}
        style={{ textDecoration: "none", color: "rgb(245,243,235)" }}
      >
        <Card
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
        </Card>
      </Link>
    </div>
  );
};

export default SubcolonyCard;
