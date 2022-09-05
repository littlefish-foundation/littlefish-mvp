import React from "react";

import { TbPlugConnected } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import "./modal.css";
import Wallet from "../../../pages/Wallet";
import { useSlotProps } from "@mui/base";

const NamiAddressModal = ({ account, setShowModal }) => {
  //const account = account;
  const navigate = useNavigate();

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
          <TbPlugConnected style={{ color: "blue", fontSize: 50 }} />
          <h6 className="text-center text-dark">
            Nami Wallet connected Successfully!
          </h6>
        </div>
        <p>Your Wallet Address: {account}</p>

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
