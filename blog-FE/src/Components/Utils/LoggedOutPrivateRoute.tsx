import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface props {
  children: ReactNode;
}
const LoggedOutPrivateRoute = ({ children }: props) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default LoggedOutPrivateRoute;
