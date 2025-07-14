import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

function AdminLayout() {

  const {user,loading} = useContext(AuthContext);

  return (
    <div className='pt-30 bg-base-300 flex flex-col w-50 h-[100vh] shadow-xl'>
      {/* Sidebar */}
      <aside className=' flex flex-col justify-center items-center '>
        <h1 className='text-2xl text-primary uppercase mb-4 font-bold' >Admin Panel</h1>
        <div className='flex flex-col items-center mb-6 justify-center gap-1'>
        <img src="https://placehold.co/100x100"  className='rounded-full' />
        <h1 className='text-lg font-bold'>{user.name}</h1>
        </div>

        <div className='flex flex-col items-center gap-2 justify-center '>
        <NavLink className="hover:bg-base-100 px-5 py-2 rounded-md transition transition-all" to="/admin/dashboard" >Dashboard</NavLink>
        <NavLink className="hover:bg-base-100 px-5 py-2 rounded-md transition transition-all" to="/admin/add-product" >Add Product</NavLink>
        <NavLink className="hover:bg-base-100 px-5 py-2 rounded-md transition transition-all" to="/admin/add-category">Add Category</NavLink>
        <NavLink className="hover:bg-base-100 px-5 py-2 rounded-md transition transition-all" to="/admin/add-brand">Add Brand</NavLink>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: '20px', padding: '20px' }}>
        <Outlet /> 
      </main>
    </div>
  );
}

export default AdminLayout;
