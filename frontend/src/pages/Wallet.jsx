import React, { useState, useEffect } from "react";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import {
  Container,
  Row,
  Col,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Button,
} from "reactstrap";
import "../styles/wallet.css";
//import WalletConnect from "./walletConnect/WalletConnect";
import Typhon from "../assets/typhon.svg";
import Nami from "../assets/Nami.svg";

const Wallet = () => {
  const [namiAddr, setNamiAddr] = useState(false);
  const [account, setAccount] = useState(null);

  const connectTyphonWallet = () => {
    var typhon;

    window.onload = () => {
      typhon = window.cardano.typhon;

      if (!typhon) {
        console.log("Typhon is NOT installed!");
      }
    };

    async function enable() {
      const isEnabledResponse = await typhon.isEnabled();

      if (isEnabledResponse.data === true) {
        // site is already whitlisted, continue using APIs
      } else {
        const enableResponse = await typhon.enable();

        if (enableResponse.status === true) {
          // Site whitelisted
        } else {
          // User rejected the whitelisting permission
        }
      }
    }
    enable();
  };

  var nami;
  window.onLoad = () => {
    nami = window.cardano.nami;

    if (!nami) {
      console.log("Nami is NOT installed!");
    }
  };

  useEffect(() => {
    async function t() {
      const nami_lib = await import("nami-wallet-api");
      const Nami = await nami_lib.NamiWalletApi(
        window.cardano,
        "<blockfrost-api-key>"
      );
      if (namiAddr) {
        await Nami.enable();
        let addr = await Nami.getAddress();
        //setNamiAddr(false);
        console.log(addr);
        setAccount(addr);
      }
    }
    t();
  }, [namiAddr]);
  window.namiAddress = account;

  return (
    <>
      <SubHeader assetName={"Connect Wallet"} />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <div className=" m-auto">
                <h3 className="text-light">Connect your wallet</h3>
                <p>Wallet Address:</p>

                <p>{account}</p>
              </div>
            </Col>

            <Col>
              <div className="wallet__item">
                <span>
                  <img src={Typhon} alt="" />
                </span>
                <h5>Typhon Wallet</h5>
                <Button
                  id="UncontrolledPopover"
                  type="button"
                  style={{
                    backgroundColor: "#5142fc",
                    borderRadius: "50px",
                    color: "white",
                    width: "400px",
                    height: "35px",
                  }}
                >
                  Connect to Typhon Wallet
                </Button>
                <UncontrolledPopover
                  placement="right"
                  target="UncontrolledPopover"
                >
                  <PopoverHeader>Attention!</PopoverHeader>
                  <PopoverBody>
                    Typhon integration comming soon... For now please use Nami Wallet.<br/>
                    Thank you for your understanding. <br/>
                    littlefish Dev Team
                  </PopoverBody>
                </UncontrolledPopover>
              </div>
            </Col>

            <Col>
              <div className="wallet__item">
                <span>
                  <img src={Nami} alt="" />
                </span>
                <h5>Nami Wallet</h5>
                <Button
                  style={{
                    backgroundColor: "#5142fc",
                    borderRadius: "50px",
                    color: "white",
                    width: "400px",
                    height: "35px",
                  }}
                  onClick={() => setNamiAddr(true)}
                >
                  Connect to Nami Wallet
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wallet;
