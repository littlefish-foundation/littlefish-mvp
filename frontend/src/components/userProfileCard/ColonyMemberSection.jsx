import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import UserProfileCard from "./UserProfileCard";
import { MEMBER__DATA } from "../../assets/data/dummy";
import "./userProfileCard.css";

const ColonyMemberSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="seller__section-title">
              <h3>Members</h3>
              <button className=" explore__btn d-flex align-items-center gap-2">
                <i className="ri-ball-pen-line"></i>
                <Link to="MemberForm"> Become a Member </Link>
              </button>
            </div>
          </Col>
          {MEMBER__DATA.map((item) => (
            <Col lg="2" md="4" sm="6" className="mb-4">
              <UserProfileCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ColonyMemberSection;
