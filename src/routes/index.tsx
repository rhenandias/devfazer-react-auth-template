import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import PublicRoute from "./PublicRoute";
import SuspensePage from "@/pages/public/SuspensePage";
import Login from "@/pages/public/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/public/NotFound";

export default function AppRoutes() {
  return (
    <Suspense fallback={<SuspensePage />}>
      <Routes>
        {/* Rota pública inicial, pode ser uma Land Page ou tela de Login */}
        <Route
          path="/"
          element={
            <PublicRoute redirectWhenAuthenticated>
              <Login />
            </PublicRoute>
          }
        />

        {/* Conjunto de rotas autenticadas */}
        <Route path="/painel">
          {/* Redirecionar para página inicial*/}
          <Route index element={<Navigate to="/painel/dashboard" replace />} />

          {/* Dashboard inicial */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute privilege={"root"}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Rota Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
