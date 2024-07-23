import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "@components/loading";
import { jwtDecode } from "jwt-decode"; // Ensure this import is correct

const ProtectedRoute = ({ children, requiredRoles = [] }: any) => {
  const [loading, setLoading] = useState(true); // Initially loading is true
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initially assume not authenticated
  const [hasRequiredRoles, setHasRequiredRoles] = useState(false); // Initially assume user doesn't have required roles

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const roles = JSON.parse(localStorage.getItem("roles") || "[]");

        if (token) {
          const decoded: any = jwtDecode(token);
          if (decoded && decoded.exp) {
            if (decoded.exp * 1000 > Date.now()) {
              setIsAuthenticated(true);
              if (requiredRoles.length > 0) {
                const userHasRoles = requiredRoles.every((role: string) =>
                  roles.includes(role.toLowerCase())
                );
                setHasRequiredRoles(userHasRoles);
              } else {
                setHasRequiredRoles(true); // If no roles are required, allow access
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to decode token or parse roles", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requiredRoles]);

  if (loading) return <Loading />;
  return isAuthenticated && hasRequiredRoles ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
