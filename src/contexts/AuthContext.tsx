import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { api } from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

export type User = {
  id: string;
  username: string;
  type: string;
  permissions: string[];
} | null;

interface AuthMe {
  user: User;
}

interface SignIn {
  accessToken: string;
  user: User;
}

interface SignProps {
  email: string;
  password: string;
}

interface AuthContextValues {
  loading: boolean;
  user: User | null;
  signIn: (signInData: SignProps) => Promise<void>;
  signUp: (signUpData: SignProps) => Promise<void>;
  signOut: () => void;
  navigateToHomePage: (userData: User) => void;
}

export const AuthContext = createContext<AuthContextValues>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  navigateToHomePage: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    Cookies.remove("accessToken");
    setUser(null);
    navigate("/");
  }, [navigate]);

  const navigateToHomePage = useCallback(async () => {
    // Aqui pode ser aplicada a lógica de redirecionamento do usuário após a autenticação
    // Dependendo do tipo do usuário você pode redirecionar ele para uma página específica

    // Por hora, vamos redirecionar para o dashboard padrão
    navigate("/painel/dashboard");
  }, [navigate]);

  const signIn = useCallback(async ({ email, password }: SignProps) => {
    // Aqui deve ser feita a chamada na rota de autenticação:

    // const response = await api.post<SignIn>("/auth/sign-in", {
    //   email,
    //   password,
    // });

    // O objeto de "response" do axios é utilizado para dar prosseguimento
    // Portanto, vamos simular um response após a resposta de autenticação

    const response = {
      data: {
        user: {
          id: "123",
          username: "Fulano Da Silva",
          type: "root",
          permissions: [],
        },
        token: "Access Token Irá Retornar Aqui",
      },
    };

    // Após receber o response do Axios, salvamos o token nos cookies do navegador
    Cookies.set("accessToken", response.data.token, {
      expires: 7,
    });

    setUser(response.data.user);
  }, []);

  const signUp = useCallback(
    async ({ email, password }: SignProps) => {
      // Aqui deve ser feita a chamada na rota de cadastro
      await api.post<SignIn>("/auth/public-sign-up", {
        email,
        password,
      });

      // Imediatamente após fazer o cadastro, podemos realizar o login
      await signIn({
        email,
        password,
      });
    },
    [signIn]
  );

  const restoreToken = useCallback(async () => {
    try {
      const token = Cookies.get("accessToken");

      // if (token && !user) {
      //   const response = await api.get<AuthMe>("/auth/me");

      //   setUser(response.data.user);
      // }
    } catch {
      setLoading(false);
      signOut();
    } finally {
      setLoading(false);
    }
  }, [signOut, user]);

  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  const values = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      signOut,
      navigateToHomePage,
    }),
    [user, loading, signIn, signUp, signOut, navigateToHomePage]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
