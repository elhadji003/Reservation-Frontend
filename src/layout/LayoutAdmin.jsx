import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet /> {/* Injecte la page en fonction de la route */}
      </main>
    </div>
  );
};

export default LayoutAdmin;
