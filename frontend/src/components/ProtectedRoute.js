// components/ProtectedRoute.js
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Si no hay token, redirigir a la página de login
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  // Si está autenticado, mostrar el contenido protegido
  return <>{isAuthenticated() ? children : null}</>;
};

export default ProtectedRoute;
