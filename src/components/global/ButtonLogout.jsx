import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authAPI";
import { logout } from "../../features/auth/authSlice";
import { DoorOpenIcon } from "lucide-react";

const ButtonLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap(); // appel API logout
      dispatch(logout()); // mise à jour state redux
      navigate("/login"); // redirection
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
