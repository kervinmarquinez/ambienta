import Layout from "@/layout/Layout";
import ExplorePostsList from "@/components/ExplorePostsList";

export default function Explorar() {
  return (
    <Layout welcomeMessage="Explora todas las publicaciones">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Explora</h1>
        <p className="text-gray-600 font-light">
          Descubre publicaciones de todos los usuarios y encuentra nuevas ideas para tu hogar.
        </p>
      </div>
      
      <ExplorePostsList />
    </Layout>
  );
}