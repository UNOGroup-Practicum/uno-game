import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useSelector } from "../../services/hooks";
import { authSelect } from "../../services/slices/auth-slice";

export const AuthPagesRoute = () => {
  const location = useLocation();
  const { user } = useSelector(authSelect);

  return user ? (
    <Navigate to={ROUTES.profile.path} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
