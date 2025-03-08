// src/pages/dashboard.js
import { useState } from "react";
import Layout from "@/components/Layout";
import useAuthStore from "@/store/useAuthStore";
import { logout } from "@/utils/auth";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Layout welcomeMessage="Bienvenido a tu feed">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-3">Información del usuario</h2>
          <p className="mb-2"><span className="font-medium">Nombre:</span> {user.name}</p>
          <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </Layout>
  );
}