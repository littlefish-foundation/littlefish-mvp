import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Header.css";
import "./Footer.css";
import "../formcomponents/modal/App.css";
import "../formcomponents/modal/index.css";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};
export default Layout;
