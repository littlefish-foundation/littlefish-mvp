import React from "react";
import AboutSection from "../components/UserInterface/AboutSection";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import Trending from "../components/UserInterface/Trending-section/Trending";

const About = () => {
  return (
    <div>
      <SubHeader />
      <h2
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px ",
        }}
      >
        About Littlefish Foundation
      </h2>
      <AboutSection />
    </div>
  );
};
export default About;
