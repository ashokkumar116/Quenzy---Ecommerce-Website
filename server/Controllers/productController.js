const db = require("../db");

const getAllProducts = async (req, res) => {
    try {
      const productSql = `
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
        ORDER BY p.created_at DESC
      `;
      const [products] = await db.query(productSql);
  
      const imageSql = `SELECT product_id, image_url, is_main FROM product_images`;
      const [images] = await db.query(imageSql);
  
      const productsWithImages = products.map(product => {
        const productImages = images.filter(img => img.product_id === product.id);
        return {
          ...product,
          images: productImages 
        };
      });
  
      res.json(productsWithImages);
  
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({ error: "Failed to get products with images" });
    }
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

const updateProduct = async(req,res)=>{
  const productId = req.params.id;
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
    is_active
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
  const sql = "UPDATE products SET name=?, slug=?, short_description=?, description=?, price=?, discount_percentage=?, stock=?, category_id=?, brand_id=?, seller_id=?, is_active=? WHERE id=?";
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
      productId
  ];
  try {
      const [result] = await db.query(sql, values);
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Product not found" });
      }
      if (images && images.length > 0) {
          const imageSql = "INSERT INTO product_images (product_id, image_url, is_main) VALUES ?";
          const imageValues = images.map((image, index) => [
              productId,
              `/uploads/products/${image.filename}`,
              index === 0 ? 1 : 0,
          ]);
          await db.query(imageSql, [imageValues]);
      }
      return res.status(200).json({ message: "Product updated successfully!" });
  } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

const deleteProduct = async (req, res) => {
  const product_id = req.params.id;
  const sql = "DELETE FROM products WHERE id = ?";
  try {
      const [result] = await db.query(sql, [product_id]);
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
      console.error("Error deleting product:", error.message);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }

}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};
