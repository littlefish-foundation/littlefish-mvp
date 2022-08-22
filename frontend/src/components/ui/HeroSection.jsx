import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";

import heroImg from "../../assets/proofOfActivity.jpeg";

const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2>Welcome to Littlefish foundation.</h2>
              <p>
                <span>Actions are Proof of Activity. </span> They contain
                information showing that something has been done to impact the
                world. Once generated, an Action can be sold by the colony to
                generate funding. Reasons for buying an Actiom:{" "}
              </p>
              <p>
                <span>Buying an Action supports the colony,</span> incentivizing
                them to continue performing similar actions. In this manner
                buying is akin to donating.{" "}
              </p>
              <p>
                <span>Actions represent values.</span> Buying an action means
                you support the activity the action represents. It signals the
                buyers’ values.{" "}
              </p>
              <p>
                <span>Actions can be resold.</span> They may be investments. For
                example an Action representing the act of writing the first
                draft of a Whitepaper could be worth much more if the project
                takes off.
              </p>
              <div className="hero__btns d-flex align-items-center gap-4">
                <button className=" explore__btn d-flex align-items-center gap-2">
                  <i className="ri-rocket-line"></i>{" "}
                  <Link to="/market">Explore</Link>
                </button>
                <button className=" create__btn d-flex align-items-center gap-2">
                  <i className="ri-ball-pen-line"></i>
                  <Link to="/create">Generate</Link>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              <img src={heroImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
