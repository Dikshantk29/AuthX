import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/is-auth`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      // Check response.ok (HTTP status) instead of data.ok
      if (response.ok && data.success) {
        // ✅ Correct approach
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
        console.log("User not authenticated:", data.message);
      }
    } catch (error) {
      console.error("Error getting authentication state:", error);
      setIsLoggedIn(false); // Set to false on error
    }
  };

 

  const getUserData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/current-user/data`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setUserData(data.userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
