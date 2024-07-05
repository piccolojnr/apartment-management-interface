import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "@components/loading";

const ProtectedRoute = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // useEffect(() => {
  //   get_user()
  //     .then((data) => {
  //       setLoading(false);
  //       setIsAuthenticated(true);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);

  if (loading) return <Loading />;
  if (error) return <Navigate to="/login" />;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
