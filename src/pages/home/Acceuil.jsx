// src/pages/home/Acceuil.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaBriefcase, FaLaptopHouse, FaUserTie } from "react-icons/fa";
import imageA from "../../assets/images/bureau3.jpg";
import Section2 from "../../components/acceuil/Section2";

function Acceuil() {
  const navigate = useNavigate();
  const isAuthenticated = false; // À remplacer par ton auth context

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/reservation");
    }
  };

  const services = [
    {
      title: "Salles de Réunion",
      description:
        "Réservez nos salles équipées pour vos conférences et réunions.",
      icon: <FaUsers size={30} />,
    },
    {
      title: "Bureaux Privés",
      description: "Travaillez dans un environnement calme et productif.",
      icon: <FaBriefcase size={30} />,
    },
    {
      title: "Espaces de Coworking",
      description: "Des espaces partagés modernes et connectés.",
      icon: <FaLaptopHouse size={30} />,
    },
    {
      title: "Consultations Professionnelles",
      description: "Réservez des rendez-vous avec des experts.",
      icon: <FaUserTie size={30} />,
    },
  ];

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center text-white px-4 flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${imageA})`,
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 z-0" />

        {/* Contenu principal */}
        <div className="relative z-10 text-center mt-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-amber-100">
            Bienvenue sur notre Système de Réservation
          </h1>
          <p className="italic text-amber-200 text-lg mb-6">
            Votre temps, vos réservations, en toute simplicité.
          </p>
          <p className="text-md md:text-lg mb-8">
            Réservez facilement vos créneaux, salles ou rendez-vous en ligne.
            Choisissez le service qui vous intéresse ci-dessous.
          </p>

          <button
            onClick={handleBookingClick}
            className="px-8 py-4 border border-amber-100 text-amber-100 font-semibold rounded-lg text-xl transition-all duration-300 shadow-lg hover:bg-amber-200 hover:text-black"
          >
            Réserver un Créneau Maintenant
          </button>
        </div>

        {/* Section services */}
        <div className="relative z-10 mt-20 w-full max-w-6xl px-4 mb-6">
          <h2 className="text-3xl font-light mb-10 text-center bg-amber-200 text-black rounded-md py-2">
            Nos Services Disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
      </div>
      <Section2 isAuth={handleBookingClick} />
      <footer className="relative z-10 mt-16 mb-4 text-center text-sm text-gray-800">
        &copy; {new Date().getFullYear()} Réservation Pro. Tous droits réservés.
      </footer>
    </>
  );
}

const ServiceCard = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="backdrop-blur-md bg-white/5 p-6 rounded-xl shadow-lg w-full border border-gray-300 text-white"
  >
    <div className="mb-4 text-amber-300">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-amber-100">{title}</h3>
    <p className="text-base">{description}</p>
  </motion.div>
);

export default Acceuil;
