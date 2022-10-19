import React from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import useFetch2 from "../Hooks/useFetch2";
import "../styles/ColonyDetails.css";
import useGetUserProfileData from "../Hooks/getUserProfileData";
import ColonyGallery from "../components/colonies/ColonyGallery";
import cardanoIcon from "../assets/cardano.png";
import { RotatingLines } from "react-loader-spinner";
import UserProfileCard from "../components/userProfileCard/UserProfileCard";
import SubcolonyCard from "../components/UserInterface/Sub-colony-card/SubcolonyCard";
import useGetSubcolonies from "../Hooks/getSubcolonies";

const ColonyDetails = () => {
  const { name } = useParams();
  const { COLONY__DATA } = useFetch2();
  const { subcolonyData } = useGetSubcolonies();
  const singleColony = COLONY__DATA?.find((item) => item.name === name);
  console.log(singleColony);
  console.log(COLONY__DATA);
  console.log(subcolonyData);

  const { userProfileData, loadingProfileData } = useGetUserProfileData();
  const first10 = singleColony?.walletAddress.substring(0, 11);
  let lengthOfID = singleColony?.walletAddress.length;
  const last10 = singleColony?.walletAddress.substring(
    lengthOfID - 12,
    lengthOfID - 1
  );

  return (
    <div>
      {loadingProfileData ? (
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
        <div>
          <SubHeader />
          <section>
            <Container>
              <Row>
                <Col lg="4" md="4" sm="6">
                  <img
                    src={singleColony?.files[1].src}
                    alt=""
                    className="single__colony-img"
                  />
                </Col>

                <Col lg="6" md="4" sm="6">
                  <div className="single__colony__content">
                    <h2>{singleColony?.name}</h2>
                    <div className="colony__creator d-flex gap-3 align-items-center">
                      <div className="owner__detail">
                        <div>
                          <img
                            src={cardanoIcon}
                            alt=""
                            className="cardano__icon"
                          />
                          <Button className="wallet__id__btn">
                            {first10}..........{last10}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="my-4">{singleColony?.description}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="2" md="4" sm="6" className="mb-4">
                  <div className="social__links d-flex gap-3 align-items-center ">
                    <span>
                      <a href="https://github.com/littlefish-foundation">
                        <i className="ri-github-line"></i>
                      </a>
                    </span>
                    <span>
                      <a href="https://www.youtube.com/channel/UCqST3YotsWuc0faaqsLjdKQ/videos">
                        <i className="ri-youtube-line"></i>
                      </a>
                    </span>
                    <span>
                      <a href="https://twitter.com/LittleFishDAO">
                        <i className="ri-twitter-line"></i>
                      </a>
                    </span>
                    <span>
                      <a href="https://linktr.ee/littlefish.foundation">
                        <i className="ri-global-line"></i>
                      </a>
                    </span>
                    <span>
                      <a href="https://discord.gg/tBKZd5AGUS">
                        <i className="ri-discord-line"></i>
                      </a>
                    </span>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section>
            <Container>
              <Row
                style={{
                  borderBottom: "2px solid rgb(205,173,72)",
                  marginBottom: "15px",
                  marginTop: "2px",
                }}
              >
                <Col lg="12" style={{ marginBottom: "10px" }}>
                  <div className="seller__section-title">
                    <h3 style={{ color: "#fff" }}>Sub-Colonies</h3>
                  </div>
                </Col>
              </Row>
              <Row>
                {subcolonyData?.subs?.map((item) => (
                  <Col lg="3" md="4" sm="6">
                    <SubcolonyCard
                      item={item.sub}
                      coverImage={item.sub.coverImage.src}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
          <br />
          <ColonyGallery colony={singleColony?.name} />
        </div>
      )}
    </div>
  );
};

export default ColonyDetails;
