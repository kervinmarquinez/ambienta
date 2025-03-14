import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
  }

  // Validación adicional
  if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
    setError('El email no es válido');
    return;
  }

  if (password.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {  // Ensure the correct URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    console.log('Response:', response);
  
    if (response.ok) {
      router.push('/login');  // Redirigir al login si el registro fue exitoso
    } else {
      const errorText = await response.text();  // Obtener el texto de la respuesta
      console.error('Error en el registro:', errorText);
      try {
        const errorData = JSON.parse(errorText);  // Intentar parsear como JSON
        setError(errorData.message || 'Error en el registro');
      } catch (e) {
        setError('Error en el registro: respuesta no válida');
      }
    }
  } catch (error) {
    setError('Error al conectarse con el servidor');
    console.error('Error al conectarse con el servidor:', error);
  }
};

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">

      <div className='w-1/2'>
        <div className="min-h-screen bg-[url(/register.webp)] bg-cover bg-center"></div>
      </div>

      <div className='w-1/2 flex flex-col justify-center items-center'>
        <h1 className="text-2xl font-bold mb-4">Registrarse</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="font-bold duration-300 w-full bg-blue-600 border-2 border-blue-600 hover:bg-gray-100 text-white hover:text-blue-600 py-2 rounded-2xl  mb-4">
            Registrarse
          </button>
        </form>
        <p>¿Tienes cuenta? <Link href="/login" className='text-sky-700'>Inicia Sesión</Link></p>
      </div>
    </div>
  );
}
