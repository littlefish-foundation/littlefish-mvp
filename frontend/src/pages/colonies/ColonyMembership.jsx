import React from "react";
import "./ColonyMembership.css";
import { Container, Row, Col } from "reactstrap";
import { MEMBER__DATA } from "../../assets/data/dummy";
import { Link } from "react-router-dom";

const ColonyMembership = ({ name}) => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="seller__section-title">
              <h3>Colony Members</h3>
              <button className=" explore__btn d-flex align-items-center gap-2">
                <i className="ri-ball-pen-line"></i> 
                <Link to='MemberForm'> Become a Member </Link>
              </button>
            </div>
          </Col>

          {MEMBER__DATA.map((item) => (
            <Col lg="2" md="3" sm="4" xs="6" key={item.id} className="mb-4">
              <div className="single__seller-card d-flex align-items-center gap-3">
                <div className="seller__img">
                  <img src={item.image} alt="" className="w-100" />
                </div>

                <div className="seller__content">
                  <h6>{item.name}</h6>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ColonyMembership;
