
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-500 to-purple-100 relative">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 absolute left-5 top-5 sm:left-20 cursor-pointer"
      />

      <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-lg font-semibold text-center mb-4">
          Reset Your Password
        </h1>
        <p className="text-white text-center mb-4">
          Enter your registered email address
        </p>
        <div className="flex items-center gap-3 w-full border border-gray-300 rounded px-5 py-2.5 bg-white">
          <img src={assets.mail_icon} alt="Mail Icon" className="w-5 h-5" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="flex-1 outline-none text-gray-700"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;