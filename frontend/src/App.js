import "./App.css";

import "./components/Header.css";
import React from "react";

import "./formcomponents/modal/index.css";
import "./formcomponents/modal/App.css";

import { Route, Switch } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Layout from "./components/Layout";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <div className="app">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Gallery />
          </Route>
          <Route path="/details" exact>
            <DetailsPage />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
