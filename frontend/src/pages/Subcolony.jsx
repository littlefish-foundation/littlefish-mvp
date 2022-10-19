import React from "react";
import { RiShareLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

import { BsThreeDots } from "react-icons/bs";
import { Container, Button, Card, CardText } from "reactstrap";

import "../styles/subcolony.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useGetSubcolonies from "../Hooks/getSubcolonies";

const Subcolony = (props) => {
  const { name } = useParams();
  const { subcolonyData, loadingSubcolony } = useGetSubcolonies();
  const singleSubcolony = subcolonyData?.subs?.find(
    (item) => item.sub.name === name
  );

  const walletID =
    "addr_test1qz2c339gtrsdsmec5e6ywjmqt6r44ns5t4efa3e46peufuksrpulhkjws34q7jn9xcfn7zj6jghuq43xeyah8plg4mgsxzu2n0";
  const first6 = walletID?.substring(0, 8);
  const lengthOfID = walletID?.length;
  const last6 = walletID?.substring(lengthOfID - 9, lengthOfID - 1);
  console.log(singleSubcolony?.sub?.coverImage);
  console.log(subcolonyData);
  return (
    <div>
      <div>
        <section className="common__section__subcolony">
          <Container>
            <div>
              <img
                src={singleSubcolony?.sub?.coverImage.src}
                alt=""
                className="main__image"
              />
            </div>
          </Container>
        </section>
        <div
          className="social__links__subcolony d-flex gap-3 align-items-center "
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

        <br />
        <section>
          <Container>
            <div
              style={{
                width: "100%",
                //marginLeft: "230px",
                paddingLeft: "10px",
              }}
            >
              <div className="subcolony__name">
                <h3>{singleSubcolony?.sub?.name}</h3>
              </div>
            </div>

            <div className="subcolony__bio">
              <p>{singleSubcolony?.sub?.description}</p>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <Card
                body
                className="my-2"
                style={{
                  width: "18rem",
                  background: "inherit",
                  border: "1px solid #fff",
                  margin: "50px",
                }}
              >
                <CardText>
                  # of Associated Contributors &nbsp; <AiOutlineInfoCircle />{" "}
                </CardText>
              </Card>
              <Card
                body
                className="my-2"
                style={{
                  width: "18rem",
                  background: "inherit",
                  border: "1px solid #fff",
                  margin: "50px",
                }}
              >
                <CardText>
                  # of Associated Actions &nbsp;
                  <AiOutlineInfoCircle />
                </CardText>
              </Card>
              <Card
                body
                className="my-2"
                style={{
                  width: "18rem",
                  background: "inherit",
                  border: "1px solid #fff",
                  margin: "50px",
                }}
              >
                <CardText>
                  # of Tags &nbsp;
                  <AiOutlineInfoCircle />
                </CardText>
              </Card>
            </div>
          </Container>
        </section>

        <section>
          <Tabs
            id="controlled-tab-example"
            className="mb-3"
            style={{
              marginLeft: "30px",
              marginTop: "10px",
              backgroundColor: "transparent !important",
            }}
          >
            <Tab
              eventKey="Contributors"
              title="All Actions"
              style={{ backgroundColor: "transparent !important" }}
            ></Tab>
            <Tab
              eventKey="Created Actions"
              title="Created Actions"
              style={{ backgroundColor: "transparent !important" }}
            ></Tab>
            <Tab
              eventKey="Members"
              title="Members"
              style={{ backgroundColor: "transparent !important" }}
            ></Tab>
          </Tabs>
        </section>
      </div>
    </div>
  );
};

export default Subcolony;
