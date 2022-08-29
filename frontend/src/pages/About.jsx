import React from "react";

import AboutSection from "../components/ui/AboutSection";
import CommonSection from "../components/ui/Common-section/CommonSection";

import Trending from "../components/ui/Trending-section/Trending";

const About = () => {
  return (
    <>
      <CommonSection assetName={"About littlefish"} />

      <AboutSection />
      
    </>
  );
};

export default About;
