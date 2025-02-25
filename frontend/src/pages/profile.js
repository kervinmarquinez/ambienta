import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const Profile = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Mi Perfil</h1>
        {/* Aquí puedes agregar contenido para el perfil del usuario */}
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
