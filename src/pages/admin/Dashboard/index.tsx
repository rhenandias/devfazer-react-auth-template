import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { useCallback, useState } from "react";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSignOut = useCallback(() => {
    setLoading(true);

    try {
      signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [signOut]);

  return (
    <Layout>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        {loading && <Loading />}

        {!loading && (
          <div className="flex flex-col items-center space-y-3">
            <span className="text-gray-600 font-semibold">
              Tela de usuário autenticado
            </span>
            <span>Oá, {user?.username}</span>
            <button
              className="rounded-md p-3 bg-gray-300 hover:cursor-pointer text-gray-600"
              onClick={handleSignOut}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
