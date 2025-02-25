import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../utils/auth'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),  // Cambiar name a email
      });

      // Si la respuesta es exitosa, procedemos con el token
      if (response.ok) {
        const data = await response.json();  // Obtener la respuesta con el token
        login(data.token);  // Guardar el token en localStorage
        router.push('/dashboard');  // Redirigir al dashboard
      } else {
        const errorData = await response.json();  // Obtener mensaje de error
        setError(errorData.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setError('Error al conectarse con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
