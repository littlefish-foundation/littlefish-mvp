import React from "react";
import { Spinner } from "reactstrap";
import "./modal.css";

const LoadingSaleCreation = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <div>
          <Spinner color="success">Loading...</Spinner>
          <h6 className="text-center text-dark">
            Action Sale is being Generated
          </h6>
        </div>
        <p className="text-center text-dark">
          It may take a moment for process to complete. <br /> Thank you for
          your patience
        </p>
      </div>
    </div>
  );
};

export default LoadingSaleCreation;
