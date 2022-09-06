import React from "react";
import AboutSection from "../components/UserInterface/AboutSection";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import Trending from "../components/UserInterface/Trending-section/Trending";

const About = () => {
  return (
    <div>
      <SubHeader assetName={"About littlefish"} />
      <AboutSection />
    </div>
  );
};
export default About;
