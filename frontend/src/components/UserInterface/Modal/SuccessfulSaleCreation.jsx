import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./modal.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const SuccessfulSaleCreation = ({ setShowModal, setIsOpen, paymentLinks }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal__success">
        <span className="close__modal">
          <i
            className="ri-close-line"
            onClick={() => {
              setShowModal(false);
              setIsOpen(false);
            }}
          ></i>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="success"
              style={{
                marginTop: "20px",
                marginBottom: "0.7rem",
                height: "65px",
              }}
            >
              <td onClick={() => window.open(`${paymentLinks}`, "_blank")}>
                <i className="ri-shopping-bag-line"></i>
                Get Action
              </td>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulSaleCreation;
