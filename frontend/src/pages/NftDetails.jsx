import React, { useState } from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import useFetchByActionID from "../Hooks/getActionByID";
import useCreatePaymentLink from "../Hooks/createPaymentLink";
import useGetPaymentLink from "../Hooks/getPaymentLink";
import { FaUserAlt } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { GiSchoolOfFish } from "react-icons/gi";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
//import { RotatingLines } from "react-loader-spinner";
import Slider from "../components/Slider/Slider";

import "../styles/nft-details.css";

const NftDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { _id, minimumPrice, actionCollection } = useParams();
  const [price, setPrice] = useState();
  //const [actionID, setActionID] = useState();

  const { actionData, loadingActionData } = useFetchByActionID(
    `https://api.littlefish.foundation/action/${_id}`
  );

  console.log(price);
  console.log(actionData);
  // const { paymentLink } = useCreatePaymentLink(
  //   "https://api.littlefish.foundation/action-sale/",
  //   {
  //     actionID: actionData?._id,
  //     price: price,
  //   }
  // );

  const { paymentLink1 } = useGetPaymentLink(
    `https://api.littlefish.foundation/action-sale/${actionData?._id}`
  );

  // console.log(paymentLink);
  console.log(paymentLink1);

  const handlePriceInput = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://api.littlefish.foundation/action-sale/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actionID: actionData?._id, price: price }),
    })
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });

    console.log();
  };

  return (
    <div>
      {/*loadingActionData ? (
        <div className="loader-container">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <>        </>
      )*/}
          <SubHeader assetName={actionData?.assetName} />

          <section>
            <Container>
              <Row style={{ paddingLeft: "90px" }}>
                <Col lg="5">
                  <Slider />
                </Col>
                <br />
                <Col lg="1" />

                <Col lg="6">
                  <div>
                    <div className="nft__creator d-flex gap-3 align-items-center">
                      <FaUserAlt
                        style={{
                          color: "white",
                          fontSize: "2.5rem",
                          alignItems: "center",
                        }}
                      />{" "}
                      <div className="creator__detail">
                        <h6>Created By: {actionData?.ownerName} </h6>
                      </div>
                    </div>

                    <br />

                    <div className="nft__creator d-flex gap-3 align-items-center">
                      <IoMdPricetags
                        style={{
                          color: "white",
                          fontSize: "2.5rem",
                          alignItems: "center",
                        }}
                      />
                      <div className="creator__detail">
                        <h6>Minimum Price: {actionData?.minimumPrice} ADA</h6>
                      </div>
                    </div>

                    <br />

                    <div className="nft__creator d-flex gap-3 align-items-center">
                      <BsCalendarDateFill
                        style={{
                          color: "white",
                          fontSize: "2.5rem",
                          alignItems: "center",
                        }}
                      />

                      <div className="creator__detail">
                        <h6>
                          Creation Date:{" "}
                          {actionData?.createdAt.substring(0, 10)}
                        </h6>
                      </div>
                    </div>

                    <br />

                    <div className="nft__creator d-flex gap-3 align-items-center">
                      <div className="creator__detail">
                        <MdDescription
                          style={{
                            color: "white",
                            fontSize: "3rem",
                          }}
                        ></MdDescription>
                        <p>{actionData?.description}</p>
                      </div>
                    </div>
                  </div>

                  <br />

                  <Link
                    to={`/colony/Littlefish%20Foundation`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <div className="nft__creator d-flex gap-3 align-items-center">
                      <GiSchoolOfFish
                        style={{
                          color: "white",
                          fontSize: "3rem",
                        }}
                      ></GiSchoolOfFish>
                      <div className="creator__detail">
                        <p>littlefish Foundation</p>{" "}
                        {/* Temporarily Adjusted. This will change when depending on backend */}
                      </div>
                    </div>
                  </Link>

                  <br />

                  <div>
                    <Button
                      color="primary"
                      onClick={toggle}
                      style={{ marginBottom: "1rem" }}
                      // className="singleNft-btn d-flex align-items-center gap-1"
                    >
                      Reward This Action
                    </Button>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button color="success" style={{ marginBottom: "1rem" }}>
                      <i className="ri-shopping-bag-line"></i>
                      <a href={paymentLink1} target="_blank" rel="noreferrer">
                        Get Payment Link
                      </a>
                    </Button>
                    <Collapse className="collapse__card" isOpen={isOpen}>
                      <Card
                        color="light"
                        style={{
                          display: "flex",
                        }}
                      >
                        <CardBody>
                          <FormGroup
                            style={{ backgroundColor: "rgb(53,52,67)" }}
                          >
                            <Input
                              invalid={
                                actionData?.minimumPrice > price ? true : false
                              }
                              style={{ background: "ingerit" }}
                              type="text"
                              placeholder="The value must be > than, or = to the min price"
                              onChange={(e) => setPrice(e.target.value)}
                              value={price}
                            />
                          </FormGroup>

                          <button
                            className="singleNft-btn d-flex align-items-center gap-1"
                            onClick={handleSubmit}
                          >
                            <i className="ri-shopping-bag-line"></i>
                            {/*<a href={paymentLink1} target="_blank" rel="noreferrer">
                          
                        </a>*/}
                            Create Sale
                          </button>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

    </div>
  );
};

export default NftDetails;

{
  /**/
}
