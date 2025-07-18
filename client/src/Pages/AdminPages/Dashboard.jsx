import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContext';
import axios from '../../axios';

const Dashboard = () => {
  const {user} = useContext(AuthContext);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);


  const getDatas = async () => {
    try {
      const userCountresponse = await axios.get('/dashboard/getusercount');
      const productCountResponse = await axios.get('/dashboard/getproductcount');
      const sellerCountResponse = await axios.get('/dashboard/getsellerscout');
      setUserCount(userCountresponse.data.userCount);
      setProductCount(productCountResponse.data.productCount);
      setSellerCount(sellerCountResponse.data.sellerCount);
    } catch (error) {
      console.error("Error fetching user count:", error);
      return 0;
    }
  }

  useEffect(()=>{
    getDatas();
  })


  return (
    <div className="pt-20">
        <p className='text-3xl text-primary text-center'>Welcome <span className='font-bold uppercase'>{user.name}</span></p>
        <div className="cards-grid mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10 lg:px-20">
          <div className="users-card ">
          <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-white">
            <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-gray-800">
                Total Users
            </h3>
            <p className="text-sm px-4 pb-6 text-gray-600 w-5/6">
                {userCount} Users registered on the platform.
            </p>
        </div>
        
          </div>
          <div className="products-card">
          <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-white">
            <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-gray-800">
                Total Products
            </h3>
            <p className="text-sm px-4 pb-6 text-gray-600 w-5/6">
                {productCount} Products available on the platform.
            </p>
        </div>
          </div>
          <div className="sellers-card">
          <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-white">
            <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-gray-800">
                Total Sellers
            </h3>
            <p className="text-sm px-4 pb-6 text-gray-600 w-5/6">
                {sellerCount} Sellers registered on the platform.
            </p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
