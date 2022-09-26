import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./modal.css";

const SuccessfulSaleCreation = ({ setShowModal, paymentLinkGet }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal__success">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <div>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />
          <h5 className="text-center text-dark">
            Action Sale was Created Successfully{" "}
            <h6>
              Click on the "Get Action" Button 👇️ <br /> to Redirect to
              purchasing page to get your Action Sale
            </h6>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulSaleCreation;
