import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";

import { ROUTES } from "../../constants";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { user } = useSelector(authSelect);

  if (!import.meta.env.SSR) {
    return user ? (
      <Outlet />
    ) : (
      <Navigate to={ROUTES.signIn.path} state={{ from: location }} replace />
    );
  } else {
    return null;
  }
};
