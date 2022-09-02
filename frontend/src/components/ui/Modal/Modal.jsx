import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

import "./modal.css";

const Modal = ({ setShowModal }) => {
  const navigate = useNavigate();

  const navigateActions = () => {
    // 👇️ navigate to /
    navigate("/action");
  };

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <div>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />
          <h6 className="text-center text-dark">
            Action Generation was Successful
          </h6>
        </div>
        <p className="text-center text-dark">
          It may take a moment for it to appear in Actions.
        </p>

        <button className="place__bid-btn" onClick={navigateActions}>
          Redirect to Actions
        </button>
      </div>
    </div>
  );
};

export default Modal;
