import React from "react";
import NavBar from "./NavBar";
import { Container, Button } from "reactstrap";
import cardanoIcon from "../../assets/cardano.png";
import copy from "copy-to-clipboard";
import { useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import useGetOneUserData from "../../Hooks/getOneUserData";
import "./commonSection.css";
import "../../styles/profile.css";

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MemberProfile = (props) => {
  const { name } = useParams();

  const { userData, loadingUserData } = useGetOneUserData(name);

  const walletID = userData?.walletAddress;
  const first8 = walletID?.substring(0, 8);
  const lengthOfID = walletID?.length;
  const last8 = walletID?.substring(lengthOfID - 9, lengthOfID);

  const year = userData?.createdAt?.substring(0, 4);
  const month = userData?.createdAt?.substring(5, 7);
  const days = userData?.createdAt?.substring(8, 10);
  let monthName = months[month - 1];
  let dateFormat = monthName + " " + days + ", " + year;

  console.log(dateFormat);

  const copyToClipboard = () => {
    copy(walletID);
    alert(`You have copied "${walletID}"`);
  };
  return (
    <div>
      {loadingUserData ? (
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
        <div>
          {/* <button>
            <RiShareLine
              style={{
                position: "absolute",
                marginLeft: "80rem",
                marginTop: "250px",
                color: "white",
                fontSize: "2rem",
                alignItems: "center",
              }}
            />
          </button>
          <button>
            <BsThreeDots
              style={{
                position: "absolute",
                marginLeft: "84rem",
                marginTop: "250px",
                color: "white",
                fontSize: "2rem",
                alignItems: "center",
              }}
            />
          </button> */}
          <section>
            <Container>
              <div
                style={{
                  position: "absolute",
                  marginTop: "260px",
                  color: "white",
                  fontSize: "2rem",
                  alignItems: "center",
                }}
              >
                <div style={{ marginLeft: "900px" }}>
                  <img src={cardanoIcon} alt="" className="cardano__icon" />

                  <a
                    href={`https://preprod.cexplorer.io/address/${walletID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="wallet__id__btn">
                      {first8}......{last8}
                    </Button>
                  </a>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  marginTop: "260px",
                  color: "white",
                  marginLeft: "1150px",
                  fontSize: "2rem",
                  alignItems: "center",
                }}
              >
                <div className="date__joined">
                  <p>Member since {dateFormat}</p>
                </div>
              </div>
            </Container>
          </section>

          <section className="common__section">
            <Container>
              <div>
                <img src={userData?.avatar} alt="" className="profile__image" />
              </div>
            </Container>
          </section>
          <section>
            <Container>
              <div
                className="social__links__user d-flex gap-3 align-items-center "
                style={{ marginLeft: "15px" }}
              >
                <span>
                  <a href="#">
                    <i className="ri-github-line"></i>
                  </a>
                </span>
                <span>
                  <a href="#">
                    <i className="ri-youtube-line"></i>
                  </a>
                </span>
                <span>
                  <a href="#">
                    <i className="ri-twitter-line"></i>
                  </a>
                </span>
                <span>
                  <a href="#">
                    <i className="ri-global-line"></i>
                  </a>
                </span>
                <span>
                  <a href="#">
                    <i className="ri-discord-line"></i>
                  </a>
                </span>
              </div>
            </Container>
          </section>
          <br></br>
          <section>
            <Container>
              <div
                style={{
                  width: "100%",
                  paddingLeft: "10px",
                }}
              >
                <div style={{ display: "block", margin: "auto" }}>
                  <div className="profile__name">
                    <h3>{userData?.name}</h3>
                  </div>

                  {/* <div>
                    <img src={cardanoIcon} alt="" className="cardano__icon" />
                    <Button
                      className="wallet__id__btn"
                      value={walletID}
                      onClick={copyToClipboard}
                    >
                      {first6}......{last6}
                    </Button>
                    <div className="date__joined">
                      <p>Member since {dateFormat}</p>
                    </div>
                  </div> */}

                  <div className="user__bio">
                    <p>{userData?.bio}</p>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <section>
            <Container>
              <NavBar producerName={userData?.name} />
            </Container>
          </section>
        </div>
      )}
    </div>
  );
};

export default MemberProfile;
