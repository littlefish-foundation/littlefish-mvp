import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";
import "./modal.css";

const ErrorModal = ({ setShowModal }) => {
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
        <p className="text-center text-dark">
          Somthing went wrong while generating. Please refresh the page and try
          again.
        </p>

        <button className="place__bid-btn" onClick={refreshPage}>
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
