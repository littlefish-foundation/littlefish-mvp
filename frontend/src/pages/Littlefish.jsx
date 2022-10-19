import React from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import useGetUserProfileData from "../Hooks/getUserProfileData";
import UserProfileCard from "../components/userProfileCard/UserProfileCard";
import { Container, Row, Col, Button } from "reactstrap";
import { RotatingLines } from "react-loader-spinner";

const Littlefish = () => {
  const { userProfileData, loadingProfileData } = useGetUserProfileData();

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
        <>
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
                  <h3 style={{ color: "#fff" }}>littlefish</h3>
                </div>
              </Col>
            </Row>
            <Row>
              {userProfileData?.map((item) => (
                <Col
                  lg="2"
                  md="4"
                  sm="6"
                  style={{ marginTop: "15px", marginBottom: "15px" }}
                >
                  <UserProfileCard item={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default Littlefish;
