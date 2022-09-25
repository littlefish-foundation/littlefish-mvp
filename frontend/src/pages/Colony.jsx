import React from "react";
import useFetch2 from "../Hooks/useFetch2";
import ColonyCard from "../components/colonies/ColonyCard";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import { RotatingLines } from "react-loader-spinner";
import "../styles/Colony.css";

const Colony = (props) => {
  const { COLONY__DATA, loadingColony } = useFetch2(
    "https://api.littlefish.foundation/colony/"
  );
  return (
    <div>
      {loadingColony ? (
        <div className="loader-container">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <>
          <SubHeader />
          <h2
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px ",
            }}
          >
            Colonies
          </h2>
          {COLONY__DATA?.map((item) => (
            <ColonyCard
              style={{ leftMargin: "auto", rightMargin: "auto" }}
              item={item}
            />
          ))}
          <br />
        </>
      )}
    </div>
  );
};

export default Colony;
