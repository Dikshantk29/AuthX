import React,{ useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext.jsx";
const Header = () => {

  const {userData} = useContext(AppContext);
  return (
    <div className="flex flex-col items-center m-20 px-4 text-center text-gray-800 ">
      <img
        src={assets.header_img}
        alt=""
        srcset=""
        className="w-26 h-36 rounded-full mb-6"
      />
      <h1 className="text-xl  flex items-center gap-2 sm:text-3xl font-medium mb-2">
        Hey {userData ?.name || "Developer"}
      </h1>
      <img
        src={assets.hand_wave}
        alt=""
        srcset=""
        className="w-8 aspect-square"
      />
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our app
      </h2>
      <p className="mb-6 max-w-md">We are glad to have you here. Let's get started!</p>
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
