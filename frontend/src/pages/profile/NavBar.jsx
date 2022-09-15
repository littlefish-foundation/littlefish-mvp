import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserGallery from "./userGallery";

import "./navbar.css";

function NavBar() {
  const [key, setKey] = useState("created");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      style={{
        marginLeft: "30px",
        marginTop: "20px",
        backgroundColor: "transparent !important",
      }}
    >
      <Tab
        eventKey="created"
        title="Created Actions"
        style={{ backgroundColor: "transparent !important" }}
      >
        {" "}
        <UserGallery
          style={{ backgroundColor: "transparent !important" }}
        />{" "}
      </Tab>
      <Tab eventKey="purchased" title="Rewarded Actions"></Tab>
      <Tab eventKey="collected" title="Transactions"></Tab>
    </Tabs>
  );
}

export default NavBar;
