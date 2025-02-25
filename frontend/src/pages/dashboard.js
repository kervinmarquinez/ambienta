import { useRouter } from "next/router";
import { logout } from "../utils/auth";
import ProtectedRoute from "../components/ProtectedRoute";  // Asegúrate de importar ProtectedRoute

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Aquí va el contenido del Dashboard */}

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Cerrar sesión
        </button>
      </div>
    </ProtectedRoute>
  );
}
