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

const dummyBadgeData = [
  {
    unit: "daed3e9e7a24b07f417aec24956dc5a00ac28efec88bb4fd5d3038ac.Frontend V",
    quantity: "1",
  },
  {
    unit: "c6d944cf092f89ac4694ebfcf28163b14729ac5f3f91289f8745ca6c.The Genesis",
    quantity: "1",
  },
  {
    unit: "43d0fdf3a1fbda50b3db584d14e6a6b63d0781cf0666ad289be0cb70.TheForge",
    quantity: "1",
  },
  {
    unit: "fdbff441598ae14daa5333a3ebdad9c607986191d976226e4d86a698.TheGenesis",
    quantity: "1",
  },
];

const Wallet = () => {
  const [namiAddr, setNamiAddr] = useState(false);

  const [nfts, setNfts] = useState([]);
  const [policy, setPolicy] = useState();
  const [connected, setConnected] = useState();
  const [balance, setBalance] = useState();

  const [account, setAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDisconnect, setShowModalDisconnect] = useState(false);
  const [namiCheck, setNamiCheck] = useState(null);

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
        localStorage.setItem("walletID", addr);
      }
    }
    t();
  }, [namiAddr]);


 

  const namiClickHandler = (e) => {
    e.preventDefault();
    if (namiCheck === null) {
      setShowModal(true);
      setNamiAddr(false);
    }
    setNamiAddr(true);
    window.walletIDStored = localStorage.getItem("walletID");
  };
  console.log(localStorage.getItem("walletID"));

  const namiCancelHandler = () => {
    localStorage.removeItem("walletID");

    setShowModalDisconnect(true);
  };

   ///* *********************************************************************************************************************************** *////
 ///* *********************************************************************************************************************************** *////
  let walletAssetsObject = { assets: [], walletAddress:"" };
  let nameAndPolicyObj = {} ;

 
  const arrPolicyAndName = nfts.map(nft => {
    return {...nameAndPolicyObj, policyID:nft.unit.split(".")[0] , name:nft.unit.split(".")[1]};
  });

  walletAssetsObject.walletAddress = account;
  walletAssetsObject.assets = arrPolicyAndName;

  console.log(nfts);
  console.log(walletAssetsObject);
 ///* *********************************************************************************************************************************** *////
 ///* *********************************************************************************************************************************** *////

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
