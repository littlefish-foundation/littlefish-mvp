import React from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import useGetUserProfileData from "../Hooks/getUserProfileData";
import UserProfileCard from "../components/userProfileCard/UserProfileCard";
import { Container, Row, Col, Button } from "reactstrap";

const Members = () => {
  const { userProfileData, loadingProfileData } = useGetUserProfileData(
    "https://api.littlefish.foundation/user/"
  );

  return (
    <div>
      <SubHeader />
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
              <h3 style={{ color: "#fff" }}>Members</h3>
            </div>
          </Col>
        </Row>
        <Row>
          {userProfileData?.map((item) => (
            <Col lg="2" md="4" sm="6" style={{ margin: "15px" }}>
              <UserProfileCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Members;
