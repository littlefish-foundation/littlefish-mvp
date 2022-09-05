import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Header from "./Header";
import Wallet from "../../pages/Wallet";

const ConnectedMarker = (props) => {
  const ConnectedOrNot = props.namiAddr;
  {<Header namiAddr={ConnectedOrNot}/>}

  return (
    <div>
      <FiberManualRecordIcon sx={{ color: "green" }} />
    </div>
  );
};

export default ConnectedMarker;
