import React, { useState } from "react";
import RegisterUser from "../../components/global/RegisterUser";
import RegisterHotelier from "../../components/global/RegisterHotelier";
import { Link } from "react-router-dom";

export default function Register() {
  const [choix, setChoix] = useState(null); // null = pas de choix encore

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Colonne gauche: infos */}
      <div className="hidden lg:flex w-1/2 bg-amber-900 items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Bienvenue sur notre plateforme !
          </h2>
          <p className="text-white mb-2">
            Choisissez votre type d'inscription pour commencer :
          </p>
          <p className="text-white">
            - Visiteur : Explorer, réserver et gérer vos séjours facilement.{" "}
            <br />- Hôtelier : Gérer votre établissement et vos réservations.
          </p>
        </div>
      </div>

      {/* Colonne droite: choix + formulaire */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-white">
        {choix === null ? (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl text-gray-800 mb-4 font-extrabold">
              Choisissez votre type d'inscription
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setChoix("visiteur")}
                className="bg-amber-900 hover:bg-amber-800 text-white px-6 py-3 rounded-lg transition"
              >
                Visiteur
              </button>
              <button
                onClick={() => setChoix("hotelier")}
                className="bg-white border border-amber-900  hover:bg-amber-900 hover:text-white text-black px-6 py-3 rounded-lg transition"
              >
                Hôtelier
              </button>
            </div>
            <div className="text-sm mt-2 text-center">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-amber-900 hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <button
              onClick={() => setChoix(null)}
              className="mb-4 text-sm text-gray-500 hover:underline"
            >
              ← Retour au choix
            </button>

            {choix === "visiteur" ? <RegisterUser /> : <RegisterHotelier />}
          </div>
        )}
      </div>
    </div>
  );
}
