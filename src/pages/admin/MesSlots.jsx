import React, { useState } from "react";
import { FaMapMarkedAlt, FaPlus } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetSlotsQuery,
  useDeleteSlotMutation,
} from "../../features/reservation/reservationAPI";
import toast from "react-hot-toast";

const MesSlots = () => {
  const [filter, setFilter] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetSlotsQuery(undefined, {
    pollingInterval: 5000,
  });

  const [deleteSlot] = useDeleteSlotMutation();
  const slots = data?.results || [];

  const filteredSlots = filter
    ? slots.filter((slot) =>
        slot.category?.toLowerCase().includes(filter.toLowerCase())
      )
    : slots;

  const renderStars = (rating) => (
    <div className="flex items-center gap-1 mt-2" title={`${rating} étoiles`}>
      {Array(5)
        .fill(0)
        .map((_, i) =>
          i < rating ? (
            <AiFillStar key={i} className="text-amber-500" />
          ) : (
            <AiOutlineStar key={i} className="text-amber-300" />
          )
        )}
    </div>
  );

  const handleDelete = async (id) => {
    try {
      await deleteSlot(id).unwrap();
      toast.success("Créneau supprimé avec succès !");
      refetch();
      setSelectedSlotId(null);
    } catch (err) {
      console.error(err);
      toast.error("Échec de la suppression");
    }
  };

  if (isLoading) return <p className="p-6">Chargement...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Mes créneaux</h2>
        <Link
          to={"/create-slot"}
          className="flex items-center gap-4 px-4 py-2 rounded-md bg-amber-700 text-white uppercase"
        >
          <span className="max-sm:hidden"> Creer un slot</span> <FaPlus />
        </Link>
      </div>

      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md outline-none"
        >
          <option value="">Tous les créneaux</option>
          <option value="bureau">Bureaux</option>
          <option value="salle">Salles de conférence</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSlots.map((slot) => (
          <div key={slot.id} className="relative">
            {slot.is_booked && (
              <div className="absolute top-2 right-2 bg-amber-700 text-white px-3 py-1 rounded text-sm font-semibold z-20">
                Réservé
              </div>
            )}

            <div
              className={`shadow-md rounded-lg overflow-hidden bg-white transition ${
                slot.is_booked ? "opacity-60 border-2 border-amber-700" : ""
              }`}
            >
              {/* Images */}
              <div className="h-64 overflow-hidden">
                {slot.image1 && (
                  <img
                    src={slot.image1}
                    alt={`slot-${slot.id}-1`}
                    className="w-full h-32 object-cover mb-2"
                  />
                )}
                <div className="grid grid-cols-2 gap-2 h-32">
                  {slot.image2 && (
                    <img
                      src={slot.image2}
                      alt={`slot-${slot.id}-2`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {slot.image3 && (
                    <img
                      src={slot.image3}
                      alt={`slot-${slot.id}-3`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Map */}
              <span className="flex items-center gap-2 bg-white shadow-md rounded-md w-fit px-4 py-2 mx-auto -mt-5 relative z-10 text-sm">
                <FaMapMarkedAlt className="text-amber-800" />
                {slot.map}
              </span>

              {/* Infos */}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{slot.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Du {new Date(slot.start_time).toLocaleDateString()} au{" "}
                  {new Date(slot.end_time).toLocaleDateString()}
                </p>
                {renderStars(slot.rating)}

                {/* Boutons admin */}
                <div className="mt-4 flex justify-between gap-2">
                  <button
                    className="flex-1 border border-blue-600 text-blue-700 py-2 rounded hover:bg-blue-700 hover:text-white transition"
                    onClick={() => navigate(`/admin/slots/edit/${slot.id}`)}
                  >
                    Modifier
                  </button>
                  <button
                    className="flex-1 border border-red-600 text-red-600 py-2 rounded hover:bg-red-700 hover:text-white transition"
                    onClick={() => setSelectedSlotId(slot.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>{filteredSlots.length < 0 && "Des slots sont disponibles."}</div>

      {/* Modale de confirmation suppression */}
      {selectedSlotId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-4">
              Êtes-vous sûr de vouloir supprimer ce créneau ? Cette action est
              irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedSlotId(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(selectedSlotId)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MesSlots;
