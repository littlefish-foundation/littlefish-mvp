import React from "react";
import "./subcolonyCard.css";
import placeholder from "../../../assets/placeholder.png";
import { Container, Button, Card, CardText, CardBody } from "reactstrap";

const SubcolonyCard = (props) => {
  // const {

  //     name,
  //     image,
  //     producerName,
  //     minimumPrice,
  //     createdAt,
  //     types,
  //     colony,
  //   } = props.item;
  return (
    <div>
      <Card
        style={{
          background: "inherit",
          margin: "50px",
          border: "1px solid #fff",
          width: "18rem",
        }}
      >
        <img
          src={placeholder}
          alt="placeholder"
          style={{ width: "100%", borderRadius: "5%" }}
        />

        <CardText>The Forge &nbsp;</CardText>
      </Card>
    </div>
  );
};

export default SubcolonyCard;
