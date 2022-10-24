import React from "react";
import { TbPlugConnected } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Button } from "reactstrap";
import "./modal.css";
import cardanoIcon from "../../../assets/cardano-ada-icon.png";
import Wallet from "../../../pages/Wallet";
import { useSlotProps } from "@mui/base";


const NamiAddressModal = ({ account, setShowModal, sumBalance }) => {
  //const account = account;
  const walletID = account;
  const first6 = walletID.substring(0, 8);
  let lengthOfID = walletID.length;
  const last6 = walletID.substring(lengthOfID - 9, lengthOfID - 1);

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i
            class="ri-close-line"
            onClick={() => {
              setShowModal(false);
              window.location.reload();
            }}
          ></i>
        </span>
        <div>
          <LockOpenIcon style={{ color: "green", fontSize: 50 }} />{" "}
          <h5 className="text-center text-dark">
            Wallet Connection Successful and Verified!
            <br /> Welcome !
          </h5>
          <Button className="wallet__addr__btn">
            <img src={cardanoIcon} className="cardano__ada__icon" />
            {first6}......{last6}
          </Button>
        </div>
        <br />
        <br />
        <p className="text-center text-dark">
          Your Balance is: {sumBalance} ADA
        </p>
      </div>
    </div>
  );
};

export default NamiAddressModal;
