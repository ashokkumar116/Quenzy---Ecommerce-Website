import { useContext, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { MdOutlineDashboard, MdOutlineCategory, MdOutlineAddBusiness } from "react-icons/md";
import { AiTwotoneShop } from "react-icons/ai";
import { HiOutlineTag } from "react-icons/hi";
import { RiShoppingBasket2Line } from "react-icons/ri";
import QuenzyLoader from '../../Loader/QuenzyLoader';
import { asset } from '../../assets/asset';
import { GrUserAdmin } from "react-icons/gr";
import { FiMenu } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function AdminLayout() {
  const { user, loading } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) return <QuenzyLoader />;

  const navLinks = [
    { to: "/admin/dashboard", icon: <MdOutlineDashboard />, text: "Dashboard" },
    { to: "/admin/add-product", icon: <AiTwotoneShop />, text: "Manage Products" },
    { to: "/admin/add-category", icon: <MdOutlineCategory />, text: "Manage Categories" },
    { to: "/admin/add-brand", icon: <HiOutlineTag />, text: "Manage Brands" },
    { to: "/admin/add-seller", icon: <MdOutlineAddBusiness />, text: "Manage Sellers" },
    { to: "/admin/manage-orders", icon: <RiShoppingBasket2Line />, text: "Manage Orders" },
  ];

  const Sidebar = () => (
    <aside
      className={`bg-base-100 shadow-lg transition-all duration-300 h-full flex flex-col items-center py-25 relative ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle button inside sidebar */}
      <button
        className="absolute top-[50%] -right-3 bg-base-200 rounded-full p-1 shadow"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Profile */}
      <div className="flex flex-col items-center mb-10">
        <h1
          className={`text-2xl font-bold uppercase text-primary mb-4 flex items-center transition-all ${
            isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          <GrUserAdmin /> &nbsp; Admin Panel
        </h1>
        <img
          src={`${asset.imageBaseUrl}${user.profile_pic}`}
          alt="Admin"
          className="rounded-full border-2 border-primary w-16 h-16"
        />
        {isExpanded && <h2 className="mt-2 font-semibold text-lg">{user?.name}</h2>}
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-3 w-full">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${isExpanded ? "": "justify-center"} ${
                isActive ? "bg-primary text-white" : "hover:bg-base-200" 
              }`
            }
          >
            {link.icon}
            {isExpanded && link.text}
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  return (
    <div className="flex flex-col h-screen bg-base-300 text-base-content">
      {/* Top Navbar */}
      <div className="w-full bg-base-100 shadow-md mt-25 flex items-center justify-between px-4 py-3 lg:hidden">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button className="lg:hidden text-2xl" onClick={() => setMobileSidebarOpen(true)}>
          <FiMenu />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="bg-base-100 w-64 shadow-lg relative h-full">
              <Sidebar />
            </div>
            <div
              className="flex-1 bg-black/50"
              onClick={() => setMobileSidebarOpen(false)}
            ></div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
