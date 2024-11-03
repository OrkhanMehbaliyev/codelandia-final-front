import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import AdminLayout from "./ui/AdminLayout";
import { useCheckLoggedInQuery } from "./features/api/apiSlice";
import { useDispatch } from "react-redux";
import { loginUser } from "./features/authorization/userSlice";
import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorPage from "./ui/ErrorPage";
import ProtectedRoute from "./features/authorization/ProtectedRoute";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useCheckLoggedInQuery();
  useEffect(() => {
    if (data?.data) {
      dispatch(loginUser(data.data));
    }
  }, [data, dispatch]);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage></ErrorPage>;

  const userData = data?.data;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/*" element={<AppRoutes />}></Route>
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/*" element={<AdminRoutes />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
