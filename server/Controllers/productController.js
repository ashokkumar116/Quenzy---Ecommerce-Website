const db = require("../db");

const getAllProducts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = (page - 1) * limit;
  
      // Count total products for pagination
      const [countResult] = await db.query("SELECT COUNT(*) AS total FROM products");
      const totalProducts = countResult[0].total;
      const totalPages = Math.ceil(totalProducts / limit);
  
      // Paginated products query
      const productSql = `
        SELECT 
          p.id, p.name, p.slug, p.description, p.short_description, 
          p.price, p.discount_percentage, p.stock, p.is_active, p.created_at,
          c.name AS category_name,
          b.name AS brand_name,
          s.name AS seller_name,
          p.category_id,
          p.brand_id,
          p.seller_id,
          ROUND(AVG(r.rating), 1) AS avg_rating
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN sellers s ON p.seller_id = s.id
        LEFT JOIN reviews r ON p.id = r.product_id
        GROUP BY p.id
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `;
      const [products] = await db.query(productSql, [limit, offset]);
  
      const imageSql = `SELECT product_id, image_url, is_main FROM product_images`;
      const [images] = await db.query(imageSql);
  
      const productsWithImages = products.map(product => {
        const productImages = images.filter(img => img.product_id === product.id);
        return {
          ...product,
          images: productImages
        };
      });
  
      res.json({
        products: productsWithImages,
        currentPage: page,
        totalPages,
        totalProducts
      });
  
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


const getOneProduct = async (req, res) => {
  const slug = req.params.slug;

  try {
    const [productResult] = await db.query(`
      SELECT 
        p.id, p.name, p.slug, p.description, p.short_description, 
        p.price, p.discount_percentage, p.stock, p.is_active, p.created_at,
        c.name AS category_name,
        c.slug AS category_slug,
        b.name AS brand_name,
        s.name AS seller_name,
        p.category_id,
        p.brand_id,
        p.seller_id,
        ROUND(AVG(r.rating), 1) AS avg_rating
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN sellers s ON p.seller_id = s.id
      LEFT JOIN reviews r ON p.id = r.product_id
      
      WHERE p.slug = ?
      GROUP BY p.id
      LIMIT 1
    `, [slug]);

    if (productResult.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = productResult[0];
    

    const [images] = await db.query(
      "SELECT image_url, is_main FROM product_images WHERE product_id = ?",
      [product.id]
    );

    const [reviews] = await db.query(
  `SELECT r.id, r.rating, r.comment, r.created_at, u.name AS user_name,u.profile_pic AS profile_pic
   FROM reviews r
   JOIN users u ON r.user_id = u.id
   WHERE r.product_id = ?`,
  [product.id]
);

product.reviews = reviews;


    product.images = images;

    res.json( product );

  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const slug = req.params.slug;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const [categoryResult] = await db.query(
      `SELECT id FROM categories WHERE slug = ?`,
      [slug]
    );

    if (categoryResult.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categoryId = categoryResult[0].id;

    const [countResult] = await db.query(
      `SELECT COUNT(*) AS total FROM products WHERE category_id = ?`,
      [categoryId]
    );

    const totalProducts = countResult[0].total;
    const totalPages = Math.ceil(totalProducts / limit);

    const productSql = `
      SELECT 
        p.id, p.name, p.slug, p.description, p.short_description, 
        p.price, p.discount_percentage, p.stock, p.is_active, p.created_at,
        c.name AS category_name,
        p.category_id,
        ROUND(AVG(r.rating), 1) AS avg_rating
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE c.id = ?
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;
    const [products] = await db.query(productSql, [categoryId, limit, offset]);

    const imageSql = `SELECT product_id, image_url, is_main FROM product_images`;
    const [images] = await db.query(imageSql);

    const productsWithImages = products.map(product => {
      const productImages = images.filter(img => img.product_id === product.id);
      return {
        ...product,
        images: productImages
      };
    });

    res.json({
      products: productsWithImages,
      currentPage: page,
      totalPages,
      totalProducts
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Server error" });
  }
};




 

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,
    getProductsByCategory
};
