import React from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
//import NFT__DATA from "../assets/data/NFT__DATA";
import useFetch from "../assets/data/useFetch";
import useFetch3 from "../assets/data/useFetch3";

import "../styles/nft-details.css";
import { Link } from "react-router-dom";

const NftDetails = () => {
  const { assetName } = useParams();
  const { NFT__DATA } = useFetch("https://api.littlefish.foundation/action/");

  const singleNft = NFT__DATA?.find((item) => item.assetName === assetName);
  const { paymentLink } = useFetch3(
    NFT__DATA,
    assetName,
    singleNft?.price,
    singleNft?.actionCollection
  );

  return (
    <div>
      <CommonSection assetName={singleNft?.assetName} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={singleNft?.image}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{singleNft?.assetName}</h2>

                <div className="nft__creator d-flex gap-3 align-items-center">
                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{singleNft?.ownerName}</h6>
                  </div>

                  <br />
                  <div className="creator__detail">
                    <p>Action Price in ADA </p>

                    <h6>{singleNft?.price}</h6>
                    <div>Links</div>
                    <span>
                      <Link to="#">
                        <i className="ri-youtube-line"></i>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="my-4">{singleNft?.description}</p>

                <button className="singleNft-btn d-flex align-items-center gap-1 w-100">
                  <i className="ri-shopping-bag-line"></i>
                  <a href={paymentLink} target="_blank" rel="noreferrer">Buy Action</a>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default NftDetails;
/*       <button className="singleNft-btn d-flex align-items-center gap-2 w-100">
                  <i className="ri-shopping-bag-line"></i>
                  <href>{paymentLink}</href>
                </button>*/
