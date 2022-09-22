import { useState, useEffect } from "react";
import NftCard from "../../components/UserInterface/Nft-card/NftCard";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import "../../styles/actions.css";
import "../../components/UserInterface/Live-auction/live-auction.css";
import { BsDownload } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";

// import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const UserGallery = (props) => {
  const [userActions, setUserActions] = useState(null);
  const [loadingUserActions, setLoadingUserActions] = useState(false);
  const [error, setError] = useState(null);
  let ownerName = props.ownerName;

  useEffect(() => {
    setLoadingUserActions(true);
    axios
      .get(
        `https://api.littlefish.foundation/colony/colonyName/actions?ownerName=${ownerName}`
      )
      .then((response) => {
        setUserActions(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingUserActions(false);
      });
  }, []);
  return (
    <>
      <section>
        <Container style={{ backgroundColor: "transparent !important" }}>
          <Row>
            {userActions?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.ownerName}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UserGallery;
