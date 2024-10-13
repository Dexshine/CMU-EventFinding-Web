import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useLocalStorageState } from "@toolpad/core";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorageState("isLoggedIn", false);
  const [user, setUser] = useState(null);
  const [localUser, setLocalUser] = useLocalStorageState("user", "");
  const [accessToken, setAccessToken] = useLocalStorageState(
    "accessToken",
    null
  );

  const verifyToken = (serviceToken) => {
    if (!serviceToken) {
      return false;
    }
    const decoded = jwtDecode(serviceToken);

    return decoded.exp > Date.now() / 1000;
  };

  const setSession = (serviceToken) => {
    if (serviceToken) {
      sessionStorage.setItem("serviceToken", serviceToken);

      setAccessToken(serviceToken);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
      sessionStorage.removeItem("serviceToken");
      setAccessToken(null);
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  };

  useEffect(() => {
    const serviceToken = accessToken;

    // const serviceToken = sessionStorage.getItem("serviceToken");

    if (serviceToken && verifyToken(serviceToken)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setLocalUser(null);
      setAccessToken(null);
    }
  }, [accessToken]);

  const updateUser = (userData) => {
    const prev = localUser ? JSON.parse(localUser) : {};

    setLocalUser(
      JSON.stringify({
        ...prev,
        ...userData,
      })
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axiosInstance.post(`/auth/google`, {
          token: tokenResponse.access_token,
        });

        setSession(res.data.accessToken);
        // setAccessToken(res.data.accessToken);
        setIsLoggedIn(true);
        // setUser(res.data.googleData);
        setLocalUser(
          JSON.stringify({
            // ...res.data.googleData,
            ...res.data.user,
          })
        );

        window.location.replace("/");

        // return res.data;
      } catch (error) {
        console.error("Google login error:", error);
        alert("Server error. Please try again later.");
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      alert("Google login was unsuccessful. Please try again.");
    },
  });

  const login = () => {
    googleLogin();
  };

  const logout = () => {
    googleLogout();
    setSession(null);
    setIsLoggedIn(false);
    setUser(null);
    setLocalUser(null);
  };

  // console.log("localUser", JSON.parse(localUser));
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn === "true" ? true : false,
        setIsLoggedIn,
        user: localUser ? JSON.parse(localUser) : "",
        updateUser,
        setSession,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
