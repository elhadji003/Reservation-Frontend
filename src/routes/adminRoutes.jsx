import MesSlots from "../pages/admin/MesSlots";
import CreerSlots from "../pages/admin/CreerSlots";
import DashboardAdmin from "../pages/admin/DashboardAdmin";

const adminRoutes = [
  { path: "/dashboardAdmin", element: <DashboardAdmin /> },
  { path: "/create-slot", element: <CreerSlots /> },
  { path: "/mes-slots", element: <MesSlots /> },
];

export default adminRoutes;
