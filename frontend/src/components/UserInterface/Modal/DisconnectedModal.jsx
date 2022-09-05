import React from "react";

import { TbPlugConnectedX } from "react-icons/tb";

import "./modal.css";

const DisconnectedModal = ({ setShowModalDisconnect }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i
            class="ri-close-line"
            onClick={() => {
              setShowModalDisconnect(false);
              //window.location.reload();
            }}
          ></i>
        </span>
        <div>
          <TbPlugConnectedX style={{ color: "red", fontSize: 50 }} />
          <br />
          <h6 className="text-center text-dark">
            Wallet Disconnected Successfully!
          </h6>
        </div>
        <p className="text-center text-dark">
          You need to reconnect Nami wallet to be able to use littlefish:{" "}
          <a href="https://app.littlefish.foundation/">
            https://app.littlefish.foundation/
          </a>
          <br />
        </p>
      </div>
    </div>
  );
};

export default DisconnectedModal;
