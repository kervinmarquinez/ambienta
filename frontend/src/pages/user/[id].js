import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query; // Obtiene el ID de la URL

  return <h1>Perfil del usuario con ID: {id}</h1>;
}
