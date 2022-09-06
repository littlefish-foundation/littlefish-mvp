import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./about-section.css";

import heroImg from "../../assets/avatarsAndImages/proofOfActivity.png";
import fishColony from "../../assets/avatarsAndImages/fishColony.jpeg";

const AboutSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="5" md="6">
            <div className="hero__content">
              <h1>Welcome to littlefish Foundation.</h1>
              <br />
              <h3>The Basics - littlefish, colonies and Action</h3>
              <p>
                <br></br>
                <div className="hero__img">
                  <img src={fishColony} alt="" className="w-100" />
                </div>
                <br></br>
                <span>Littlefish</span> are the actors of the system. They are
                individuals who want to enable and enact change in the world.
                They come together on the Littlefish Platform to form colonies.
              </p>
              <p>
                <span>Colonies</span> are groups of littlefish. A group of
                friends, a digital community, a DAO, a business, a charity
                organization, … They have common goals to work towards.
              </p>
              <p>
                Colonies perform real-world activities.
                <li>A group of friends cleaning litter on the beach. </li>
                <li>
                  A digital community collaborating towards social/environmental
                  impact.
                </li>
                <li>A DAO creating blockchain solutions for a use case.</li>
                <li>
                  A business announcing/developing/producing a new product.{" "}
                </li>
                <li>
                  A charity organizing a new campaign to build houses for those
                  in need.{" "}
                </li>
              </p>
              <p>
                These activities are documented in whatever way colony members
                choose - video, image, recordings, tweets, Instagram, …
                Collected multimedia is then published as NFTs called
                <span>Actions</span>.
              </p>

              <p>
                Actions are the **Proof of Activity** (PoA). They contain
                information showing that something has been done to impact the
                world. Actions can be sold to generate funding. The rewards from
                the sale of Actions are shared between the colony and
                littlefish.
                <span>Everyone earns</span>.
              </p>
            </div>
          </Col>

          <Col lg="1" md="6"></Col>

          <Col lg="5" md="6">
            <div className="hero__content">
              <h3>Littlefish Action Model</h3>
              <p>
                Littlefish Action Model describes how individual Actions are
                aligned towards common goals with littlefish, colonies and
                Actions.
                <br></br>
                <br></br>
                <div className="hero__img">
                  <img src={heroImg} alt="" className="w-100" />
                </div>
                <br></br>
                <li>
                  Everything starts with <span>colonies</span>. Littlefish
                  gather around an idea/project/cause/… and start a colony.
                  Colony members have shared goals and undertake activities
                  towards achieving them.
                </li>
                <li>
                  They record these activities using pictures, videos,
                  documents, and other forms of multimedia. These records are
                  recorded on the blockchain as <span>NFTs called Actions</span>
                  . These records will live forever on the blockchain.{" "}
                </li>
                <li>
                  Littlefish sell their Actions. These can be bought internally
                  by the colony or externally by others.
                  <ol>Same colony. Team members, close associates.</ol>
                  <ol>Other colonies. A sub/super colony, another colony.</ol>
                  <ol>Other littlefish. A supporter, investor, collector...</ol>
                  In each case, the rewards are split between the littlefish and
                  the colony according to their reward-sharing agreement.
                </li>
                <li>
                  Rewards incentivize further Action. The signal is strongest
                  for the littlefish and the colony. The rest of the Ocean is
                  also incentivized.{" "}
                  <ol>
                    littlefish gets rewarded → littlefish’s desire for further
                    rewards is increased → more Action{" "}
                  </ol>
                  <ol>
                    This is a reinforcing feedback loop steps 2 through 4. The
                    more an Action is rewarded, the more it will be
                    incentivized. The less it is rewarded, the less of it will
                    exist.{" "}
                  </ol>
                  <ol>
                    It is up to each littlefish to decide what that means.
                  </ol>
                </li>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
