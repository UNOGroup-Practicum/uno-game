import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";

import { ROUTES } from "../../constants";

export const AuthPagesRoute = () => {
  const location = useLocation();
  const { user } = useSelector(authSelect);

  return user ? (
    <Navigate to={ROUTES.profile.path} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
