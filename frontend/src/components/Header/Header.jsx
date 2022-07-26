import React, { useRef, useEffect } from "react";
import { Container } from "reactstrap";
import abstract from "../../assets/abstract.png";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLinkBootstrap from "react-bootstrap/NavLink";
import cardanoIcon from "../../assets/cardano.png";
import { NavLink } from "react-router-dom";
import "./header.css";

const DropDownElement = (
  <div>
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLinkBootstrap}>Create</Dropdown.Toggle>
      <Dropdown.Menu style={{ background: "rgb(20, 20, 30)" }}>
        <Dropdown.Item as={NavLink} to="/create" style={{ fontWeight: "900" }}>
          Create new Action
        </Dropdown.Item>

        <Dropdown.Item
          as={NavLink}
          to="/MemberForm"
          style={{ fontWeight: "900" }}
        >
          Become a Member
        </Dropdown.Item>

        <Dropdown.Item style={{ fontWeight: "900" }} disabled>
          Create a Colony
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

const NAV__LINKS = [
  {
    display: "Colony",
    url: "/colony/Littlefish%20Foundation",
  },
  {
    display: "littlefish",
    url: "/littlefish",
  },
  {
    display: DropDownElement,
    url: "#",
  },

  {
    display: "About",
    url: "/about",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  let address = sessionStorage.length;
  let network = sessionStorage.getItem("connectedNetwork");
  let walletID = sessionStorage.getItem("walletID");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");
  console.log(network);

  const buttonBackground = () => {
    if (network === "1" && address !== 0) {
      return "rgb(186,152,69)";
    } else if (network === "0" && address !== 0) {
      return "rgb(227,153,151)";
    } else {
      return "transparent";
    }
  };

  const buttonLabel = () => {
    if (network === "1" && address !== 0) {
      let first6 = walletID.slice(0, 6);
      let last4 = walletID.slice(-4);
      return (
        <div style={{ fontSize: "0.9rem" }}>
          Connected (mainnet)
          <div style={{ fontSize: "0.6rem" }}>
            {first6}...{last4}
            <img src={cardanoIcon} alt="" className="cardano__icon__address" />
          </div>
        </div>
      );
    } else if (network === "0" && address !== 0) {
      let first6 = walletID.slice(0, 6);
      let last4 = walletID.slice(-4);
      return (
        <div style={{ fontSize: "0.9rem" }}>
          Connected (testnet)
          <div style={{ fontSize: "0.6rem" }}>
            {first6}...{last4}
            <img src={cardanoIcon} alt="" className="cardano__icon__address" />
          </div>
        </div>
      );
    } else {
      return <div style={{ fontSize: "0.9rem" }}>Connect Wallet</div>;
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <NavLink
            to="/colony/Littlefish%20Foundation"
            style={{ textDecoration: "none" }}
          >
            <div className="logo">
              <h2 className=" d-flex gap-2 align-items-center ">
                <span>
                  <div className="abstractLogo">
                    <img
                      src={abstract}
                      className="abstractLogo"
                      alt="Abstract Collection Logo"
                    />
                  </div>
                </span>
                | littlefish
              </h2>
            </div>
          </NavLink>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active__header" : ""
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            <NavLink
              to="/wallet"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button
                style={{
                  color: " #fff",
                  border: "2px solid white",
                  background: buttonBackground(),
                  fontSize: "0.6rem",
                }}
                className="btn d-flex gap-2 align-items-center"
              >
                <span>
                  <i
                    className="ri-wallet-line"
                    style={{
                      fontSize: "25px",
                      textDecoration: "none",
                      color: "#fff",
                    }}
                  ></i>
                </span>
                {buttonLabel()}
              </button>
            </NavLink>

            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
