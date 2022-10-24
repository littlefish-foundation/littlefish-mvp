import React, { useEffect, useState } from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Badge,
  Collapse,
  Button,
  CardBody,
  Card,
  FormGroup,
  Input,
  Tooltip,
  UncontrolledCollapse,
} from "reactstrap";
import useFetchByActionID from "../Hooks/getActionByID";
import { FaUserAlt } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { GiSchoolOfFish } from "react-icons/gi";
import SuccessfulSaleCreation from "../components/UserInterface/Modal/SuccessfulSaleCreation";
import ErrorSaleCreation from "../components/UserInterface/Modal/ErrorSaleCreation";
import LoadingSaleCreation from "../components/UserInterface/Modal/LoadingSaleCreation";
import { RotatingLines } from "react-loader-spinner";
import Slider from "../components/Slider/Slider";
import StatusSyncModal from "../components/UserInterface/Modal/StatusSyncModal";
import LoadingStatusSyncModal from "../components/UserInterface/Modal/LoadingStausSyncModal";
import { LITTLEFISH_API_URL } from "../config.json";

import "../styles/nft-details.css";

const NftDetails = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataPost, setDataPost] = useState();

  const toggle = () => setIsOpen(!isOpen);

  const { _id } = useParams();
  const [price, setPrice] = useState();
  const [paymentLinks, setPaymentLinks] = useState(null);
  const [paymentLinkGet, setPaymentLinkGet] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [postStatus, setPostStatus] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null);

  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTip = () => setTooltipOpen(!tooltipOpen);

  const { actionData, loadingActionData } = useFetchByActionID(_id);

  console.log(price);
  console.log(actionData);

  const handlePriceInput = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${LITTLEFISH_API_URL}/action-sale/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actionID: actionData?._id, price: price }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPostStatus(Object.entries(data)[0][0]); // set some comments here about the role of this
        setErrorMessage(Object.entries(data)[0][1]);
        setPaymentLinks(data.sale.paymentLink);
        console.log(Object.entries(data)[0][0]);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });

    setShowModal(true);
  };
  console.log(postStatus);

  const handleActionStatusSync = () => {
    fetch(`${LITTLEFISH_API_URL}/action/${_id}/sync-status`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ status: actionData?.status }),
    })
      .then((response) => {
        console.log(response.status);
        setSyncStatus(response.status);
        return response.json();
      })
      .then((data) => console.log(data));

    setShowSyncModal(true);
  };

  // useEffect(() => {
  //   // set a function inside this hool to handle the status of the post
  //   fetch(`${LITTLEFISH_API_URL}/action-sale/${_id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPaymentLinkGet(data.paymentLink);
  //       console.log(paymentLinkGet);
  //     })
  //     .catch((err) => {
  //       console.log("Error:", err.message);
  //     });
  // }, [paymentLinkGet, paymentLinks]);
  console.log(paymentLinks);
  console.log(paymentLinkGet);
  console.log(dataPost);
  console.log(actionData?.types);
  console.log(syncStatus);

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
                  {actionData?.name}
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {actionData?.types?.map((type) => (
                    <Badge
                      style={{
                        marginBottom: "40px",
                      }}
                      color="primary"
                      pill
                    >
                      #{type}
                    </Badge>
                  ))}
                </div>

                <Row style={{ paddingLeft: "2%" }}>
                  <Col lg="6" md="6" sm="6">
                    <Slider />

                    <br />
                  </Col>
                  <br />

                  <Col lg="6" md="6" sm="6">
                    <div style={{ paddingRight: "86px", display: "block" }}>
                      {/* **********************************************************************************************
                       **********************************************************************************************
                       **********************************************************************************************
                       ********************************************************************************************** */}

                      <div className="nft__creator d-flex gap-3 align-items-center">
                        <FaUserAlt
                          style={{
                            color: "white",
                            fontSize: "2.5rem",
                            alignItems: "center",
                          }}
                        />{" "}
                        <Link
                          to={`/user/${actionData?.producerName}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <div className="creator__detail">
                            <h6>{actionData?.producerName} </h6>
                          </div>
                        </Link>
                      </div>
                      {/* **********************************************************************************************
                       **********************************************************************************************
                       **********************************************************************************************
                       ********************************************************************************************** */}
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
                          <p>Minimum Price: {actionData?.minimumPrice} ADA</p>

                          <p>Status: {actionData?.status}</p>
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
                          <p>
                            Creation Date:{" "}
                            {actionData?.createdAt.substring(0, 10)}
                          </p>
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

                      <div className="nft__creator d-flex gap-3 align-items-center">
                        <GiSchoolOfFish
                          style={{
                            color: "white",
                            fontSize: "3rem",
                          }}
                        ></GiSchoolOfFish>
                        <Link
                          to={`/colony/${actionData?.colony}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <div className="creator__detail">
                            <h6>{actionData?.colony}</h6>{" "}
                          </div>
                        </Link>
                      </div>

                      <br />
                      {actionData?.links.length > 0 ? (
                        <div>
                          <Button
                            id="toggler"
                            style={{
                              background: "rgb(52,52,67)",
                              border: "none",
                              width: "100%",
                              marginBottom: "1rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            View External Source Links
                          </Button>
                          <UncontrolledCollapse toggler="#toggler">
                            <Card
                              style={{
                                background: "rgb(52,52,67)",
                              }}
                            >
                              <CardBody>
                                {actionData?.links.map((link) => (
                                  <div>
                                    <a
                                      href={link.url}
                                      style={{
                                        textDecoration: "none",
                                        color: "rgb(49, 108, 244)",
                                        fontSize: "1rem",
                                        padding: "5px",
                                        borderRadius: "5px",
                                      }}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {link.urlName}
                                    </a>
                                  </div>
                                ))}
                              </CardBody>
                            </Card>
                          </UncontrolledCollapse>
                        </div>
                      ) : null}

                      {actionData?.files?.some(
                        (e) => e?.type === "application/pdf"
                      ) && (
                        <div>
                          <Button
                            id="togglers"
                            style={{
                              background: "rgb(52,52,67)",
                              border: "none",
                              width: "100%",
                              marginBottom: "1rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            View External Documents
                          </Button>
                          <UncontrolledCollapse toggler="#togglers">
                            <Card
                              style={{
                                background: "rgb(52,52,67)",
                              }}
                            >
                              <CardBody>
                                {actionData?.files?.map(
                                  (file) =>
                                    file?.type === "application/pdf" && (
                                      <a
                                        href={file?.src}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                          textDecoration: "none",
                                          color: "rgb(49, 108, 244)",
                                          fontSize: "1rem",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Document #
                                        {actionData?.files?.indexOf(file)}{" "}
                                        <br />
                                      </a>
                                    )
                                )}
                              </CardBody>
                            </Card>
                          </UncontrolledCollapse>
                        </div>
                      )}

                      <div style={{ marginLeft: "0px" }}>
                        <p
                          style={{
                            fontSize: "0.5rem",
                            lineHeight: "10px",
                            width: "83%",
                            fontWeight: "300",
                            fontFamily: "italic",
                          }}
                        >
                          First you need to create sale by clicking on "Reward
                          Action" and entering the price you are willing to pay.
                          After that you can click on the "Get Action" button
                          which will redirect you to the payment page.
                        </p>
                        <Button
                          color="primary"
                          onClick={() => setIsOpen(true)}
                          style={{
                            marginBottom: "0.7rem",
                            width: "45%",
                            height: "65px",
                          }}
                        >
                          Reward Action
                        </Button>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <Button
                          style={{
                            marginBottom: "0.7rem",
                            width: "45% ",
                            height: "65px",
                          }}
                          onClick={handleActionStatusSync}
                        >
                          Sync Status
                        </Button>
                        {syncStatus === 200 && showSyncModal && (
                          <StatusSyncModal
                            setShowSyncModal={setShowSyncModal}
                          />
                        )}
                        {syncStatus === null && showSyncModal && (
                          <LoadingStatusSyncModal
                            setShowSyncModal={setShowSyncModal}
                          />
                        )}
                      </div>

                      <Collapse className="collapse__card" isOpen={isOpen}>
                        <Card
                          color="light"
                          style={{
                            display: "flex",
                          }}
                        >
                          <CardBody>
                            <div>
                              <form>
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

                                <button
                                  className="singleNft-btn d-flex align-items-center gap-1"
                                  onClick={handleSubmit}
                                >
                                  <i className="ri-shopping-bag-line"></i>
                                  Create Sale
                                </button>
                                {postStatus === "success" ||
                                  (postStatus === "sale" && showModal && (
                                    <SuccessfulSaleCreation
                                      setShowModal={setShowModal}
                                      paymentLinkGet={paymentLinkGet}
                                      setIsOpen={setIsOpen}
                                      paymentLinks={paymentLinks}
                                    />
                                  ))}
                                {postStatus === "error" && showModal && (
                                  <ErrorSaleCreation
                                    errorMessage={errorMessage}
                                    setShowModal={setShowModal}
                                    setIsOpen={setIsOpen}
                                  />
                                )}
                                {postStatus === null && showModal && (
                                  <LoadingSaleCreation
                                    setShowModal={setShowModal}
                                  />
                                )}
                              </form>
                            </div>
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
