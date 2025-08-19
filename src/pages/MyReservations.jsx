import React, { useState } from "react";
import {
  useGetMyReservationsQuery,
  useCancelReservationMutation,
  useDeleteReservationMutation,
} from "../features/reservation/reservationAPI";
import toast from "react-hot-toast";
import { FaCalendarTimes } from "react-icons/fa";

const MyReservations = () => {
  const {
    data: reservations = [],
    isLoading,
    d,
  } = useGetMyReservationsQuery();
  const [cancelReservation, { isLoading: isCancelling }] =
    useCancelReservationMutation();
  const [deleteReservation, { isLoading: isDeleting }] =
    useDeleteReservationMutation();

  const [modal, setModal] = useState({ open: false, id: null, action: null });

  const openModal = (id, action) => setModal({ open: true, id, action });
  const closeModal = () => setModal({ open: false, id: null, action: null });

  const handleCancel = async (id) => {
    try {
      await cancelReservation(id).unwrap();
      toast.success("Réservation annulée.");
      refetch();
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Échec de l'annulation.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id).unwrap();
      toast.success("Réservation supprimée.");
      refetch();
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Échec de la suppression.");
    }
  };

  if (isLoading) return <p>Chargement...</p>;
  if (reservations.length === 0)
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-sm">
        <FaCalendarTimes className="text-4xl text-gray-400 mb-2" />
        <p className="text-gray-600 text-lg font-medium">
          Aucune réservation pour le moment.
        </p>
      </div>
    );

  return (
    <>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-amber-700 mb-6">
          Mes Réservations
        </h2>

        <ul className="grid grid-cols-2 items-center gap-8 max-sm:grid-cols-1">
          {reservations.map((res) => (
            <li
              key={res.id}
              className="border border-gray-200 p-5 rounded-lg shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {res.slot.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(res.slot.start_time).toLocaleString("fr-FR")} →{" "}
                  {new Date(res.slot.end_time).toLocaleString("fr-FR")}
                </p>
                {res.calendar_link && (
                  <a
                    href={res.calendar_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm mt-1 inline-block"
                  >
                    Voir sur Google Calendar
                  </a>
                )}
              </div>

              {res.status === "cancelled" ? (
                <button
                  onClick={() => openModal(res.id, "delete")}
                  disabled={isDeleting}
                  className={`px-3 py-1 rounded text-sm ${
                    isDeleting
                      ? "bg-red-300 text-white cursor-not-allowed"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => openModal(res.id, "cancel")}
                    disabled={isCancelling}
                    className={`px-3 py-1 rounded text-sm ${
                      isCancelling
                        ? "bg-yellow-300 text-white cursor-not-allowed"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    }`}
                  >
                    {isCancelling ? "Annulation..." : "Annuler"}
                  </button>
                  <button
                    onClick={() => openModal(res.id, "delete")}
                    disabled={isDeleting}
                    className={`px-3 py-1 rounded text-sm ${
                      isDeleting
                        ? "bg-red-300 text-white cursor-not-allowed"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {isDeleting ? "Suppression..." : "Supprimer"}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded p-6 max-w-sm w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              {modal.action === "cancel"
                ? "Confirmer l’annulation"
                : "Confirmer la suppression"}
            </h3>
            <p className="mb-6">
              {modal.action === "cancel"
                ? "Voulez-vous vraiment annuler cette réservation ?"
                : "Voulez-vous vraiment supprimer cette réservation ? Cette action est irréversible."}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={() =>
                  modal.action === "cancel"
                    ? handleCancel(modal.id)
                    : handleDelete(modal.id)
                }
                className={`px-4 py-2 rounded text-white ${
                  modal.action === "cancel"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {modal.action === "cancel" ? "Confirmer" : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyReservations;
