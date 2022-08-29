import React from "react";

import HeroSection from "../components/ui/HeroSection";
import CommonSection from "../components/ui/Common-section/CommonSection";

import Trending from "../components/ui/Trending-section/Trending";

const About = () => {
  return (
    <>
      <CommonSection assetName={"About littlefish"} />

      <HeroSection />
      <Trending />
    </>
  );
};

export default About;
