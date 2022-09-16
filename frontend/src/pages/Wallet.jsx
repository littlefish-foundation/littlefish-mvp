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
import Typhon from "../assets/avatarsAndImages/typhon.svg";
import Nami from "../assets/avatarsAndImages/Nami.svg";
import AbsentNamiWalletModal from "../components/UserInterface/Modal/AbsentNamiWalletModal";
import NamiAddressModal from "../components/UserInterface/Modal/NamiAddressModal";
import DisconnectedModal from "../components/UserInterface/Modal/DisconnectedModal";
import { setAuthToken } from "../helpers/setAuthToken";
import axios from "axios";

const Wallet = () => {
  const [namiAddr, setNamiAddr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [connected, setConnected] = useState();
  const [balance, setBalance] = useState();
  const [account, setAccount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalDisconnect, setShowModalDisconnect] = useState(false);
  const [namiCheck, setNamiCheck] = useState(null);
  const [policy, setPolicy] = useState("");
  const [postStatus, setPostStatus] = useState(null);

  const [assets, setAssets] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");

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
      } else {
        const enableResponse = await typhon.enable();
        if (enableResponse.status === true) {
        } else {
        }
      }
    }
    enable();
  };

  var nami;

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
        let assets = await Nami.getAssets();
        setNamiCheck(Nami.enable);
        setAccount(addr);
        setNfts(assets);
      }
    }
    t();

    setNamiAddr(true);
  }, [namiAddr]);

  ///* *********************************************************************************************************************************** *////
  ///* *********************************************************************************************************************************** *////
  let walletAssetsObject = { assets: [], walletAddress: "" };
  let nameAndPolicyObj = {};

  const arrPolicyAndName = nfts.map((nft) => {
    return {
      ...nameAndPolicyObj,
      policyID: nft.unit.split(".")[0],
      name: nft.unit.split(".")[1],
    };
  });

  walletAssetsObject.walletAddress = account;
  walletAssetsObject.assets = arrPolicyAndName;

  console.log(walletAssetsObject);
  console.log(arrPolicyAndName);
  ///* *********************************************************************************************************************************** *////
  ///* *********************************************************************************************************************************** *////

  const namiClickHandler = (e) => {
    e.preventDefault();
    sessionStorage.setItem("walletID", account);
    window.walletIDStored = sessionStorage.getItem("walletID");

    axios
      .post("https://api.littlefish.foundation/login/", walletAssetsObject)
      .then((response) => {
        const token = response.data.token;
        const name = response.data.name;

        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        setAuthToken(token);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    if (namiCheck === false || namiCheck === null) {
      setShowModal(true);
      setNamiAddr(false);
    }
    setShowModal(true);
    setNamiAddr(true);
  };

  const namiCancelHandler = () => {
    sessionStorage.removeItem("walletID");

    setNamiAddr(false);
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
            <Col lg="12" className="mb-5 text-center"></Col>

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
                  {namiCheck && showModalDisconnect && (
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
