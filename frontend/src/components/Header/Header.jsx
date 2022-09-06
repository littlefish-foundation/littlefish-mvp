import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { Container } from "reactstrap";
import abstract from "../../assets/avatarsAndImages/abstract.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { NavLink, Link } from "react-router-dom";

const NAV__LINKS = [
  {
    display: "Actions",
    url: "/action",
  },
  {
    display: "Colonies",
    url: "/colony",
  },
  {
    display: "Generate",
    url: "/create",
  },
  {
    display: "About",
    url: "/about",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const menuRef = useRef(null);

  let address = localStorage.length;
  console.log(address);

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

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
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

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            <button
              style={{
                border: address !== 0 ? "3px solid green" : "3px solid #2037e4",
              }}
              className="btn d-flex gap-2 align-items-center"
            >
              <span>
                <i className="ri-wallet-line" color="success"></i>
              </span>

              <Link to="/wallet">
                {address !== 0 ? "Wallet Connected" : "ConnectWallet"}
              </Link>
            </button>

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
