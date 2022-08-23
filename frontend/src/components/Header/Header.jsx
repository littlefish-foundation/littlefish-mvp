import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";
import abstract from "../../assets/abstract.png";
import SearchBar from "./SearchBar";

import { NavLink, Link } from "react-router-dom";

const NAV__LINKS = [
  {
    display: "Dashboard",
    url: "/dashboard",
  },
  {
    display: "Gallery",
    url: "/action",
  },
  {
    display: "Colony",
    url: "/colony",
  },
  {
    display: "Generate",
    url: "/create",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const menuRef = useRef(null);

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

    return () => {
      window.removeEventListener("scroll");
    };
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

          <SearchBar/>

          <div className="nav__right d-flex align-items-center gap-5 ">
            <button className="btn d-flex gap-2 align-items-center">
              <span>
                <i className="ri-wallet-line"></i>
              </span>
              <Link to="/wallet">Connect Wallet</Link>
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