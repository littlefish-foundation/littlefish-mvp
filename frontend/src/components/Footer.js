import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <br />
      <p className="text-footer">Littlefish</p>
      <div className="social-icons-align">
        <a
          href="https://www.youtube.com/channel/UCqST3YotsWuc0faaqsLjdKQ/videos"
          style={{ color: "white" }}
        >
          <i className="pi pi-youtube" style={{ fontSize: "3em" }}></i>
        </a>
        <a href="https://discord.gg/tBKZd5AGUS" style={{ color: "white" }}>
          <span className="pi pi-discord" style={{ fontSize: "3em" }}></span>
        </a>
        <a href="https://twitter.com/LittleFishDAO" style={{ color: "white" }}>
          <i className="pi pi-twitter" style={{ fontSize: "3em" }}></i>
        </a>
        <a
          href="https://github.com/littlefish-foundation"
          style={{ color: "white" }}
        >
          <span className="pi pi-github" style={{ fontSize: "3em" }}></span>
        </a>
      </div>
      <p className="text-footer">Copyright ©-All rights are reserved</p>
    </footer>
  );
};

export default Footer;
