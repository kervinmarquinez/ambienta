import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query; // Obtiene el ID del post desde la URL

  return <h1>Mostrando el post con ID: {id}</h1>;
}
