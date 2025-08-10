import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "../../axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import QuenzyLoader from "../../Loader/QuenzyLoader";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [sellerCount, setSellerCount] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const [stats, setStats] = useState({});
    const [recentOrders, setRecentOrders] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [orderChartData, setOrderChartData] = useState([]);
    const [revenueChartData, setRevenueChartData] = useState([]);
    const [topSellingProducts, setTopSellingProducts] = useState([]);

    const getDatas = async () => {
        try {
            const sellerCountResponse = await axios.get("/dashboard/getsellerscount");
            const categoryDataResponse = await axios.get("/dashboard/categoriesdata");
            const statsResponse = await axios.get("/dashboard/stats");
            const recentOrdersResponse = await axios.get("/dashboard/recent-orders");
            const lowStockResponse = await axios.get("/dashboard/low-stock");
            const orderChartResponse = await axios.get("/dashboard/order-chart");
            const revenueChartResponse = await axios.get("/dashboard/revenue-chart");
            const topSellingResponse = await axios.get("/dashboard/top-products");

            setSellerCount(sellerCountResponse.data.sellerCount);
            setCategoryData(categoryDataResponse.data);
            setStats(statsResponse.data);
            setRecentOrders(recentOrdersResponse.data);
            setLowStockProducts(lowStockResponse.data);
            setOrderChartData(orderChartResponse.data);
            setRevenueChartData(revenueChartResponse.data);
            setTopSellingProducts(topSellingResponse.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatas();
    }, []);

    if (loading) return <QuenzyLoader />;

    return (
        <div className="pt-20 px-4 sm:px-6 lg:px-10">
            <p className="text-2xl sm:text-3xl text-primary text-center">
                Welcome <span className="font-bold uppercase">{user.name}</span>
            </p>

            {/* Cards */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Total Users", value: `${stats.total_users} Users registered.` },
                    { title: "Total Products", value: `${stats.total_products} Products available.` },
                    { title: "Total Sellers", value: `${sellerCount} Sellers registered.` },
                    { title: "Total Orders", value: `${stats.total_orders} Orders placed.` },
                    { title: "Total Revenue", value: `₹ ${stats.total_revenue} Revenue generated.` },
                ].map((card, index) => (
                    <div key={index} className="rounded-xl shadow-xl bg-base-100 p-4 hover:scale-[1.02] transition-transform">
                        <h3 className="text-lg font-semibold text-base-content">{card.title}</h3>
                        <p className="text-sm mt-2 text-base-content">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Sections */}
            <div className="mt-10 space-y-8">
                {/* Categories Chart */}
                <div className="rounded-xl shadow-xl p-5 bg-base-100 overflow-x-scroll">
                    <h3 className="text-lg font-semibold mb-4">Categories Wise Product Count</h3>
                    <div className="w-full h-64 sm:h-80 min-w-200 ">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="productCount" className="fill-primary" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="rounded-xl shadow-xl p-5 bg-base-100 overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                    {recentOrders.length === 0 ? (
                        <p>No recent orders found.</p>
                    ) : (
                        <ul className="space-y-4 min-w-[300px]">
                            {recentOrders.map((order) => (
                                <li key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-base-200 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{order.user_name} ({order.user_email})</p>
                                        <p className="text-sm">Order ID: {order.order_uuid}</p>
                                        <p className="text-sm">Total: ₹{order.total_price}</p>
                                    </div>
                                    <span className={`badge ${order.status === "delivered" ? "badge-success" : "badge-warning"} mt-2 sm:mt-0`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Low Stock Products */}
                <div className="rounded-xl shadow-xl p-5 bg-base-100 overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-4">Low Stock Products</h3>
                    {lowStockProducts.length === 0 ? (
                        <p>No low stock products found.</p>
                    ) : (
                        <ul className="space-y-4 min-w-[300px]">
                            {lowStockProducts.map((product) => (
                                <li key={product.id} className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm">Stock: {product.stock}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Orders Chart */}
                <div className="rounded-xl shadow-xl p-5 bg-base-100 overflow-x-scroll">
                    <h3 className="text-lg font-semibold mb-4">Orders (Last 7 Days)</h3>
                    <div className="w-full h-64 sm:h-80 min-w-200">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="rounded-xl shadow-xl p-5 bg-base-100 overflow-x-scroll">
                    <h3 className="text-lg font-semibold mb-4">Revenues (Last 7 Days)</h3>
                    <div className="w-full h-64 sm:h-80 min-w-200">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Selling Products */}
                <div className="rounded-xl shadow-xl p-5 bg-base-100 overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
                    {topSellingProducts.length === 0 ? (
                        <p>No top selling products found.</p>
                    ) : (
                        <ul className="space-y-4 min-w-[300px]">
                            {topSellingProducts.map((product) => (
                                <li key={product.id} className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm">Total Sold: {product.total_sold}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
