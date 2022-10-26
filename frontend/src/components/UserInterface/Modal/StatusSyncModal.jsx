import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./modal.css";

const StausSyncModal = ({ setShowSyncModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal__success">
        <span className="close__modal">
          <i
            className="ri-close-line"
            onClick={() => {
              setShowSyncModal(false);
              window.location.reload();
            }}
          ></i>
        </span>
        <div>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />
          <h6 className="text-center text-dark">
            Action Status Sync was Successful!
          </h6>
        </div>
        <div className="nft__centered"></div>
      </div>
    </div>
  );
};

export default StausSyncModal;
