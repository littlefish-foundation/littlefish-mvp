import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";
import abstract from "../../assets/abstract.png";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink1 from "react-bootstrap/NavLink";
import { NavLink, Link } from "react-router-dom";

const DropDownElement = (
  <div>
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink1}>Create</Dropdown.Toggle>
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
    display: "Actions",
    url: "/action",
  },
  {
    display: "Colonies",
    url: "/colony",
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
                      navClass.isActive ? "active__header" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            <Link
              to="/wallet"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button
                style={{
                  color: " #fff",
                  border: address !== 0 ? "none" : "2px solid white",
                  background:
                    address !== 0 ? "rgb(205,173,72)" : " transparent",
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

                {address !== 0 ? "Wallet Connected" : "Connect Wallet"}
              </button>
            </Link>

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
