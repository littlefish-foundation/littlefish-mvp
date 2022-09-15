import React from "react";
import SubHeader from "../../components/UserInterface/Sub-Header/SubHeader";
import { Container, Row, Col, Button } from "reactstrap";
import fishColony from "../../assets/avatarsAndImages/fishColony.jpeg";
import "../../styles/profile.css";
import cardanoIcon from "../../assets/avatarsAndImages/cardano.png";
import NavBar from "./NavBar";

import CommonSection from "./CommonSection";
import UserGallery from "./userGallery";

const MemberProfile = () => {
  const walletID =
    "addr_test1qqzgl7qj9lvnuap4qr3c26cm98rqq72gh4756vclffueprhe6s2kke9ju4jxyuke6mzxwgk4e4mp6pjk087ry0cqcs3stcfeat";
  const first6 = walletID.substring(0, 6);
  let lengthOfID = walletID.length;
  const last6 = walletID.substring(lengthOfID - 7, lengthOfID - 1);

  return (
    <div>
      <CommonSection />
      <section>
        <NavBar />
      </section>
    </div>
  );
};

export default MemberProfile;
