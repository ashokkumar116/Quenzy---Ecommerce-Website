import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { MdOutlineDashboard } from "react-icons/md";
import { AiTwotoneShop } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineTag } from "react-icons/hi";
import { MdOutlineAddBusiness } from "react-icons/md";
import QuenzyLoader from '../../Loader/QuenzyLoader';




function AdminLayout() {
  const { user,loading } = useContext(AuthContext);

  if (loading) {
    return <QuenzyLoader/>
  }

  return (
    <div className="flex h-screen bg-base-200 text-base-content">
      {/* Sidebar */}
      <aside className="w-64 bg-base-300 shadow-lg flex flex-col items-center pt-30 py-8 px-4">
        {/* Profile */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-2xl font-bold uppercase text-primary mb-4">Admin Panel</h1>
          <img src="https://placehold.co/100x100" alt="Admin" className="rounded-full border-2 border-primary" />
          <h2 className="mt-2 font-semibold text-lg">{user?.name}</h2>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-3 w-full">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                isActive ? 'bg-primary text-white' : 'hover:bg-base-100'
              }`
            }
          >
            <MdOutlineDashboard/>
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/add-product"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                isActive ? 'bg-primary text-white' : 'hover:bg-base-100'
              }`
            }
          >
            <AiTwotoneShop/>
            Manage Products
          </NavLink>
          <NavLink
            to="/admin/add-category"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                isActive ? 'bg-primary text-white' : 'hover:bg-base-100'
              }`
            }
          >
            <MdOutlineCategory/>
            Manage Categories
          </NavLink>
          <NavLink
            to="/admin/add-brand"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                isActive ? 'bg-primary text-white' : 'hover:bg-base-100'
              }`
            }
          >
            <HiOutlineTag/>
            Manage Brands
          </NavLink>
          <NavLink
            to="/admin/add-seller"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                isActive ? 'bg-primary text-white' : 'hover:bg-base-100'
              }`
            }
          >
            <MdOutlineAddBusiness/>
            Manage Sellers
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
