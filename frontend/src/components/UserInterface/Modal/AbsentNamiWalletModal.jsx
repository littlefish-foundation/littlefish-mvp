import React from "react";

import { TbPlugConnectedX } from "react-icons/tb";

import "./modal.css";

const AbsentNamiWalletModal = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <div>
          <TbPlugConnectedX style={{ color: "red", fontSize: 50 }} />
          <br />
          <h6 className="text-center text-dark">
            Connection to Nami Wallet Failed!
          </h6>
        </div>
        <p className="text-center text-dark">
          You need to install Nami wallet browser extension to use it in
          littlefish:{" "}
          <a href="https://app.littlefish.foundation/">
            https://app.littlefish.foundation/
          </a>
          <br />
          Check extension to see if Nami Wallet is turned off. <br /> If it is
          not installed click <a href="https://namiwallet.io/">here</a> to
          install Nami Wallet.
        </p>
      </div>
    </div>
  );
};

export default AbsentNamiWalletModal;
