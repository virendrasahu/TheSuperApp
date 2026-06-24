import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Register.jsx";
import Categories from "../pages/Categories.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Movies from "../pages/Movies.jsx";
import { useSuperStore } from "../store/useSuperStore.js";

function GuardedRoute({ children, requiresCategories = false }) {
  const user = useSuperStore((state) => state.user);
  const categories = useSuperStore((state) => state.categories);

  if (!user?.email) {
    return <Navigate to="/" replace />;
  }

  if (requiresCategories && categories.length < 3) {
    return <Navigate to="/categories" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route
        path="/categories"
        element={
          <GuardedRoute>
            <Categories />
          </GuardedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <GuardedRoute requiresCategories>
            <Dashboard />
          </GuardedRoute>
        }
      />
      <Route
        path="/movies"
        element={
          <GuardedRoute requiresCategories>
            <Movies />
          </GuardedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
