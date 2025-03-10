import Layout from "@/layout/Layout";
import UsersList from "@/components/UsersList";

export default function Usuarios() {
  return (
    <Layout welcomeMessage="Encuentra otros usuarios">
      <UsersList />
    </Layout>
  );
}