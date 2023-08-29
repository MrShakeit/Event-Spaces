import React, { useEffect, useState } from "react";
import { redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const LoadingSpinner = () => <div className="spinner"></div>;

const RoutePolicy = ({ children }: any) => {
  const { user, status } = useAuth();
  const isAuthPath = ["/auth", "/auth/signin", "/auth/signup"].includes(
    window.location.pathname
  );
  const isAdminPath = ["/admin"].includes(window.location.pathname);
  const [isRedirect, setRedirect] = useState(false);

  useEffect(() => {
    const redirectIfNotLoggedOrNoPermissions = () => {
      if (status === "loading") return;

      if (status === "authenticated" && isAuthPath) {
        setRedirect(true);
        window.location.href = "/";
        return;
      } else if (status === "unauthenticated" && !isAuthPath) {
        setRedirect(true);
        window.location.href = "/auth/signin";
        return;
      }
      setRedirect(false);
    };
    redirectIfNotLoggedOrNoPermissions();
  }, [user, status, isRedirect, isAuthPath, isAdminPath]);

  if (status !== "loading" && !isRedirect) {
    return <>{children}</>; 
  }

  return <LoadingSpinner />;
};

export default RoutePolicy;
