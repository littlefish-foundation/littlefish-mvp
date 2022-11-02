import React from "react";
import { useParams } from "react-router-dom";
import ColonyGallery from "../components/colonies/ColonyGallery";

import { Container, Button, Card, CardText, Col } from "reactstrap";
import useFetch2 from "../Hooks/useFetch2";

import "../styles/subcolony.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useGetSubcolonies from "../Hooks/getSubcolonies";
const Subcolony = (props) => {
  const { name } = useParams();
  const { subcolonyData } = useGetSubcolonies();
  const singleSubcolony = subcolonyData?.subs?.find(
    (item) => item.sub.name === name
  );
  const { COLONY__DATA } = useFetch2();
  const singleColony = COLONY__DATA?.find((item) => item.name === name);

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
        <section>
          <Container>
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
          </Container>
        </section>

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
          <Container>
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
                eventKey="All Actions"
                title="All Actions"
                style={{ backgroundColor: "transparent !important" }}
              >
                <ColonyGallery colony={singleColony?.name} />
              </Tab>
              <Tab
                disabled
                eventKey="subcolonies"
                title="Sub-Colonies"
                style={{ backgroundColor: "transparent !important" }}
              ></Tab>
              <Tab
                disabled
                eventKey="Members"
                title="Members"
                style={{ backgroundColor: "transparent !important" }}
              ></Tab>
            </Tabs>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Subcolony;
