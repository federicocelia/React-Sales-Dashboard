import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoot = ({ children }) => {
  const { session } = useAuth();

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  //if no session navigate to .signin

  //if session, render children
  return session ? <>{children}</> : <Navigate to="/signin" />;
};

export default ProtectedRoot;
