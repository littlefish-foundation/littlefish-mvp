import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import About from "../pages/About";
import Actions from "../pages/Actions";
import Create from "../pages/Create";
import Wallet from "../pages/Wallet";
import Colony from "../pages/Colony";

import NftDetails from "../pages/NftDetails";
import ColonyDetails from "../pages/ColonyDetails";
import MemberForm from "../components/colonies/MemberForm";
import MemberProfile from "../pages/profile/MemberProfile";
import Members from "../pages/Members";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/action" />} />

      <Route path="/action" element={<Actions />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/create" element={<Create />} />
      <Route path="/about" element={<About />} />
      <Route path="/members" element={<Members />} />
      <Route path="/MemberForm" element={<MemberForm />} />

      <Route path="/colony" element={<Colony />} />
      <Route path="/colony/:name" element={<ColonyDetails />} />
      <Route path="/user/:name" element={<MemberProfile />} />

      <Route path="/action/:_id" element={<NftDetails />} />
    </Routes>
  );
};

export default Routers;
