import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // om ingen token → skicka till login
    return <Navigate to="/" replace />;
  }

  return children; // annars rendera sidan
}
