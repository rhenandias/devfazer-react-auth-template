import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { useCallback, useState } from "react";

export default function Login() {
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    setLoading(true);

    try {
      await signIn({
        email: "example@email.com",
        password: "123456789",
      });
    } catch (error) {
      // Tratar o erro de autenticação: exibir o campo errado, ou exibir um toast pro usuário, etc
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [signIn]);

  return (
    <Layout>
      <div className="w-svw h-svh flex justify-center items-center ">
        {loading && <Loading />}

        {!loading && (
          <div className="flex flex-col space-y-3 items-center">
            <span className="textt-gray-600 font-semibold">Tela de Login</span>
            <button
              className="rounded-md p-3 bg-gray-300 hover:cursor-pointer text-gray-600"
              onClick={handleLogin}
            >
              Simular Login
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
