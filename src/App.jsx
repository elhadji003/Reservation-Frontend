import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { publicRoutes } from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";
import { userRoutes } from "./routes/userRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes accessibles à tous */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Routes utilisateur avec rôle 'user' */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          {userRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Routes admin avec rôle 'admin' */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          {adminRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;
