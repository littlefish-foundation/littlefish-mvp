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
import Typhon from "../assets/avatarsAndImages/typhon.svg";
import Nami from "../assets/avatarsAndImages/Nami.svg";
import AbsentNamiWalletModal from "../components/UserInterface/Modal/AbsentNamiWalletModal";
import NamiAddressModal from "../components/UserInterface/Modal/NamiAddressModal";
import ConnectedMarker from "../components/Header/ConnectedMarker";
import DisconnectedModal from "../components/UserInterface/Modal/DisconnectedModal";

const Wallet = () => {
  const [namiAddr, setNamiAddr] = useState(false);
  const [account, setAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDisconnect, setShowModalDisconnect] = useState(false);

  const [namiCheck, setNamiCheck] = useState(null);

  // const idleButtonColor = { border: "3px solid blue" };
  // const connectedButtonColor = { border: "3px solid green" };

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
  // window.onLoad = () => {
  //   nami = window.cardano.nami;
  //   if (!nami) {
  //     console.log("Nami is NOT installed!");
  //   }
  // };

  useEffect(() => {
    async function t() {
      const nami_lib = await import("nami-wallet-api");
      const Nami = await nami_lib.NamiWalletApi(
        window.cardano,
        "<blockfrost-api-key>"
      );
      console.log(namiAddr);

      if (namiAddr) {
        await Nami.enable();
        let addr = await Nami.getAddress();
        setNamiCheck(Nami.enable);

        //setNamiAddr(false);
        setAccount(addr);
        localStorage.setItem("walletID", addr);
      }
    }
    t();
  }, [namiAddr]);

  console.log(namiCheck);

  //window.namiAddress = account;

  //console.log(account);

  console.log(window.walletIDStored);

  const namiClickHandler = (e) => {
    e.preventDefault();
    if (namiCheck === null) {
      setShowModal(true);
      setNamiAddr(false);
    }
    setNamiAddr(true);
    window.walletIDStored = localStorage.getItem("walletID");

    //setShowModal(false);
  };
  console.log(localStorage.getItem("walletID"));

  const namiCancelHandler = () => {
    localStorage.removeItem("walletID");

    setShowModalDisconnect(true);
  };
  return (
    <div
      onClick={() => {
        showModal && setShowModal(false);
        showModalDisconnect && setShowModalDisconnect(false);
      }}
    >
      <SubHeader assetName={"Connect Wallet"} />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              {/*<div className=" m-auto">
                <h3 className="text-light">Connect your wallet</h3>
  </div>*/}
            </Col>

            <Col>
              <div className="wallet__item">
                <span>
                  <img src={Typhon} alt="" />
                </span>
                <h5>Typhon Wallet</h5>
                <Button id="UncontrolledPopover" className="wallet_disconnect">
                  Disconnect
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button
                  id="UncontrolledPopover"
                  type="button"
                  className="wallet_connect"
                >
                  Connect
                </Button>
                <UncontrolledPopover
                  placement="right"
                  target="UncontrolledPopover"
                >
                  <PopoverHeader>Attention!</PopoverHeader>
                  <PopoverBody>
                    Typhon integration comming soon... For now please use Nami
                    Wallet.
                    <br />
                    Thank you for your understanding. <br />
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
                <div>
                  <Button
                    className="wallet_disconnect"
                    onClick={namiCancelHandler}
                  >
                    Disconnect
                  </Button>
                  {namiCheck === null && showModalDisconnect && (
                    <DisconnectedModal
                      setShowModalDisconnect={setShowModalDisconnect}
                    />
                  )}
                  &nbsp; &nbsp; &nbsp;
                  <Button className="wallet_connect" onClick={namiClickHandler}>
                    Connect
                  </Button>
                  {namiCheck === null && showModal && (
                    <AbsentNamiWalletModal setShowModal={setShowModal} />
                  )}
                  {namiCheck !== null && showModal && (
                    <NamiAddressModal
                      account={account}
                      setShowModal={setShowModal}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Wallet;
