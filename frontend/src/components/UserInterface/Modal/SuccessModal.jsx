import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import useFetchActions from "../../../Hooks/useFetch";
import "./modal.css";
import ActionModal from "../../actionModal/actionModal";

const SuccessModal = ({ setShowModal }) => {
  const { allActions } = useFetchActions(
    "https://api.littlefish.foundation/action"
  );

  const navigate = useNavigate();

  const navigateActions = () => {
    // 👇️ navigate to /
    navigate("/action");
  };

  return (
    <div className="modal__wrapper">
      <div className="single__modal__success">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <div>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />
          <h6 className="text-center text-dark">
            Action Generation was Successful
            <p>Preview of Your Action:</p>
          </h6>
        </div>
        <div className="nft__centered">
          {allActions?.slice(0, 1).map((item) => (
            <ActionModal item={item} />
          ))}
        </div>

        <br />
        <button className="place__bid-btn" onClick={navigateActions}>
          Redirect to Actions
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
