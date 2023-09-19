import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const RoutePolicy = ({ children }: any) => {
  const navigate = useNavigate();
  const { permissionFlags, status } = useAuth();
  const isAdminPath = window.location.pathname.startsWith("/admin");
  const isAuthPath = ["/auth", "/auth/signin", "/auth/signup"].includes(
    window.location.pathname
  );
  const isHomePagePath = window.location.pathname === "/";
  const hasPermission = () => {
    const map = {
      // "/admin/users": 12,
      // "/admin/bookings": 12,
      // "/admin/bookings/": 12,
      // "/admin/spaces/": 12,
      // "/admin/spaces": 12,
      // "/admin/create/space": 12,
    };
    if (map[window.location.pathname] === undefined) {
      return true;
    }
    return map[window.location.pathname] === permissionFlags;
  };
  useEffect(() => {
    if (status === "authenticated" && isAuthPath) {
      navigate("/");
      return;
    } else if (status === "authenticated" && !hasPermission()) {
      navigate("/");
      return;
    } else if (status === "unauthenticated" && !isAuthPath) {
      navigate("/");
      return;
    }
  }, [
    status,
    permissionFlags,
    navigate,
    isAuthPath,
    isAdminPath,
    isHomePagePath,
  ]);

  return <>{children}</>;
};

export default RoutePolicy;
