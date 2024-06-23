import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { get_user } from "../utils/api";
import Loading from "../components/loading";

const AdminRoute = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    get_user()
      .then((user) => {
        setLoading(false);
        setIsAuthenticated(true);
        setIsAdmin(user.role === "admin");
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <Navigate to="/login" />;

  return isAuthenticated && isAdmin ? (
    children
  ) : (
    <Navigate to="/not-authorized" />
  );
};

export default AdminRoute;
