import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi, useLogoutMutation } from "../../features/auth/authAPI";
import { logout } from "../../features/auth/authSlice";
import { reservationApi } from "../../features/reservation/reservationAPI";
import { DoorOpenIcon } from "lucide-react";

const ButtonLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const refreshToken = useSelector((state) => state.auth.refreshToken); // adapte selon ton store

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutApi(refreshToken).unwrap();
      }

      dispatch(logout());
      dispatch(authApi.util.resetApiState());
      dispatch(reservationApi.util.resetApiState());
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
