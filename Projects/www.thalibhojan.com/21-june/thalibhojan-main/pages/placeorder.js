import React from "react";
import Order from "../components/order";
import PhoneRegistration from "../components/register/PhoneRegistration";
import { useSelector } from "react-redux";

function PlaceOrder(props) {
  const auth = useSelector((state) => state.firebase.auth);
  return auth.uid ? <Order /> : <PhoneRegistration />;
}

export default PlaceOrder;
