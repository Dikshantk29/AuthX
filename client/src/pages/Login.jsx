import React, { useState } from "react";
import { assets } from "../assets/assets";
const Login = () => {
  const [state, setState] = useState("Sign Up");

  return (
    <div className="flex  items-center justify-center min-h-screen px-6 sm:px-0  bg-gradient-to-br from-blue-500 to-purple-100">
      <img
        src={assets.logo}
        alt=""
        srcset=""
        className="w-28 sm:w-32 absolute left-5 top-5 sm:left-20 cursor-pointer"
      />
      <div className="bg-slate-300 p-10 rounded-lg shadow-lg w-full sm:w-96  text-indigo-900 text-small">
        <h2 className=" text-center gap-1 text-3xl font-semibold mb-4  ">
          {state === "Sign Up" ? "Create account" : "Login to your account"}
        </h2>
        <p className="text-sm  text-center mb-6">
          {state === "Sign Up" ? "Create an account" : "Don't have an account?"}
        </p>
        <form>
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.person_icon} alt="" />
            <input
              type="text"
              placeholder=" Full Name"
              className="bg-transparent outline-none text-white"
            />
          </div>
          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder=" Email"
              className="bg-transparent outline-none text-white"
            />
            <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                type="password"
                placeholder=" Password"
                className="bg-transparent outline-none text-white"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
