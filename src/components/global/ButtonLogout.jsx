import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi, useLogoutMutation } from "../../features/auth/authAPI";
import { logout } from "../../features/auth/authSlice";
import { reservationApi } from "../../features/reservation/reservationAPI"; // 👈 à importer
import { DoorOpenIcon } from "lucide-react";

const ButtonLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();

      dispatch(logout()); // reset authSlice
      dispatch(authApi.util.resetApiState()); // reset cache auth
      dispatch(reservationApi.util.resetApiState()); // 👈 reset cache réservations
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <button onClick={handleLogout} className="ms-0.5 max-sm:mt-2">
      <DoorOpenIcon />
    </button>
  );
};

export default ButtonLogout;
