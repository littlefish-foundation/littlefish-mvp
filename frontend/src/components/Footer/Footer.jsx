import React from "react";
import abstract from "../../assets/abstract.png";
import { Container, Row, Col } from "reactstrap";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="12" md="6" sm="6" className="mb-4">
            <div className="logo">
              <h2 className=" d-flex gap-2 align-items-center ">
                <span>
                  <div className="abstractLogo">
                    <img
                      src={abstract}
                      className="abstractLogo"
                      alt="Abstract Collection Logo"
                    />
                  </div>
                </span>
                | littlefish
              </h2>
            </div>

            <div className="social__links d-flex gap-3 align-items-center ">
              <span>
                <Link to="https://github.com/littlefish-foundation">
                  <i className="ri-github-line"></i>
                </Link>
              </span>
              <span>
                <Link to="https://www.youtube.com/channel/UCqST3YotsWuc0faaqsLjdKQ/videos">
                  <i className="ri-youtube-line"></i>
                </Link>
              </span>
              <span>
                <Link to="https://twitter.com/LittleFishDAO">
                  <i className="ri-twitter-line"></i>
                </Link>
              </span>
              <span>
                <Link to="https://linktr.ee/littlefish.foundation">
                  <i className="ri-global-line"></i>
                </Link>
              </span>
              <span>
                <Link to="https://discord.gg/tBKZd5AGUS">
                  <i className="ri-discord-line"></i>
                </Link>
              </span>
            </div>
          </Col>

          <Col lg="12" className=" mt-4 text-center">
            <p className="copyright"> Copyrights 2022, All Rights Reserved. </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
