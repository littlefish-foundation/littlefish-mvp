import React from "react";

import "./modal.css";

const Modal = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>

        <button className="place__bid-btn">Buy Action</button>
      </div>
    </div>
  );
};

export default Modal;
