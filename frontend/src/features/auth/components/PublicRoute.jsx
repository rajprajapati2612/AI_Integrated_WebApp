import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  // User is already logged in
  if (user) {
    return <Navigate to="/home" replace />;
  }

  // User is not logged in
  return children;
};

export default PublicRoute;