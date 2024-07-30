import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "@components/loading";
import { useAuthContext } from "@/context/auth-context";
import { Role } from "@/types/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
}) => {
  const { user, loading } = useAuthContext();
  const [hasRequiredRoles, setHasRequiredRoles] = useState(true);

  useEffect(() => {
    if (user && requiredRoles.length > 0) {
      const userHasRoles = requiredRoles.every((role) =>
        user.roles.some(
          (r: Role) => r.name.toLowerCase() === role.toLowerCase()
        )
      );
      setHasRequiredRoles(userHasRoles);
    }
  }, [user, requiredRoles]);

  if (loading) return <Loading />;
  if (!user || !hasRequiredRoles) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
