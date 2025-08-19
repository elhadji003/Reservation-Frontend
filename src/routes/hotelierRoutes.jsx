import CreerSlots from "../pages/admin/CreerSlots";
import MesSlots from "../pages/admin/MesSlots";
import UpdateSlot from "../pages/admin/UpdateSlot";
import DashboardHotelier from "../pages/hotelier/DashboardHotelier";

export const hotelierRoutes = [
  {path: "/dashboardHotelier", element: <DashboardHotelier />},
   { path: "/create-slot", element: <CreerSlots /> },
  { path: "/mes-slots", element: <MesSlots /> },
  { path: "/slots/edit/:slotId", element: <UpdateSlot /> },
];