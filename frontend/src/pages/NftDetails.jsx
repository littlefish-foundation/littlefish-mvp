import React from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../Hooks/useFetch";
import useFetch3 from "../Hooks/useFetch3";
import { FaUserAlt } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { GiSchoolOfFish } from "react-icons/gi";
import "../styles/nft-details.css";

const NftDetails = () => {
  const { assetName } = useParams();
  const { NFT__DATA } = useFetch("https://api.littlefish.foundation/action/");

  const singleNft = NFT__DATA?.find((item) => item.assetName === assetName);
  const { paymentLink } = useFetch3(
    NFT__DATA,
    assetName,
    singleNft?.price,
    singleNft?.actionCollection
  );

  return (
    <div>
      <SubHeader assetName={singleNft?.assetName}></SubHeader>

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={singleNft?.image}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>
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
                    <h6>Created By: {singleNft?.ownerName} </h6>
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
                    <h6>Price: {singleNft?.price} ADA</h6>
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
                      Creation Date: {singleNft?.createdAt.substring(0, 10)}
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
                    <p>{singleNft?.description}</p>
                  </div>
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
                <div className="creator__detail">
                  <p>littlefish Foundation</p>{" "}
                  {/*this is temporary until ready from backend*/}
                </div>
              </div>

              <br />

              <div>
                <button className="singleNft-btn d-flex align-items-center gap-1">
                  <i className="ri-shopping-bag-line"></i>
                  <a href={paymentLink} target="_blank" rel="noreferrer">
                    Reward This Action
                  </a>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default NftDetails;
