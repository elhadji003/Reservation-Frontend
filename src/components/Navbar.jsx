import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { User } from "lucide-react";
import SidebarRight from "./user/SidebarRight";
import ButtonLogout from "./global/ButtonLogout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = useSelector((state) => state?.auth.user);

  console.log("User:", user);

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <span className="flex items-baseline-last font-bold text-lg text-gray-800">
              SAMA <p className="text-sm lowercase">RÉSERVATION</p>
            </span>
          </div>

          {/* Menu Desktop */}
          <ul className="hidden sm:flex space-x-6 text-amber-800 font-medium">
            {/* Liens visibles uniquement pour admin */}
            {isAdmin && (
              <>
                <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/dashboardAdmin">Dashboard</Link>
                </li>
                <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/mes-slots">Mes Slots</Link>
                </li>
              </>
            )}

            {/* Liens communs aux utilisateurs */}
            {isUser && (
              <>
                <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/dashboardClient">Accueil</Link>
                </li>
                <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/slotsList">Créneaux</Link>
                </li>
                {/* <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/reservation">Réservations</Link>
                </li> */}
              </>
            )}

            {/* Profil + Déconnexion */}
            <li
              className="hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
              onClick={() => setDrawerOpen(true)}
            >
              <User />
            </li>
            <li className="hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
              <ButtonLogout />
            </li>
          </ul>

          {/* Burger Button Mobile */}
          <button
            className="sm:hidden text-2xl text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* Menu Mobile */}
        <div
          className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col space-y-2 px-6 py-2 text-gray-700 font-medium">
            {isAdmin && (
              <>
                <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/dashboardAdmin">Dashboard</Link>
                </li>

                <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/mes-slots">Mes Slots</Link>
                </li>
              </>
            )}

            {isUser && (
              <>
                <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/dashboardClient">Accueil</Link>
                </li>
                <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/slotsList">Créneaux</Link>
                </li>
                <li className="hover:scale-110 transition-all duration-200 ease-in-out">
                  <Link to="/reservation">Réservations</Link>
                </li>
              </>
            )}

            {/* Profil + Logout */}
            <div className="flex items-center gap-3">
              <li
                className="hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
                onClick={() => setDrawerOpen(true)}
              >
                <User />
              </li>
              <li className="hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
                <ButtonLogout />
              </li>
            </div>
          </ul>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      <SidebarRight
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      />
    </>
  );
};

export default Navbar;
