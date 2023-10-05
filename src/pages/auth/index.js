import React from "react";
import "./style.css";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

const AuthComponent = () => {
  const navigate = useNavigate();

  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);

    const authInfo = {
      userId: results.user.uid,
      name: results.user.displayName,
      profilePic: results.user.photoURL,
      isAuth: true,
    };

    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page">
      <p>Sign in with google to continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With google
      </button>
    </div>
  );
};

export default AuthComponent;
