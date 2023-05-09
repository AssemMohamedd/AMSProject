import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/storage";

const Bidder = () => {
  const auth = getAuthUser();
  return <>{auth && auth[0].type === "bidder" ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default Bidder;