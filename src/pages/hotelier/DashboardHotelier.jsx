import React from "react";
import { useGetMeQuery } from "../../features/auth/authAPI";
import StatCard from "../../components/admin/StatCard";
import { CheckCheck, House, MapPin, PlusCircle, Stars, Users } from "lucide-react";
import ListeReserveur from "../../components/admin/ListeReserveur";
import { useGetAllReservationsQuery } from "../../features/reservation/reservationAPI";

export default function DashboardHotelier() {
  const { data: me, isLoading, isError } = useGetMeQuery();

  const {data: reservations, isLoading: isLoadingReservations, error: reservationsError} = useGetAllReservationsQuery();

  const totalReservations = reservations?.length || 0;

  const confirmed = reservations?.filter((r) => r.status === "confirmed").length || 0;
  const cancelled = reservations?.filter((r) => r.status === "cancelled").length || 0;

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement des données.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="w-full bg-white shadow px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Profil hôtelier */}
        <div className="flex items-center gap-4">
          <img
            src={me?.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-24 h-24 rounded-xl border-4 border-amber-900 object-cover animate-pulse"
          />
          <div>
            <h1 className="text-xl font-semibold">
              {me?.hotel_name || "Mon Hôtel"}
            </h1>
            <p className="text-gray-600">{me?.email}</p>
            <p className="flex items-center gap-1 italic mt-2 text-gray-600">
              <MapPin className="w-4 h-4" /> {me?.address}
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 w-full md:w-auto">
          <StatCard
            title="Réservations Confirmées"
            value={confirmed}
            icon={<CheckCheck />}
            color="text-green-600"
            bg="bg-green-100"
          />
          <StatCard
            title="Reservations Annulées"
            value={cancelled}
            icon={<House />}
            color="text-red-600"
            bg="bg-red-100"
          />
          <StatCard
            title="Clients"
            value={me?.clients_count || 0}
            icon={<Users />}
            color="text-blue-600"
            bg="bg-blue-100"
          />
          <StatCard
            title="Créneaux"
            value={me?.slots_count || 0}
            icon={<PlusCircle />}
            color="text-yellow-600"
            bg="bg-yellow-100"
          />
        </div>
      </header>

      {/* MAIN */}
      <main className="p-6 flex-1">
        <h2 className="text-lg mb-4">
          Bienvenue,
          <em className="flex text-3xl sm:text-4xl font-extrabold text-gray-800 border-l-8 rounded-md pl-4 border-amber-900 mt-2">
            {me?.hotel_name} <Stars color="orange" className="ml-2" />
          </em>
        </h2>

        {/* Liste des réservations */}
        <ListeReserveur />
      </main>
    </div>
  );
}
