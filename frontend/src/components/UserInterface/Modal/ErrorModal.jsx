import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./modal.css";

const ErrorModal = ({ setShowModal, errorMessage }) => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <div>
          <ErrorIcon sx={{ color: "red", fontSize: 50 }} />
          <h6 className="text-center text-dark">Action Generation Failed</h6>
        </div>
        <p className="text-center text-dark">Error Message 👇️ :</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {errorMessage.message}
        </div>
        <button className="place__bid-btn" onClick={refreshPage}>
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
