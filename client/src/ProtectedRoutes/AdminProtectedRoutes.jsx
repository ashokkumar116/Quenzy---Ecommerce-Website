import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import QuenzyLoader from "../Loader/QuenzyLoader";

const AdminProtectedRoutes = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <QuenzyLoader />;

    // 🚨 Important check: is user defined?
    if (!user || !user.id) return <Navigate to="/login" />;

    // ✅ Allow access only if user is admin
    return user.id === 1 ? <Outlet /> : <Navigate to="/" />;
};

  
  export default AdminProtectedRoutes;