import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "../../axios";
import {
    BarChart,
    Bar,
    Rectangle,
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
            // setLoading(true);
            const sellerCountResponse = await axios.get(
                "/dashboard/getsellerscount"
            );
            const categoryDataResponse = await axios.get(
                "/dashboard/categoriesdata"
            );
            const statsResponse = await axios.get("/dashboard/stats");
            const recentOrdersResponse = await axios.get(
                "/dashboard/recent-orders"
            );
            const lowStockResponse = await axios.get("/dashboard/low-stock");
            const orderChartResponse = await axios.get(
                "/dashboard/order-chart"
            );
            const revenueChartResponse = await axios.get(
                "/dashboard/revenue-chart"
            );
            const topSellingResponse = await axios.get(
                "/dashboard/top-products"
            );
            console.log(categoryDataResponse.data);
            setSellerCount(sellerCountResponse.data.sellerCount);
            setCategoryData(categoryDataResponse.data);
            setStats(statsResponse.data);
            setRecentOrders(recentOrdersResponse.data);
            setLowStockProducts(lowStockResponse.data);
            setOrderChartData(orderChartResponse.data);
            setRevenueChartData(revenueChartResponse.data);
            setTopSellingProducts(topSellingResponse.data);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching user count:", error);
            return 0;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatas();
    }, []);

    if (loading) {
        return <QuenzyLoader />;
    }

    return (
        <div className="pt-20">
            <p className="text-3xl text-primary text-center">
                Welcome <span className="font-bold uppercase">{user.name}</span>
            </p>
            <div className="cards-grid mt-10 grid grid-cols-1 mxd:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10 lg:px-20">
                <div className="users-card ">
                    <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-base-100">
                        <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-base-content">
                            Total Users
                        </h3>
                        <p className="text-sm px-4 pb-6 text-base-content w-5/6">
                            {stats.total_users} Users registered on the
                            platform.
                        </p>
                    </div>
                </div>
                <div className="products-card">
                    <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-base-100">
                        <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-base-content">
                            Total Products
                        </h3>
                        <p className="text-sm px-4 pb-6 text-base-content w-5/6">
                            {stats.total_products} Products available on the
                            platform.
                        </p>
                    </div>
                </div>
                <div className="sellers-card">
                    <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-base-100">
                        <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-base-content">
                            Total Sellers
                        </h3>
                        <p className="text-sm px-4 pb-6 text-base-content w-5/6">
                            {sellerCount} Sellers registered on the platform.
                        </p>
                    </div>
                </div>
                <div className="orders-card">
                    <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-base-100">
                        <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-base-content">
                            Total Orders
                        </h3>
                        <p className="text-sm px-4 pb-6 text-base-content w-5/6">
                            {stats.total_orders}  Orders successfully placed by customers on the platform.
                        </p>
                    </div>
                </div>
                <div className="revenue-card">
                    <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-base-100">
                        <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-base-content">
                            Total Revenue
                        </h3>
                        <p className="text-sm px-4 pb-6 text-base-content w-5/6">
                            ₹ {stats.total_revenue} Revenue generated from
                            delivered orders.
                        </p>
                    </div>
                </div>

                <div className="categorieswiseChart col-span-3">
                    <div className="rounded-xl shadow-xl p-5  overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-base-100">
                        <h3 className="text-lg font-semibold text-base-content mb-4">
                            Categories Wise Product Count
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="productCount"
                                    className="fill-primary"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="recent-orders col-span-3">
                    <div className="rounded-xl shadow-xl p-5 overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-base-100">
                        <h3 className="text-lg font-semibold text-base-content mb-4">
                            Recent Orders
                        </h3>
                        {recentOrders.length === 0 ? (
                            <p className="text-base-content">
                                No recent orders found.
                            </p>
                        ) : (
                            <ul className="space-y-4">
                                {recentOrders.map((order) => (
                                    <li
                                        key={order.id}
                                        className="flex justify-between items-center p-4 bg-base-200 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {order.user_name} (
                                                {order.user_email})
                                            </p>
                                            <p className="text-sm">
                                                Order ID: {order.order_uuid}
                                            </p>
                                            <p className="text-sm">
                                                Total: ${order.total_price}
                                            </p>
                                        </div>
                                        <span
                                            className={`badge badge-${
                                                order.status === "delivered"
                                                    ? "success"
                                                    : "warning"
                                            } badge-lg`}
                                        >
                                            {order.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                order.status.slice(1)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="low-stock-products col-span-3">
                    <div className="rounded-xl shadow-xl p-5 overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-base-100">
                        <h3 className="text-lg font-semibold text-base-content mb-4">
                            Low Stock Products
                        </h3>
                        {lowStockProducts.length === 0 ? (
                            <p className="text-base-content">
                                No low stock products found.
                            </p>
                        ) : (
                            <ul className="space-y-4">
                                {lowStockProducts.map((product) => (
                                    <li
                                        key={product.id}
                                        className="flex justify-between items-center p-4 bg-base-200 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {product.name}
                                            </p>
                                            <p className="text-sm">
                                                Stock: {product.stock}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="order-chart col-span-3">
                    <div className="rounded-xl shadow-xl p-5 overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-base-100">
                        <h3 className="text-lg font-semibold text-base-content mb-4">
                            Orders (Last 7 Days)
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
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
                <div className="revenue-chart col-span-3">
                    <div className="rounded-xl shadow-xl p-5 overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-base-100">
                        <h3 className="text-lg font-semibold text-base-content mb-4">
                            Revenues (Last 7 Days)
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
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
                <div className="top-selling-products col-span-3">
                    <div className="rounded-xl shadow-xl p-5 overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-base-100">
                    <h3 className="text-lg font-semibold text-base-content mb-4">
                        Top Selling Products
                    </h3>
                    {topSellingProducts.length === 0 ? (
                        <p className="text-base-content">
                            No top selling products found.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {topSellingProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="flex justify-between items-center p-4 bg-base-200 rounded-lg"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {product.name}
                                        </p>
                                        <p className="text-sm">
                                            Total Sold: {product.total_sold}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                
                </div>
            </div>
            </div>
        </div>
    );
};

export default Dashboard;
