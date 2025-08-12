import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);


    const sendVerifyOtp = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/auth/send-verify-otp`, {
          method: "POST",
          credentials: "include",
        });
        if (response.ok) {
          console.log("✅ Verification OTP sent");
          navigate("/verify-email");
          alert("Please check your email to verify your account.");
        } else {
          console.error("❌ Failed to send verification OTP");
        }
      } catch (error) {
        console.error("Error sending verification OTP:", error);
      }
    };
  const logout = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUserData(false);
        setIsLoggedIn(false);
        navigate("/");
        console.log("✅Logout successful");
      } else {
        console.error("❌ Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between p-4 sm:p-6 sm:px-5 absolute top-0 ">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />

      {userData ? (
        //
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm w-32 cursor-pointer">
              {!userData.isAccountVerified && (
                <li className="py-1 px-2 hover:bg-gray-200" onClick={sendVerifyOtp}>Verify email</li>
              )}
              <li className="py-1 px-2 hover:bg-gray-200" onClick={logout}>Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-full text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login
          <img src={assets.arrow_icon} alt="" srcset="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
