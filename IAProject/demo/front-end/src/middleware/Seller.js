import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/storage";

const Seller = () => {
  const auth = getAuthUser();
  return <>{auth && auth[0].type === "seller" ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default Seller;