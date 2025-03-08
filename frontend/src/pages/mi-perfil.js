import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../store/useAuthStore";
import Layout from "@/components/Layout";

export default function MiPerfil() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser, token } = useAuthStore();
  const [description, setDescription] = useState(user?.description || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setDescription(user?.description || '');
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description, currentPassword, newPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        updateUser(data.user);
        setSuccess('Perfil actualizado exitosamente');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      setError('Error al conectarse con el servidor');
    }
  };

  return (
    <Layout welcomeMessage="Echa un vistazo a tu perfil">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
        <p className="italic text-gray-600 font-light">{description ? description : "Añade una descripción"}</p>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
      <form onSubmit={handleUpdateProfile} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500">
          Actualizar Perfil
        </button>
      </form>
    </Layout>
  );
}