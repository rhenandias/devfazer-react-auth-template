import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      // Verificar se a mensagem do erro é sobre token inválido
      if (response.data.message === "Token de autenticação expirado.") {
        // TODO: implementar refresh token no backend + frontend

        // Mecanismo para pedir um refresh token:
        // 1. Enviar uma requisição ao backend para obter um novo token
        // 2. Caso sucesso, atualizar o token e prosseguir com a requisição original
        // 3. Caso falha, redirecionar para a página de login

        // Em caso de falha no refresh token:

        // Realizar a limpeza dos cookies
        Cookies.remove("accessToken");

        // Redireciona para a página inicial
        window.location.href = `/`;
      } else {
        // Realizar a limpeza dos cookies
        Cookies.remove("accessToken");

        // Redireciona para a página inicial
        window.location.href = `/`;
      }
    }

    return Promise.reject(error);
  }
);
