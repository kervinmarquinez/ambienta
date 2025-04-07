import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../store/useAuthStore";
import Layout from "@/layout/Layout";
import UserPostsList from "@/components/UserPostsList";

export default function MiPerfil() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout welcomeMessage="Mi Perfil">
      <div className="mb-6">

          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 cursor-pointer mb-4">
            <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
          </div>
          <h1 className="text-2xl font-bold mb-4">{user.name}</h1>

          
          <p className="italic text-gray-600 font-light">
            {user.description ? user.description : "Sin descripción"}
          </p>
      </div>
      


    </Layout>
  );
}