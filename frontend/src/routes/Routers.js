import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import About from "../pages/About";
import Actions from "../pages/Actions";
import Create from "../pages/Create";
import Wallet from "../pages/Wallet";
import Colony from "../pages/colonies/Colony";

import NftDetails from "../pages/NftDetails";
import ColonyDetails from "../pages/colonies/ColonyDetails";
import MemberForm from "../pages/colonies/MemberForm";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/action" />} />
      <Route path="/about" element={<About />} />

      <Route path="/action" element={<Actions />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/colony" element={<Colony />} />
      <Route path="/colony/:name" element={<ColonyDetails />} />
      <Route path="/colony/:name/MemberForm" element={<MemberForm />} />



      <Route path="/create" element={<Create />} />
      <Route path="/action/:assetName" element={<NftDetails />} />
    </Routes>
  );
};

export default Routers;