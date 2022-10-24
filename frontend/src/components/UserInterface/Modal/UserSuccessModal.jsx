import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import "./modal.css";
import useGetUserProfileData from "../../../Hooks/getUserProfileData";
import UserProfileCard from "../../userProfileCard/UserProfileCard";

const UserSuccessModal = ({ setShowModal }) => {
  const navigate = useNavigate();

  const { userProfileData } = useGetUserProfileData();
  const navigateActions = () => {
    navigate("/colony/Littlefish%20Foundation");
  };

  return (
    <div className="modal__wrapper">
      <div className="single__modal__success">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <div>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />
          <h6 className="text-center text-dark">Application was Successful</h6>
        </div>
        <div className="nft__centered">
          {userProfileData
            ?.slice(userProfileData?.length - 1, userProfileData?.length)
            .map((item) => (
              <UserProfileCard item={item} key={item._id} />
            ))}
        </div>

        <br />
        <button className="place__bid-btn" onClick={navigateActions}>
          Redirect to Colony
        </button>
      </div>
    </div>
  );
};

export default UserSuccessModal;
