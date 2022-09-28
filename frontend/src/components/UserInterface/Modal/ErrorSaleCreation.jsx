import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./modal.css";

const ErrorSaleCreation = ({ setShowModal, errorMessage, setIsOpen }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal__success">
        <span className="close__modal">
          <i
            class="ri-close-line"
            onClick={() => {
              setShowModal(false);
              setIsOpen(false);
            }}
          ></i>
        </span>
        <div>
          <ErrorIcon sx={{ color: "red", fontSize: 50 }} />
          <h6 className="text-center text-dark">
            Action Sale Failed to Create
            <p className="text-center text-dark">Error Message 👇️ :</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {errorMessage.message}
            </div>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ErrorSaleCreation;
