import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const role = useSelector((state) => state.auth?.role);

  // console.log("Role actuel :", role);
  // console.log("Rôles autorisés :", allowedRoles);
  //
  if (!accessToken) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
