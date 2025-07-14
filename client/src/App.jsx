import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import AdminProtectedRoutes from "./ProtectedRoutes/AdminProtectedRoutes";
import AdminLayout from "./Pages/AdminPages/AdminLayout";
import AddProducts from "./Pages/AdminPages/AddProducts";
import AddCategories from "./Pages/AdminPages/AddCategories";
import AddBrands from "./Pages/AdminPages/AddBrands";
import AddSeller from "./Pages/AdminPages/AddSeller";
import { useContext } from "react";
import { AuthContext } from "./Contexts/AuthContext";
import QuenzyLoader from "./Loader/QuenzyLoader";
import Dashboard from "./Pages/AdminPages/Dashboard";
function App() {

    const {user , loading} = useContext(AuthContext);

    if(loading){
        return <QuenzyLoader/>
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={user ? <Navigate to={'/'} />: <Login/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminProtectedRoutes />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="add-product" element={<AddProducts />} />
                        <Route path="add-category" element={<AddCategories />} />
                        <Route path="add-brand" element={<AddBrands />} />
                        <Route path="add-seller" element={<AddSeller />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
