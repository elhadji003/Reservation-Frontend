import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { User } from "lucide-react";
import SidebarRight from "./user/SidebarRight";
import ButtonLogout from "./global/ButtonLogout";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <span className="flex items-baseline-last font-bold text-lg text-gray-800">
              SAMA <p className="text-sm lowercase">RERSERVATION</p>
            </span>
          </div>

          {/* Menu Desktop */}
          <ul className="hidden sm:flex space-x-6 text-amber-800 font-medium">
            <li className="hover:scale-110 transition-all duration-200 ease-in-out">
              <Link to="/dashboardClient">Accueil</Link>
            </li>
            <li className="hover:scale-110 transition-all duration-200 ease-in-out">
              <Link to="/slotsList">Créneaux</Link>
            </li>
            <li className="hover:scale-110 transition-all duration-200 ease-in-out">
              <Link to="/reservation">Réservations</Link>
            </li>
            <li
              className="hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
              onClick={() => setDrawerOpen(true)} // 👈 ouvrir sidebar
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
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/slots" onClick={() => setIsOpen(false)}>
                Créneaux
              </Link>
            </li>
            <li>
              <Link to="/bookings" onClick={() => setIsOpen(false)}>
                Réservations
              </Link>
            </li>
            <li>
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar Drawer à droite */}
      <SidebarRight
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      />
    </>
  );
};

export default Navbar;
