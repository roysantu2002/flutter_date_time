import React from "react";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import Seller from "../components/seller";
import { useSelector } from "react-redux";

const sellerDashboard = (props) => {


  // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const router = useRouter();
  return <Seller />;
};

export default sellerDashboard;
