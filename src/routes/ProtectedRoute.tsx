import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router";

export type Permission = "dashboard";
export type Privilege = "root";

interface ProtectedRouteProps {
  privilege?: Privilege | Privilege[];
  permission?: Permission | Permission[];
  children: ReactNode;
}

export default function ProtectedRoute({
  privilege,
  permission,
  children,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  let hasPrivilege = true;
  let hasPermission = true;

  if (privilege) {
    if (Array.isArray(privilege)) {
      hasPrivilege = privilege.some((priv) => priv === user.type);
    } else {
      hasPrivilege = privilege === user.type;
    }
  }

  if (permission) {
    if (Array.isArray(permission)) {
      hasPermission = permission.some((perm) =>
        user.permissions.includes(perm)
      );
    } else {
      hasPermission = user.permissions.includes(permission);
    }
  }

  if (user?.type === "root") {
    hasPrivilege = true;
  }

  if (!hasPrivilege || !hasPermission) {
    return <Navigate to="/" replace />;
  }

  return children;
}
