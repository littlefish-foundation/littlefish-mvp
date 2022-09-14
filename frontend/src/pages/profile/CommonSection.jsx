import React from "react";

import "./commonSection.css";
import "../../styles/profile.css";
import { Container, Row, Col, Button } from "reactstrap";
import donaldProfile from "../../assets/avatarsAndImages/donaldProfile.png";
import "../../styles/profile.css";
import cardanoIcon from "../../assets/avatarsAndImages/cardano.png";
import copy from "copy-to-clipboard";

const CommonSection = ({ assetName }) => {
  const walletID =
    "addr_test1qqzgl7qj9lvnuap4qr3c26cm98rqq72gh4756vclffueprhe6s2kke9ju4jxyuke6mzxwgk4e4mp6pjk087ry0cqcs3stcfeat";
  const first6 = walletID.substring(0, 8);
  let lengthOfID = walletID.length;
  const last6 = walletID.substring(lengthOfID - 9, lengthOfID - 1);

  const copyToClipboard = () => {
    copy(walletID);
    alert(`You have copied "${walletID}"`);
  };

  return (
    <div>
      <section className="common__section">
        <Container>
          <img src={donaldProfile} alt="" className="profile__image" />

          <div
            style={{
              width: "500px",
              marginLeft: "250px",
              paddingLeft: "10px",
              boxShadow: "inset 1px 1px 1px #fff",
            }}
          >
            <div className="profile__name">
              <h3>donald.littlefish</h3>
            </div>
            <div>
              <img src={cardanoIcon} className="cardano__icon" />
              <Button className="wallet__id__btn" value={walletID} onClick={copyToClipboard}>
                {first6}......{last6}
              </Button>

              <div className="date__joined">
                <p>Joined August 2022</p>
              </div>
            </div>

            <div className="user__bio">
              <p>
                A littlefish Foundation member. Frontend Developer. Blockchain
                enthusiast.{" "}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default CommonSection;
