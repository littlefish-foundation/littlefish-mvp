import React from "react";
import CommonSection from "../../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
//import NFT__DATA from "../assets/data/NFT__DATA";
import useFetch2 from "../../assets/data/useFetch2";
import "./ColonyDetails.css";
import ColonyMembership from "./ColonyMembership";
import { Link } from "react-router-dom";
import ColonyGallery from "./ColonyGallery";
const ColonyDetails = () => {
  const { name } = useParams();
  const { COLONY__DATA } = useFetch2("http://185.203.34.66:8080/colony/");

  const singleColony = COLONY__DATA?.find((item) => item.name === name);

  return (
    <div>
      <CommonSection assetName={singleColony?.name} />

      <section>
        <Container>
          <Row>
            <Col lg="4" md="6" sm="6">
              <img
                src={singleColony?.files[1].src}
                alt=""
                className="single__colony-img"
              />
            </Col>

            <br />

            <Col lg="6" md="6" sm="6">
              <div className="single__colony__content">
                <h2>{singleColony?.name}</h2>

                <div className="colony__creator d-flex gap-3 align-items-center">
                  <div className="creator__detail">
                    <p>wallet Address:</p>
                    <h6>{singleColony?.walletAddress}</h6>
                  </div>
                </div>

                <p className="my-4">{singleColony?.description}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="3" md="6" sm="6" className="mb-4">
              {/*<input type="text" className="newsletter" placeholder="Email" />*/}
              <div className="social__links d-flex gap-3 align-items-center ">
                <span>
                  <Link to="#">
                    <i className="ri-github-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-youtube-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-twitter-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-telegram-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-discord-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-internet-line"></i>
                  </Link>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ColonyMembership name={name}/>
      <ColonyGallery />
      
    </div>
  );
};

export default ColonyDetails;
