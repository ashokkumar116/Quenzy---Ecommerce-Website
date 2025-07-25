const db = require("../db");

const getFilters = async (req, res) => {
    const [categories] = await db.query("SELECT * FROM categories");
    const [brands] = await db.query("SELECT * FROM brands");
    const [priceRange] = await db.query(
        "SELECT MIN(price) AS minPrice, MAX(price) AS maxPrice FROM products"
    );

    const filters = {
        categories: categories.map((category) => ({
            id: category.id,
            name: category.name,
        })),
        brands: brands.map((brand) => ({
            id: brand.id,
            name: brand.name,
        })),
        priceRange: {
            min: priceRange[0].minPrice,
            max: priceRange[0].maxPrice,
        },
    };

    return res.status(200).json(filters);
};

const fetchProductsByFilter = async (req, res) => {
  try {
    const { categories, brands, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    let filters = "WHERE 1=1";
    let params = [];

    if (categories) {
      const catArr = categories.split(",");
      filters += ` AND p.category_id IN (${catArr.map(() => "?").join(",")})`;
      params.push(...catArr);
    }

    if (brands) {
      const brandArr = brands.split(",");
      filters += ` AND p.brand_id IN (${brandArr.map(() => "?").join(",")})`;
      params.push(...brandArr);
    }

    if (minPrice && maxPrice) {
      filters += ` AND p.price BETWEEN ? AND ?`;
      params.push(minPrice, maxPrice);
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

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
      ${filters}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;
    params.push(parseInt(limit), parseInt(offset));

    const [products] = await db.query(productSql, params);

    const imageSql = `SELECT product_id, image_url, is_main FROM product_images`;
    const [images] = await db.query(imageSql);

    const productsWithImages = products.map((product) => {
      const productImages = images.filter((img) => img.product_id === product.id);
      return {
        ...product,
        images: productImages,
      };
    });

    res.json({
      products: productsWithImages,
      hasMore: products.length === parseInt(limit),
    });

  } catch (error) {
    console.error("Error fetching filtered products:", error.message);
    res.status(500).json({ error: "Failed to get products with images" });
  }
};



module.exports = {
    getFilters,
    fetchProductsByFilter,
};
