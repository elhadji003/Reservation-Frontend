import React from "react";
import { useGetAllReservationsQuery } from "../../features/reservation/reservationAPI";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaListAlt,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Format date
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("fr-FR", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ListeReserveur = () => {
  const { data: reservations, isLoading, error } = useGetAllReservationsQuery();

  if (isLoading) return <p className="text-center py-10">Chargement...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">Erreur de chargement</p>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6 justify-between  max-sm:gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3 max-sm:text-sm">
          <FaListAlt />
          Liste des réservations
        </h1>
        <Link
          to={"/create-slot"}
          className="flex items-center max-sm:text-sm gap-4 px-4 py-2 rounded-md bg-amber-700 text-white uppercase"
        >
          <span className="max-sm:hidden">Creer un slot</span> <FaPlus />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations?.length > 0 ? (
          reservations.map((res) => (
            <div
              key={res.id}
              className={`bg-white shadow rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all ${
                res.status === "cancelled" ? "opacity-50" : ""
              }`}
            >
              {/* Utilisateur */}
              <div className="flex flex-col gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaUser className="text-blue-600" />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {res.user?.full_name || res.user?.username}
                    </p>
                    {res.status === "cancelled" && (
                      <p className="text-sm text-red-500 italic">
                        a annulé sa réservation
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaEnvelope className="text-amber-600" />
                  <span>{res.user?.email}</span>
                </div>
              </div>

              {/* Date et Heure */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <FaCalendarAlt />
                <span>
                  {formatDateTime(res.slot?.start_time).split(",")[0]}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <FaClock />
                <span>
                  {formatDateTime(res.slot?.start_time)} -{" "}
                  {formatDateTime(res.slot?.end_time)}
                </span>
              </div>

              {/* Statut */}
              <div className="mt-3">
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    res.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : res.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {res.status === "cancelled"
                    ? "Annulée"
                    : res.status === "confirmed"
                    ? "Confirmée"
                    : "En attente"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Aucune réservation trouvée.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListeReserveur;
