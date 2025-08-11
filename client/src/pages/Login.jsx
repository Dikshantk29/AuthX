import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = `${backendUrl}/api/auth/${
        state === "Sign Up" ? "register" : "login"
      }`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ ${state} successful:`, data);
        setIsLoggedIn(true);
        getUserData();
        navigate("/"); // Navigate to home page
      } else {
        console.error(`❌ ${state} failed:`, data);
        alert(data.message || `${state} failed. Please try again.`);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-500 to-purple-100 relative">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 absolute left-5 top-5 sm:left-20 cursor-pointer"
      />

      <div className="bg-slate-300 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-900">
        <h2 className="text-center text-3xl font-semibold mb-4">
          {state === "Sign Up" ? "Create account" : "Login to your account"}
        </h2>

        <p className="text-sm text-center mb-6">
          {state === "Sign Up" ? "Create an account" : "Don't have an account?"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                className="bg-transparent outline-none text-white w-full"
                required={state === "Sign Up"}
              />
            </div>
          )}

          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none text-white w-full"
              required
            />
          </div>

          <div className="flex items-center gap-3 mb-6 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-white w-full"
              required
            />
          </div>
          
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-600 cursor-pointer"
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-full text-white font-semibold transition ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Processing..." : state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-indigo-600 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-indigo-600 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
//________________________________________________________________
// import React, { useState, useContext } from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { backendUrl, setIsLoggedIn } = useContext(AppContext);

//   const [state, setState] = useState("Sign Up");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // const onSubmitHandler = async (e) => {
//   //   try {
//   //     e.preventDefault();
//   //     const url = `${backendUrl}/api/auth/${
//   //       state === "Sign Up" ? "register" : "login"
//   //     }`;
//   //     const response = await fetch(url, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       credentials: "include",
//   //       body: JSON.stringify({ name, email, password }),
//   //     });
//   //     const data = await response.json();
//   //     if (response.ok) {
//   //       setIsLoggedIn(true);
//   //       navigate("/");
//   //     } else {
//   //       console.error(data);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-500 to-purple-100 relative">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="Logo"
//         className="w-28 sm:w-32 absolute left-5 top-5 sm:left-20 cursor-pointer"
//       />

//       <div className="bg-slate-300 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-900">
//         <h2 className="text-center text-3xl font-semibold mb-4">
//           {state === "Sign Up" ? "Create account" : "Login to your account"}
//         </h2>

//         <p className="text-sm text-center mb-6">
//           {state === "Sign Up" ? "Create an account" : "Don't have an account?"}
//         </p>

//         <form onSubmit={onSubmitHandler}>
//           {state === "Sign Up" && (
//             <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//               <img src={assets.person_icon} alt="Person Icon" />
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 type="text"
//                 placeholder="Full Name"
//                 className="bg-transparent outline-none text-white w-full"
//               />
//             </div>
//           )}

//           <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.mail_icon} alt="Mail Icon" />
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               type="email"
//               placeholder="Email"
//               className="bg-transparent outline-none text-white w-full"
//             />
//           </div>

//           <div className="flex items-center gap-3 mb-6 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.lock_icon} alt="Lock Icon" />
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               type="password"
//               placeholder="Password"
//               className="bg-transparent outline-none text-white w-full"
//             />
//           </div>
//           <p
//             onClick={() => navigate("/reset-password")}
//             className="mb-4 text-indigo-600 cursor-pointer"
//           >
//             Forgot Password?
//           </p>

//           <button
//             type="submit"
//             className="w-full py-2.5 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
//           >
//             {state}
//           </button>
//         </form>

//         {state === "Sign Up" ? (
//           <p className="text-center mt-4 text-sm">
//             Already have an account?{" "}
//             <span
//               onClick={() => setState("Login")}
//               className="text-indigo-600 cursor-pointer underline"
//             >
//               Login here
//             </span>
//           </p>
//         ) : (
//           <p className="text-center mt-4 text-sm">
//             Don't have an account?{" "}
//             <span
//               onClick={() => setState("Sign Up")}
//               className="text-indigo-600 cursor-pointer underline"
//             >
//               Sign Up
//             </span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;


//____________________________________________________________________________________________________________

// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// const Login = () => {
//   const [state, setState] = useState("Sign Up");

//   return (
//     <div className="flex  items-center justify-center min-h-screen px-6 sm:px-0  bg-gradient-to-br from-blue-500 to-purple-100">
//       <img
//         src={assets.logo}
//         alt=""
//         srcset=""
//         className="w-28 sm:w-32 absolute left-5 top-5 sm:left-20 cursor-pointer"
//       />
//       <div className="bg-slate-300 p-10 rounded-lg shadow-lg w-full sm:w-96  text-indigo-900 text-small">
//         <h2 className=" text-center gap-1 text-3xl font-semibold mb-4  ">
//           {state === "Sign Up" ? "Create account" : "Login to your account"}
//         </h2>
//         <p className="text-sm  text-center mb-6">
//           {state === "Sign Up" ? "Create an account" : "Don't have an account?"}
//         </p>
//         <form>
//           <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.person_icon} alt="" />
//             <input
//               type="text"
//               placeholder=" Full Name"
//               className="bg-transparent outline-none text-white"
//             />
//           </div>
//           <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.mail_icon} alt="" />
//             <input
//               type="email"
//               placeholder=" Email"
//               className="bg-transparent outline-none text-white"
//             />
//             <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//               <img src={assets.lock_icon} alt="" />
//               <input
//                 type="password"
//                 placeholder=" Password"
//                 className="bg-transparent outline-none text-white"
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
