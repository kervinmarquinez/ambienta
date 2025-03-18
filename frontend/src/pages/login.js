import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../utils/auth';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Imagen de fondo - oculta en móvil */}
      <div className='hidden md:block md:w-1/2'>
        <div className="min-h-screen bg-[url(/login.webp)] bg-cover bg-center"></div>
      </div>

      {/* Formulario de login - ancho completo en móvil */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-0'>
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="w-full font-bold duration-300 bg-blue-600 border-2 border-blue-600 hover:bg-gray-100 text-white hover:text-blue-600 py-2 rounded-2xl mb-4"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="mt-6 text-center">
            ¿No tienes cuenta? <Link href="/register" className='text-sky-700'>¡Regístrate ahora!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}