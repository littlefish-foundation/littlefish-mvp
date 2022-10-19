import React from "react";
import { RiShareLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { Container, Button, Card, CardText } from "reactstrap";
import cardanoIcon from "../assets/cardano.png";
import placeholder from "../assets/placeholder.png";
import "../styles/subcolony.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Subcolony = (props) => {
  const walletID =
    "addr_test1qz2c339gtrsdsmec5e6ywjmqt6r44ns5t4efa3e46peufuksrpulhkjws34q7jn9xcfn7zj6jghuq43xeyah8plg4mgsxzu2n0";
  const first6 = walletID?.substring(0, 8);
  const lengthOfID = walletID?.length;
  const last6 = walletID?.substring(lengthOfID - 9, lengthOfID - 1);
  return (
    <div>
      <div>
        <section className="common__section__subcolony">
          <Container>
            <img src={placeholder} alt="" className="main__image" />
          </Container>
        </section>
        <br />
        <section>
          <Container>
            <div
              style={{
                width: "500px",
                marginLeft: "230px",
                paddingLeft: "10px",
              }}
            >
              <div style={{ display: "block", margin: "auto" }}>
                <div className="subcolony__name">
                  <h3>The Forge</h3>
                </div>
              </div>
            </div>

            <div className="subcolony__bio">
              <p>
                {" "}
                Guiding Questions: How do we go from dreams to reality? <br />
                What features should we focus on developing?
              </p>
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
