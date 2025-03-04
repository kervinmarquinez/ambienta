import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../utils/auth';
import Link from 'next/link'

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
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Ahora guardamos tanto el token como los datos del usuario
        login(data.token, data.user); // Asume que el backend devuelve data.user
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setError('Error al conectarse con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">

      <div className='w-1/2'>
        <div className="min-h-screen bg-[url(/login.webp)] bg-cover bg-center"></div>
      </div>

      <div className='w-1/2 flex flex-col justify-center items-center'>
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

          <button type="submit" className="font-bold duration-300 w-full bg-blue-600 border-2 border-blue-600 hover:bg-gray-100 text-white hover:text-blue-600 py-2 rounded-2xl  mb-4">
            Iniciar sesión
          </button>
        </form>
        <p>¿No tienes cuenta? <Link href="/register" className='text-sky-700'>¡Regístrate ahora!</Link></p>
      </div>
    </div>
  );
}
