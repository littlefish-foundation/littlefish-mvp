import React from "react";
import Abstract from "../assets/Header/Abstract.png";
import searchIcon from "../assets/Header/search.png";
import themeSwitchIcon from "../assets/Header/theme-switch.png";
import "primeicons/primeicons.css"; //icons
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import '../formcomponents/modal/index.css';
import '../formcomponents/modal/App.css';
import Container from "../formcomponents/modal/Container";

const Header = () => {
  const triggerText = "Create a New Action";
  const onSubmit = (event) => {
    event.preventDefault(event);
  };

  return (
    <div className="header">
      <div className="logoContainer">
        <img
          src={Abstract}
          className="abstractLogo"
          alt="Abstract Collection Logo"
        />
      </div>
      <div className="searchBar">
        <div className="searchIcon">
          <img src={searchIcon} alt="" />
        </div>
        <input className="searchInput" placeholder="Collections, Items, User" />
      </div>
      <div className="headerItems">
        <p><a href="https://docs.google.com/document/d/1U_RIQxkM4DW2_J8mF8_spJzs8HbJH1PusJNK4b_ix8k/edit?usp=sharing" style={{color: 'white'}}>Whitepaper</a></p>
        <p><a href="https://cardano.ideascale.com/c/idea/404668" style={{color: 'white'}}>Proposal</a></p>
        <p><a href="https://publish.obsidian.md/littlefish-foundation/Littlefish+Vault" style={{color: 'white'}}>The Vault</a></p>
      </div>
      <div className="headerActions">
        <div className="themeSwitch">
          <img src={themeSwitchIcon} alt="Dark Mode Switch" />
        </div>
      </div>
      <Container triggerText={triggerText} onSubmit={onSubmit} />
    </div>
  );
};
export default Header;
