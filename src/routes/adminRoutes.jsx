import MesSlots from "../pages/admin/MesSlots";
import CreerSlots from "../pages/admin/CreerSlots";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import UpdateSlot from "../pages/admin/UpdateSlot";

const adminRoutes = [
  { path: "/dashboardAdmin", element: <DashboardAdmin /> },
  { path: "/create-slot", element: <CreerSlots /> },
  { path: "/mes-slots", element: <MesSlots /> },
  { path: "/slots/edit/:slotId", element: <UpdateSlot /> },
];

export default adminRoutes;
