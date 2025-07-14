import React from "react";
import { useGetMeQuery } from "../features/auth/authAPI";
import MyReservations from "./MyReservations";

const DashboardClient = () => {
  const { data: user } = useGetMeQuery();

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-100">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-6 bg-white shadow-lg rounded-xl max-sm:flex-col-reverse ">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Bienvenue, <span className="text-amber-600">{user?.username}</span>{" "}
            !
          </h1>
          <p className="text-gray-500 mt-1">
            Voici votre tableau de bord personnel
          </p>
        </div>

        <div className="flex items-center space-x-4 max-sm:flex-col">
          <div className="w-14 h-14 rounded-full overflow-hidden shadow-md border-2 border-amber-500 bg-white">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white bg-amber-600 text-xl font-bold">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>
      </header>

      <MyReservations />
    </div>
  );
};

export default DashboardClient;
