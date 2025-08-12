import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import React, { useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);

  const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
    e.target.value = value; // Ensure only digits stay
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (inputRefs.current[index].value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);

    if (pasteData.length > 0) {
      pasteData.split("").forEach((char, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = char;
        }
      });

      // Focus last filled box
      const lastIndex = pasteData.length - 1;
      if (lastIndex >= 0 && lastIndex < 6) {
        inputRefs.current[lastIndex].focus();
      }
    }
  };

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  const otp = inputRefs.current.map((input) => input.value).join("");
  console.log("Entered OTP:", otp);

  const data = await fetch(`${backendUrl}/api/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // fix: should be credentials, not Credential
    body: JSON.stringify({ userId: userData._id, otp }), // send both
  });

  if (data.ok) {
    getUserData(); // refresh user data
    alert("Email verified successfully!");
    navigate("/");
  } else {
    const err = await data.json();
    console.error("OTP verification failed:", err.message);
    alert(err.message || "OTP verification failed");
  }
};
useEffect(() => {
  isLoggedIn && !userData.isAccountVerified && navigate("/");
}, [isLoggedIn, userData.isAccountVerified, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-500 to-purple-100 relative">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 absolute left-5 top-5 sm:left-20 cursor-pointer"
      />
      <form
        className="bg-white p-6 rounded shadow-md"
        onSubmit={onSubmitHandler}
      >
        <h2 className="text-lg font-semibold mb-4">Verify Your Email</h2>
        <p className="text-sm mb-4">
          Please enter the verification code sent to your email.
        </p>

        <div className="flex justify-center">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="border border-gray-300 p-2 rounded w-10 mb-4 text-center ml-2 align-middle"
                required
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
              />
            ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
