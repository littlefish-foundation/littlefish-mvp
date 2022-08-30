import React from "react";

import AboutSection from "../components/ui/AboutSection";
import SubHeader from "../components/ui/Sub-Header/SubHeader";

import Trending from "../components/ui/Trending-section/Trending";

const About = () => {
  return (
    <>
      <SubHeader assetName={"About littlefish"} />

      <AboutSection />
      
    </>
  );
};

export default About;
