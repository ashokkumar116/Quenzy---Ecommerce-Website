const db = require("../db");

// Controller to handle search queries
const searchByQuery = async (req, res) => {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    if (!query) return res.status(400).json({ message: "No search query" });

    try {
        // Count total matched products
        const [countResult] = await db.query(
            `SELECT COUNT(*) AS total 
         FROM products 
         WHERE name LIKE ? OR description LIKE ?`,
            [`%${query}%`, `%${query}%`]
        );
        const totalProducts = countResult[0].total;
        const totalPages = Math.ceil(totalProducts / limit);

        // Fetch matched products with details
        const searchSql = `
        SELECT 
          p.id, p.name, p.slug, p.description, p.short_description, 
          p.price, p.discount_percentage, p.stock, p.is_active, p.created_at,
          c.name AS category_name,
          b.name AS brand_name,
          s.name AS seller_name,
          p.category_id,
          p.brand_id,
          p.seller_id
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN sellers s ON p.seller_id = s.id
        WHERE p.name LIKE ? OR p.description LIKE ?
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `;
        const [products] = await db.query(searchSql, [
            `%${query}%`,
            `%${query}%`,
            limit,
            offset,
        ]);

        // Fetch product images
        const [images] = await db.query(
            `SELECT product_id, image_url, is_main FROM product_images`
        );

        const productsWithImages = products.map((product) => {
            const productImages = images.filter(
                (img) => img.product_id === product.id
            );
            return {
                ...product,
                images: productImages,
            };
        });

        res.json({
            products: productsWithImages,
            currentPage: page,
            totalPages,
            totalProducts,
        });
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ message: "Server error during search" });
    }
};

module.exports = {
    searchByQuery,
};
