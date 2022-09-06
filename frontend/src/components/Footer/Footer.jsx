import React from "react";
import abstract from "../../assets/avatarsAndImages/abstract.png";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import "./footer.css";

import { Link } from "react-router-dom";

const MY__ACCOUNT = [
  {
    display: "Create Action",
    url: "/create",
  },
  {
    display: "Action Collections",
    url: "/market",
  },

];

const RESOURCES = [
  {
    display: "Colonies",
    url: "#",
  },
  {
    display: "Partners",
    url: "#",
  },
  {
    display: "Community",
    url: "#",
  },
  {
    display: "Activities",
    url: "#",
  },
];

const COMPANY = [
  {
    display: "About us",
    url: "#",
  },
  {
    display: "Join us",
    url: "#",
  },
  {
    display: "Contact Us",
    url: "/contact",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" sm="6" className="mb-4">
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
          </Col>

          <Col lg="2" md="3" sm="6" className="mb-4">
            <h5>Activities</h5>
            <ListGroup className="list__group">
              {MY__ACCOUNT.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}> {item.display} </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="2" md="3" sm="6" className="mb-4">
            <h5>Resources</h5>
            <ListGroup className="list__group">
              {RESOURCES.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}> {item.display} </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="2" md="3" sm="6" className="mb-4">
            <h5>Organization</h5>
            <ListGroup className="list__group">
              {COMPANY.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}> {item.display} </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6" sm="6" className="mb-4">
            <h5>Follow us</h5>
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
