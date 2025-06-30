import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetSlotByIdQuery,
  useCreateReservationMutation,
} from "../features/reservation/reservationAPI";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaMapMarkedAlt, FaRegCalendarAlt } from "react-icons/fa";
import { useGetMeQuery } from "../features/auth/authAPI";
import toast from "react-hot-toast";
import GoogleCalendarButton from "../components/user/GoogleCalendarButton";

const SlotDetail = () => {
  const { id } = useParams();
  const { data: user } = useGetMeQuery();
  const { data: slot, isLoading, refetch } = useGetSlotByIdQuery(id);
  const [createReservation, { isLoading: isBooking }] =
    useCreateReservationMutation();

  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleBook = async () => {
    if (!user) return alert("Utilisateur non connecté");

    try {
      await createReservation({ slot_id: id, email: user.email }).unwrap();
      await refetch();
      toast.success("Réservation réussie !");
      setConfirmationMessage(
        `Un email de confirmation a été envoyé à ${user.email}.`
      );
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la réservation.");
    }
  };

  if (isLoading) return <p>Chargement...</p>;
  if (!slot) return <p>Slot introuvable</p>;

  const renderStars = (rating) => (
    <div className="flex items-center gap-1" title={`${rating} étoiles`}>
      {Array(5)
        .fill(0)
        .map((_, i) =>
          i < rating ? (
            <AiFillStar key={i} className="text-amber-500" />
          ) : (
            <AiOutlineStar key={i} className="text-gray-300" />
          )
        )}
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col items-center md:flex-row gap-14">
      {/* Colonne gauche - images */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-2xl font-bold mb-4">{slot.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[slot.image1, slot.image2, slot.image3].map(
            (src, i) =>
              src && (
                <img
                  key={i}
                  src={src}
                  alt={`image${i + 1}`}
                  className={`w-full h-64 object-cover rounded-md ${
                    i === 2 ? "col-span-2" : ""
                  }`}
                />
              )
          )}
        </div>
      </div>

      {/* Colonne droite - détails */}
      <div className="md:w-1/2 w-full bg-gray-50 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-amber-800">
          Détails du créneau
        </h2>

        <div className="mb-3 text-gray-700 flex items-center gap-2">
          <FaMapMarkedAlt className="text-amber-600" />
          <span>{slot.map}</span>
        </div>

        <div className="mb-3 text-gray-700">
          <span className="font-medium">Catégorie :</span> {slot.category}
        </div>

        <div className="mb-3">{renderStars(slot.rating)}</div>

        <div className="mb-3 text-gray-700 flex items-center gap-2">
          <FaRegCalendarAlt className="text-amber-600" />
          <span>
            Du{" "}
            {new Date(slot.start_time).toLocaleDateString("fr-FR", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            au{" "}
            {new Date(slot.end_time).toLocaleDateString("fr-FR", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="mt-6">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
              slot.is_booked
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {slot.is_booked ? "Déjà réservé" : "Disponible"}
          </span>
        </div>

        <button
          onClick={handleBook}
          disabled={slot.is_booked || isBooking}
          className={`mt-4 w-full py-2 rounded transition text-white ${
            slot.is_booked || isBooking
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-700 hover:bg-amber-800"
          }`}
        >
          {isBooking ? "Réservation..." : "Réserver"}
        </button>

        {/* Message confirmation email */}
        {confirmationMessage && (
          <p className="mt-3 text-green-700 font-medium">
            {confirmationMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default SlotDetail;
