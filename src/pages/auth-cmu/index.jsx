import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth";

export default function AuthCMU() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { setSession, updateUser, setIsLoggedIn } = useAuth();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) return;

    axiosInstance
      .post("/cmu-auth/signin", { authorizationCode: code })
      .then((resp) => {
        if (resp.data.ok) {
          console.log("resp", resp);

          setIsLoggedIn(true);
          setSession(resp.accessToken);
          updateUser(resp.user);

          navigate("/"); // Navigate to /me after successful login
        }
      })
      .catch((error) => {
        if (!error.response) {
          setMessage(
            "Cannot connect to CMU OAuth Server. Please try again later."
          );
        } else if (!error.response.data.ok) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Unknown error occurred. Please try again later.");
        }
      });
  }, [navigate]); // Include navigate in the dependency array

  return <div className="p-3">{message || "Redirecting ..."}</div>;
}
