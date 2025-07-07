import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSlotByIdQuery,
  useCreateReservationMutation,
} from "../features/reservation/reservationAPI";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaMapMarkedAlt, FaRegCalendarAlt } from "react-icons/fa";
import { useGetMeQuery } from "../features/auth/authAPI";
import toast from "react-hot-toast";

const SlotDetail = () => {
  const { id } = useParams();
  const { data: user } = useGetMeQuery();
  const { data: slot, isLoading, refetch } = useGetSlotByIdQuery(id);
  const [createReservation, { isLoading: isBooking }] =
    useCreateReservationMutation();

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

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
    <>
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
                    onClick={() => setPreviewImage(src)}
                    className={`cursor-pointer transition-transform duration-200 hover:scale-105 w-full h-64 object-cover rounded-md ${
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

          {/* À propos */}
          <div className="mt-6 border-t pt-4 py-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-3">
              À propos de cette offre
            </h3>

            <ul className="space-y-2 text-gray-700 text-sm">
              {slot.facilities_details?.map((f, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 hover:translate-x-1 hover:text-amber-700 transition-all"
                >
                  <span className="text-amber-600">{f.icon}</span>
                  {f.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-3 text-gray-700">
            <span className="font-medium">Catégorie :</span> {slot.category}
          </div>

          <div className="mb-3">{renderStars(slot.rating)}</div>

          <div className="mb-3 text-gray-700 flex items-center gap-2">
            <FaMapMarkedAlt className="text-amber-600" />
            <span>{slot.map}</span>
          </div>

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

          {/* Disponibilité */}
          <div className="mt-6">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-fade-in ${
                slot.is_booked
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              <span className="w-2 h-2 rounded-full animate-pulse bg-current"></span>
              {slot.is_booked ? "Déjà réservé" : "Disponible"}
            </span>
          </div>

          {/* Bouton Réserver */}
          <button
            onClick={handleBook}
            disabled={slot.is_booked || isBooking}
            className={`mt-6 w-full py-2 rounded-lg font-semibold shadow transition duration-300 ${
              slot.is_booked || isBooking
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
            }`}
          >
            {isBooking ? "Réservation..." : "Réserver maintenant"}
          </button>

          {/* Message de confirmation */}
          {confirmationMessage && (
            <p className="mt-3 text-green-700 font-medium">
              {confirmationMessage}
            </p>
          )}
        </div>

        {/* Modal image zoom */}
        {previewImage && (
          <div
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition duration-300"
          >
            <div className="relative">
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-3 right-3 bg-white text-black rounded-full p-2 shadow hover:bg-gray-100 transition"
              >
                <span className="text-xl">✕</span>
              </button>
              <img
                src={previewImage}
                alt="zoom"
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-xl transition duration-500 scale-100 hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SlotDetail;
