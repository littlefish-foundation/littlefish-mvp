import React from "react";

import "./modal.css";

const Modal = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Buy Action</h6>
        <p className="text-center text-light">
          You must pay at least<span className="money"> 10 ADA</span>
        </p>

        <div className="input__item mb-4">
          <input type="number" placeholder="00 : 00 ADA" />
        </div>

       

        <div className=" d-flex align-items-center justify-content-between">
          <p>Your payment must be at least</p>
          <span className="money">ADA</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Service Fee</p>
          <span className="money">0.15 ADA</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Total Price Amount</p>
          <span className="money">10.15 ADA</span>
        </div>

        <button className="place__bid-btn">Buy Action</button>
      </div>
    </div>
  );
};

export default Modal;
