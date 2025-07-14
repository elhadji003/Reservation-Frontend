import React, { useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useGetSlotsQuery } from "../features/slot/slotAPI";
import { Link } from "react-router-dom";

const SlotList = () => {
  const [filter, setFilter] = useState("");
  const { data, isLoading } = useGetSlotsQuery(undefined, {
    pollingInterval: 5000,
  });

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

  if (isLoading) {
    return <p className="p-6">Chargement...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Liste des créneaux</h2>

      {/* Select de filtre */}
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

      {/* Grille des cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSlots.map((slot) => (
          <div key={slot.id} className="relative">
            {slot.is_booked && (
              <div className="absolute top-2 right-2 bg-amber-700 text-white px-3 py-1 rounded text-sm font-semibold z-20">
                Réservé
              </div>
            )}

            <div
              className={`shadow-md rounded-lg overflow-hidden bg-white transition
                ${
                  slot.is_booked
                    ? "opacity-60 border-2 border-amber-700 cursor-not-allowed"
                    : ""
                }
              `}
            >
              {/* Bloc images */}
              <div className="h-64 overflow-hidden">
                {slot.image1 && (
                  <img
                    src={slot.image1}
                    alt={`slot-${slot.id}-1`}
                    className="w-full h-32 object-cover mb-2 image-hover-effect"
                  />
                )}
                <div className="grid grid-cols-2 gap-2 h-32">
                  {slot.image2 && (
                    <img
                      src={slot.image2}
                      alt={`slot-${slot.id}-2`}
                      className="w-full h-full object-cover image-hover-effect"
                    />
                  )}
                  {slot.image3 && (
                    <img
                      src={slot.image3}
                      alt={`slot-${slot.id}-3`}
                      className="w-full h-full object-cover image-hover-effect"
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
                {slot.is_booked ? (
                  <Link
                    to={`slot/${slot.id}/`}
                    className="block mt-4 text-center text-gray-500 cursor-not-allowed select-none"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    Déjà réservé
                  </Link>
                ) : (
                  <div className="mt-4 w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 transition text-center">
                    <Link to={`slot/${slot.id}/`}>Réserver</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotList;
