import React from "react";
import { TbPlugConnected } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Button } from "reactstrap";
import "./modal.css";
import cardanoIcon from "../../../assets/cardano-ada-icon.png";
import Wallet from "../../../pages/Wallet";
import { useSlotProps } from "@mui/base";

const NamiAddressModal = ({ account, setShowModal }) => {
  //const account = account;
  const navigate = useNavigate();
  const walletID = account;
  const first6 = walletID.substring(0, 8);
  let lengthOfID = walletID.length;
  const last6 = walletID.substring(lengthOfID - 9, lengthOfID - 1);

  const navigateGenerate = (e) => {
    window.location.reload();
    e.preventDefault();

    navigate("/create");
  };
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
        <button
          className="place__bid-btn"
          onClick={() => {
            navigate("/create");
          }}
        >
          Redirect to Generate Page
        </button>
      </div>
    </div>
  );
};

export default NamiAddressModal;
