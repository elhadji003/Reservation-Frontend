import React from "react";
import { useParams } from "react-router-dom";
import { useGetReservationByIdQuery } from "../features/reservation/reservationAPI";

const Reservation = () => {
  const { id } = useParams();
  const { data: reservation, isLoading } = useGetReservationByIdQuery(id);

  if (isLoading) return <p>Chargement...</p>;
  if (!reservation) return <p>Réservation introuvable</p>;

  const slot = reservation.slot;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        ✅ Réservation confirmée
      </h1>

      <p className="mb-2">
        <strong>Créneau :</strong> {slot.title}
      </p>
      <p className="mb-2">
        <strong>Début :</strong>{" "}
        {new Date(slot.start_time).toLocaleString("fr-FR")}
      </p>
      <p className="mb-2">
        <strong>Fin :</strong> {new Date(slot.end_time).toLocaleString("fr-FR")}
      </p>

      {reservation.calendar_link ? (
        <a
          href={reservation.calendar_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📅 Voir dans Google Calendar
        </a>
      ) : (
        <p className="text-sm text-gray-500 mt-4">
          Aucun lien Google Calendar disponible.
        </p>
      )}
    </div>
  );
};

export default Reservation;
