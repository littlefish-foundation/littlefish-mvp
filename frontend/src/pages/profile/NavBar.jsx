import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserGallery from "./userGallery";
import "./navbar.css";

function NavBar(props) {
  const [key, setKey] = useState("created");
  let producerName = props.producerName;
  let colony = props.colony;

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        style={{
          marginLeft: "30px",
          marginTop: "55px",
          backgroundColor: "transparent !important",
        }}
      >
        <Tab
          eventKey="created"
          title="Created"
          style={{ backgroundColor: "transparent !important" }}
        >
          {" "}
          <UserGallery
            producerName={producerName}
            colony={colony}
            style={{ backgroundColor: "transparent !important" }}
          />{" "}
        </Tab>
        <Tab
          eventKey="collected"
          title="Collected"
          style={{ backgroundColor: "transparent !important" }}
        ></Tab>

        <Tab eventKey="purchased" title="Rewarded"></Tab>
        <Tab eventKey="transactions" title="Transactions"></Tab>
      </Tabs>
    </div>
  );
}

export default NavBar;
