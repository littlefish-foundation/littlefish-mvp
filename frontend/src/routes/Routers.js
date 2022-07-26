import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import About from "../pages/About";
import Actions from "../pages/Actions";
import Create from "../pages/Create";
import Wallet from "../pages/Wallet";
import Colony from "../pages/Colony";
import Subcolony from "../pages/Subcolony";

import NftDetails from "../pages/NftDetails";
import ColonyDetails from "../pages/ColonyDetails";
import MemberForm from "../components/colonies/MemberForm";
import MemberProfile from "../pages/profile/MemberProfile";
import Littlefish from "../pages/Littlefish";

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/colony/Littlefish%20Foundation" />}
      />

      {/* <Route path="/action" element={<Actions />} /> */}
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/create" element={<Create />} />
      <Route path="/about" element={<About />} />
      <Route path="/littlefish" element={<Littlefish />} />
      <Route path="/MemberForm" element={<MemberForm />} />

      {/* <Route path="/colony" element={<ColonyDetails />} /> */}
      <Route path="/colony/:name" element={<ColonyDetails />} />
      <Route path="/user/:name" element={<MemberProfile />} />
      <Route path="/subcolony/:name" element={<Subcolony />} />

      <Route path="/action/:_id" element={<NftDetails />} />
    </Routes>
  );
};

export default Routers;
