// src/routes/publicRoutes.js
import React from "react";
import ForgotPwd from "../pages/auth/ForgotPwd";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Acceuil from "../pages/home/Acceuil";
import ResetPwd from "../pages/auth/ResetPws";

export const publicRoutes = [
  { path: "/", element: <Acceuil /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-pwd", element: <ForgotPwd /> },
  { path: "/reset-password/:uid/:token", element: <ResetPwd /> },
];
