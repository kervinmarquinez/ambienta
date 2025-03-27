import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import Layout from "@/layout/Layout";
import ProfileDescriptionForm from "@/components/ProfileDescriptionForm";
import PasswordChangeForm from "@/components/PasswordChangeForm";
import AvatarUploader from "@/components/AvatarUploader";

export default function Configuracion() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated, router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout welcomeMessage="Aquí puedes cambiar tu descripción o tu contraseña">
      <div className="p-6 rounded-lgw-full max-w-md">

        <AvatarUploader />
        {/* Componente para actualizar la descripción */}
        <ProfileDescriptionForm />
        
        {/* Componente para cambiar la contraseña */}
        <PasswordChangeForm />
      </div>
    </Layout>
  );
}