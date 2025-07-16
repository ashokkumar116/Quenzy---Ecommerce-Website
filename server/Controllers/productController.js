const db = require("../db");

const getAllProducts = async (req, res) => {
    const sql = "SELECT * FROM products";

    const [products] = await db.query(sql);

    return res.json(products);
};

const addProduct = async (req, res) => {
    const {
        name,
        short_description,
        description,
        price,
        discount_percentage,
        stock,
        category_id,
        brand_id,
        seller_id,
        is_active,
    } = req.body;
    const images = req.files;
    const slugify = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const slug = slugify(name);

    const sql =
        "INSERT INTO products (name,slug,short_description,description,price,discount_percentage,stock,category_id,brand_id,seller_id,is_active) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

    const values = [
        name,
        slug,
        short_description,
        description,
        price,
        discount_percentage,
        stock,
        category_id,
        brand_id,
        seller_id,
        is_active,
    ];

    try {
        const [result] = await db.query(sql, values);

        const productId = result.insertId;

        if (images && images.length > 0) {
            const imageSql =
                "INSERT INTO product_images (product_id,image_url,is_main) VALUES ?";
            const imageValues = images.map((image,index) => [
                productId,
                `/uploads/products/${image.filename}`,
                index === 0 ? 1 : 0,
            ]);
            await db.query(imageSql, [imageValues]);
        }
        return res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" , error: error.message });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
};
