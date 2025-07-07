import React from "react";
import StatCard from "./StatCard";
import { FaCalendarAlt, FaCheck, FaTimes, FaUser } from "react-icons/fa";
import WaterfallChartTwoToneIcon from "@mui/icons-material/WaterfallChartTwoTone";
import { useGetAllReservationsQuery } from "../../features/reservation/reservationAPI";

const DashboardStats = () => {
  const { data: reservationData = [] } = useGetAllReservationsQuery();

  const totalReservations = reservationData?.length || 0;
  const confirmed =
    reservationData?.filter((r) => r.status === "confirmed")?.length || 0;
  const cancelled =
    reservationData?.filter((r) => r.status === "cancelled")?.length || 0;

  const users = 75;

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <WaterfallChartTwoToneIcon fontSize="large" /> Statistiques
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Réservations"
          value={totalReservations}
          icon={<FaCalendarAlt />}
          color="text-blue-600"
          bg="bg-blue-100"
        />
        <StatCard
          title="Confirmées"
          value={confirmed}
          icon={<FaCheck />}
          color="text-green-600"
          bg="bg-green-100"
        />
        <StatCard
          title="Annulées"
          value={cancelled}
          icon={<FaTimes />}
          color="text-red-600"
          bg="bg-red-100"
        />
        <StatCard
          title="Utilisateurs"
          value={users}
          icon={<FaUser />}
          color="text-amber-600"
          bg="bg-amber-100"
        />
      </div>
    </div>
  );
};

export default DashboardStats;
