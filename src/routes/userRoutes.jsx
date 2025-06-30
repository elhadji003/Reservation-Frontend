import DashboardClient from "../pages/DashboardClient";
import Reservation from "../pages/Reservation";
import SlotDetail from "../pages/SlotDetail";
import SlotList from "../pages/SlotList";

export const userRoutes = [
  { path: "dashboardClient", element: <DashboardClient /> },
  { path: "reservation", element: <Reservation /> },
  { path: "slotsList", element: <SlotList /> },
  { path: "slotslist/slot/:id/", element: <SlotDetail /> },
  { path: "reservation/:id/", element: <Reservation /> },
];
