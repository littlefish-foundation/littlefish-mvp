import React, { useEffect, useState } from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import useFetchByActionID from "../Hooks/getActionByID";
import { FaUserAlt } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { GiSchoolOfFish } from "react-icons/gi";
import { Collapse, Button, CardBody, Card, FormGroup, Input } from "reactstrap";
import { RotatingLines } from "react-loader-spinner";
import Slider from "../components/Slider/Slider";

import "../styles/nft-details.css";

const NftDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataPost, setDataPost] = useState();
  const toggle = () => setIsOpen(!isOpen);
  const { _id } = useParams();
  const [price, setPrice] = useState();
  const [paymentLinks, setPaymentLinks] = useState(null);
  const [paymentLinkGet, setPaymentLinkGet] = useState(null);

  const { actionData, loadingActionData } = useFetchByActionID(
    `https://api.littlefish.foundation/action/${_id}`
  );

  console.log(price);
  console.log(actionData);

  const handlePriceInput = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
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
        setPaymentLinks(data.sale.paymentLink);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });
  };

  useEffect(() => {
    fetch(`https://api.littlefish.foundation/action-sale/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPaymentLinkGet(data.paymentLink);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });
  }, [paymentLinks, paymentLinkGet]);
  console.log(paymentLinks);
  console.log(dataPost);

  return (
    <div>
      {loadingActionData ? (
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
        <React.Fragment>
          <SubHeader />
          <section>
            <Container>
              <div
                style={{
                  border: "2px solid  rgba(221, 221, 221, 0.171)",
                  borderRadius: "2%",
                  paddingTop: "10px",
                  paddingLeft: "60px",
                }}
              >
                <h2
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "30px ",
                  }}
                >
                  {actionData?.assetName}
                </h2>
                <Row style={{ paddingLeft: "2%" }}>
                  <Col lg="6" md="6" sm="6">
                    <Slider />
                  </Col>
                  <br />

                  <Col lg="6" md="6" sm="6">
                    <div style={{ paddingRight: "86px", display: "block" }}>
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
                      <br />
                      <Link
                        to={`/colony/${actionData?.colony}`}
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
                          </div>
                        </div>
                      </Link>
                      <br />
                      <div style={{ marginLeft: "100px" }}>
                        <Button
                          color="primary"
                          onClick={toggle}
                          style={{
                            marginBottom: "0.7rem",
                            width: "35%",

                            height: "65px",
                          }}
                          // className="singleNft-btn d-flex align-items-center gap-1"
                        >
                          Reward Action
                        </Button>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <a
                          href={paymentLinkGet}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            color="success"
                            style={{
                              marginBottom: "0.7rem",
                              width: "35% ",
                              height: "65px",
                            }}
                          >
                            <i className="ri-shopping-bag-line"></i>
                            Get Action
                          </Button>
                        </a>
                      </div>
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
                                  actionData?.minimumPrice > price
                                    ? true
                                    : false
                                }
                                style={{ background: "ingerit" }}
                                type="number"
                                delay="3000"
                                placeholder="The value must be > than, or = to the min price"
                                onChange={handlePriceInput}
                                value={price}
                              />
                            </FormGroup>

                            <a
                              href={paymentLinks}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <button
                                className="singleNft-btn d-flex align-items-center gap-1"
                                //onClick={handleSubmit}
                              >
                                <i className="ri-shopping-bag-line"></i>
                                Create Sale
                              </button>
                            </a>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </React.Fragment>
      )}
    </div>
  );
};

export default NftDetails;
