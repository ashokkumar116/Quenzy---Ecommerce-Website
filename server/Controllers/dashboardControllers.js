const db = require("../db");

const getUserCount = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT COUNT(*) AS userCount FROM users"
        );
        const userCount = rows[0].userCount;
        res.json({ userCount });
    } catch (error) {
        console.error("Error fetching user count:", error.message);
        res.status(500).json({ error: "Failed to get user count" });
    }
};

const getProductCount = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT COUNT(*) AS productCount FROM products"
        );
        const productCount = rows[0].productCount;
        res.json({ productCount });
    } catch (error) {
        console.error("Error fetching product count:", error.message);
        res.status(500).json({ error: "Failed to get product count" });
    }
};

const getSellerCount = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT COUNT(*) AS sellerCount FROM sellers"
        );
        const sellerCount = rows[0].sellerCount;
        res.json({ sellerCount });
    } catch (error) {
        console.error("Error fetching seller count:", error.message);
        res.status(500).json({ error: "Failed to get seller count" });
    }
};

const getCategoriesData = async (req, res) => {
    try {
        const sql =
            "SELECT c.id, c.name, COUNT(p.id) AS productCount FROM categories c LEFT JOIN products p ON c.id = p.category_id GROUP BY c.id";
        const [rows] = await db.query(sql);
        const categoriesData = rows.map((category) => ({
            id: category.id,
            name: category.name,
            productCount: category.productCount,
        }));
        res.json(categoriesData);
    } catch (error) {
        console.error("Error fetching categories data:", error.message);
        res.status(500).json({ error: "Failed to get categories data" });
    }
};

// 1. Summary Cards Stats
getDashboardStats = async (req, res) => {
    try {
        const [[users]] = await db.execute(
            "SELECT COUNT(*) as total_users FROM users"
        );
        const [[orders]] = await db.execute(
            "SELECT COUNT(*) as total_orders FROM orders"
        );
        const [[revenue]] = await db.execute(
            "SELECT IFNULL(SUM(total_price), 0) as total_revenue FROM orders WHERE status = 'delivered'"
        );
        const [[products]] = await db.execute(
            "SELECT COUNT(*) as total_products FROM products"
        );
        // const [[reviews]] = await db.execute('SELECT COUNT(*) as total_reviews FROM reviews');

        res.json({
            total_users: users.total_users,
            total_orders: orders.total_orders,
            total_revenue: revenue.total_revenue,
            total_products: products.total_products,
            // total_reviews: reviews.total_reviews
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch stats", error: err });
    }
};

// 2. Recent Orders (latest 5)
getRecentOrders = async (req, res) => {
    try {
        const [orders] = await db.execute(`
            SELECT o.id, o.order_uuid, o.total_price, o.status, o.created_at,
                   u.name as user_name, u.email as user_email
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
            LIMIT 5
        `);
        res.json(orders);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch recent orders",
            error: err,
        });
    }
};

// 3. Recent Reviews (latest 5)
// getRecentReviews = async (req, res) => {
//     try {
//         const [reviews] = await db.execute(`
//             SELECT r.id, r.rating, r.comment, r.created_at,
//                    u.name as user_name, p.title as product_name
//             FROM reviews r
//             JOIN users u ON r.user_id = u.id
//             JOIN products p ON r.product_id = p.id
//             ORDER BY r.created_at DESC
//             LIMIT 5
//         `);
//         res.json(reviews);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch reviews', error: err });
//     }
// };

// 4. Low Stock Alerts
getLowStockProducts = async (req, res) => {
    try {
        const [products] = await db.execute(`
            SELECT id, name, stock FROM products
            WHERE stock <= 5
            ORDER BY stock ASC
        `);
        res.json(products);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch low stock products",
            error: err,
        });
    }
};

// 5. Order Chart Data (for past 7 days)
getOrderChartData = async (req, res) => {
    try {
        const [orders] = await db.execute(`
            SELECT 
            DATE_FORMAT(created_at, '%d %b') AS date, 
            COUNT(*) AS count
            FROM orders
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY DATE(created_at)
            ORDER BY date ASC;
        `);
        res.json(orders);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch order chart data",
            error: err,
        });
    }
};

// 6. Revenue Chart Data (past 7 days)
getRevenueChartData = async (req, res) => {
    try {
        const [revenue] = await db.execute(`
            SELECT DATE_FORMAT(created_at, '%d %b') AS date, SUM(total_price) as revenue
            FROM orders
            WHERE status = 'delivered' AND created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY DATE(created_at)
            ORDER BY date ASC
        `);
        res.json(revenue);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch revenue chart data",
            error: err,
        });
    }
};

// 7. Top Selling Products (last 30 days)
getTopSellingProducts = async (req, res) => {
    try {
        const [products] = await db.execute(`
            SELECT p.name, SUM(oi.quantity) as total_sold
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            JOIN orders o ON oi.order_id = o.id
            WHERE o.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY p.id
            ORDER BY total_sold DESC
            LIMIT 5
        `);
        res.json(products);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch top selling products",
            error: err,
        });
    }
};

module.exports = {
    getUserCount,
    getProductCount,
    getSellerCount,
    getCategoriesData,
    getDashboardStats,
    getRecentOrders,
    // getRecentReviews,
    getLowStockProducts,
    getOrderChartData,
    getRevenueChartData,
    getTopSellingProducts,
};
