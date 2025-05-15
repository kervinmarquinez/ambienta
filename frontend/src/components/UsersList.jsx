import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import UserListItem from './UserListItem';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuthStore(); // Obtener el token de autenticación del store

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Incluir el token en los encabezados
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError('Error al cargar los usuarios');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return <div>Cargando usuarios</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (

      <div className="flex flex-wrap -mx-2">
        {users.map(user => (
          <div key={user._id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
            <UserListItem id={user._id} name={user.name} description={user.description} avatar={user.avatarUrl}/>
          </div>
        ))}
      </div>

  );
}