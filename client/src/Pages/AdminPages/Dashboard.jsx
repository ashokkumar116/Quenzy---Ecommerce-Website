import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContext';
import axios from '../../axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import QuenzyLoader from '../../Loader/QuenzyLoader';

const Dashboard = () => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);
  const [categoryData, setCategoryData] = useState([]);



  const getDatas = async () => {
    try {
      // setLoading(true);
      const userCountresponse = await axios.get('/dashboard/getusercount');
      const productCountResponse = await axios.get('/dashboard/getproductcount');
      const sellerCountResponse = await axios.get('/dashboard/getsellerscout');
      const categoryDataResponse = await axios.get('/dashboard/categoriesdata');
      
      console.log(categoryDataResponse.data);
      setUserCount(userCountresponse.data.userCount);
      setProductCount(productCountResponse.data.productCount);
      setSellerCount(sellerCountResponse.data.sellerCount);
      setCategoryData(categoryDataResponse.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user count:", error);
      return 0;
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getDatas();
  },[])

  if (loading) {
    return <QuenzyLoader/>
  }


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
            <div className="categorieswiseChart">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories Wise Product Count</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="productCount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
