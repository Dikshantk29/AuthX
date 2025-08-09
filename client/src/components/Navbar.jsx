import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();


  return (
    <div className="w-full flex items-center justify-between p-4 sm:p-6 sm:px-5 absolute top-0 ">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-full text-gray-800 hover:bg-gray-100 transition-all"
      >
        Login
        <img src={assets.arrow_icon} alt="" srcset="" />
      </button>
    </div>
  );
};

export default Navbar;
