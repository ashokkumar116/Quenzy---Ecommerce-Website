const db = require("../db");

const getUserCount = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT COUNT(*) AS userCount FROM users");
        const userCount = rows[0].userCount;
        res.json({ userCount });
    } catch (error) {
        console.error("Error fetching user count:", error.message);
        res.status(500).json({ error: "Failed to get user count" });
    }
}

const getProductCount = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT COUNT(*) AS productCount FROM products");
        const productCount = rows[0].productCount;
        res.json({ productCount });
    } catch (error) {
        console.error("Error fetching product count:", error.message);
        res.status(500).json({ error: "Failed to get product count" });
    }
}

const getSellerCount = async(req,res)=>{
    try {
        const [rows] = await db.query("SELECT COUNT(*) AS sellerCount FROM sellers");
        const sellerCount = rows[0].sellerCount;
        res.json({ sellerCount });
    } catch (error) {
        console.error("Error fetching seller count:", error.message);
        res.status(500).json({ error: "Failed to get seller count" });
    }
}

const getCategoriesData = async(req,res)=>{
    try {
        
        const sql = "SELECT c.id, c.name, COUNT(p.id) AS productCount FROM categories c LEFT JOIN products p ON c.id = p.category_id GROUP BY c.id";
        const [rows] = await db.query(sql);
        const categoriesData = rows.map(category => ({
            id: category.id,
            name: category.name,
            productCount: category.productCount
        }));
        res.json(categoriesData);

    } catch (error) {
        console.error("Error fetching categories data:", error.message);
        res.status(500).json({ error: "Failed to get categories data" });
    }
}

module.exports = {
    getUserCount,
    getProductCount,
    getSellerCount,
    getCategoriesData
};