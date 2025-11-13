import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const CheckOut = () => {
  return (
    <>
      <div className="relative  bg-gray-400">
        <Navbar />
        <div className="fixed text-green-600 top-40 text-5xl left-70 font-[poppins] text-center font-bold">Your order has been placed.</div>
        <Link to={"/"} className="font-semibold fixed left-70 text-center top-70">
          Continue Shopping...
        </Link>
        <Footer />
      </div>
    </>
  );
};

export default CheckOut;
