import React from "react";
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
import "../styles/nft-details.css";

const NftDetails = () => {
  const { _id, price, actionCollection } = useParams();

  const { actionData } = useFetchByActionID(
    `https://api.littlefish.foundation/action/${_id}`
  );

  /*"https://buy.tangocrypto.com?q=test_eyJjb2xsZWN0aW9uX2lkIjoiMDFnYzk2Z2thZmpycjE4NGhiYTE3cjdldjgiLCJwcmljZSI6MTIzNDAwMDAwMCwicmVzZXJ2YXRpb25fdGltZSI6MzAwMDAwLCJzYWxlX2lkIjoiMDFnY2M2NmhiamZlNGVjZzRyczlxOW5qbmYiLCJzdXBwbHkiOjEsImFzc2V0X25hbWUiOiJtYW55IGZpc2ggaW4gdGhlIG9jZWFuIiwiaW1hZ2UiOiJpcGZzOi8vUW1TclBwZlZkaEdGenNGYjFmeTR2TXpxSmpMd241RGtvZHlGZ1RqWURnWWtOYSIsInF1YW50aXR5IjoxLCJydWxlcyI6W10sInR5cGUiOiJTYWxlIiwiaXNfcmFuZG9tIjpmYWxzZSwidGl0bGUiOiJtYW55IGZpc2ggaW4gdGhlIG9jZWFuQ29sbGVjdGlvbiIsInRjYyI6InFYK3BnSVJtNEJuYlVUdlJxc3hrSzdIMFV2OXdVaU5PekdDdDE3S0YzNXFSSlFIYnFqRmh2ZVlpVkhsdGFLL1FKUVBHekhVVXZvQXRHT21Nbk9jV2RuL0FQQlB1aFJkb2J4YXJ2TStwVXNRaWo3MUlrbjRoeEVqVVVGRFZBZz09IiwibWF4X3R4X2ZlZSI6ODc2Mjc3LCJuZnRfY29zdCI6MzQ0ODJ9"*/

  console.log(actionData);

  //const singleNft = NFT__DATA?.find((item) => item._id === _id);

  const { paymentLink } = useCreatePaymentLink(
    actionData?._id,
    actionData?.price
  );

  const { paymentLink1 } = useGetPaymentLink(actionData?._id);

  console.log(paymentLink);
  return (
    <div>
      <SubHeader assetName={actionData?.assetName} />

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={actionData?.image}
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
                    <h6>Price: {actionData?.price} ADA</h6>
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
                      Creation Date: {actionData?.createdAt.substring(0, 10)}
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
                <button className="singleNft-btn d-flex align-items-center gap-1">
                  <i className="ri-shopping-bag-line"></i>
                  <a
                    href={paymentLink || paymentLink1}
                    target="_blank"
                    rel="noreferrer"
                  >
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
