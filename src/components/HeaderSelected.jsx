import React from "react";
import {
  useGetSlotsQuery,
  useGetResourcesQuery,
} from "../features/reservation/reservationAPI";

const HeaderSelected = () => {
  const { data: resources = [], isLoading: loadingResources } =
    useGetResourcesQuery();
  const { data: slots = [], isLoading: loadingSlots } = useGetSlotsQuery();

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <header className="bg-white flex items-center justify-between px-8 py-4 gap-5">
      <h1 className="font-bold text-gray-400">Recherche </h1>
      <div className="flex gap-4 items-center">
        {/* Ressources dynamiques */}
        <select className="border border-gray-300 rounded px-3 py-2 text-sm outline-none">
          <option value="">Toutes les ressources</option>
          {!loadingResources &&
            resources.results?.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.name}
              </option>
            ))}
        </select>

        {/* Slots dynamiques */}
        <select className="border border-gray-300 rounded px-3 py-2 text-sm outline-none">
          <option value="">Tous les créneaux</option>
          {!loadingSlots &&
            slots.results?.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {formatDateTime(slot.start_time)} -{" "}
                {formatDateTime(slot.end_time)}
              </option>
            ))}
        </select>
      </div>
    </header>
  );
};

export default HeaderSelected;
