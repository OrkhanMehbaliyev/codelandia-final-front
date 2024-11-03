import { useCheckAuthorizationQuery } from "../api/apiSlice";
import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const {
    data: authRes,
    isLoading: authIsLoading,
    error: authError,
  } = useCheckAuthorizationQuery();
  let isAuthenticated = false;
  if (authIsLoading) {
    isAuthenticated = false;
    return <div>Loading...</div>;
  }
  if (authError) isAuthenticated = false;
  else {
    isAuthenticated = true;
  }
  if (isAuthenticated) return children;
  return <div>You are not authenticated.</div>;
}

export default ProtectedRoute;
