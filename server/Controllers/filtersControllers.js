const db = require('../db');



const getFilters = async(req,res)=>{
    const [categories] = await db.query('SELECT * FROM categories');
    const [brands] = await db.query('SELECT * FROM brands');
    const [priceRange] = await db.query("SELECT MIN(price) AS minPrice, MAX(price) AS maxPrice FROM products");

    const filters = {
        categories:categories.map(category => ({
            id: category.id,
            name: category.name,
        })),
        brands:brands.map(brand => ({
            id: brand.id,
            name: brand.name,
        })),
        priceRange: {
            min: priceRange[0].minPrice,
            max: priceRange[0].maxPrice,
        },

    };

    return res.status(200).json(filters);

}


const fetchProductsByFilter = async (req, res) => {
    const {
      categories,
      brands,
      priceRange,
      limit = 10,
      offset = 0
    } = req.body;
  
    try {
      // ---------------------------
      // Step 1: Build WHERE conditions
      // ---------------------------
      let conditions = 'WHERE 1=1';
      const params = [];
  
      if (categories && categories.length > 0) {
        conditions += ` AND p.category_id IN (${categories.map(() => '?').join(',')})`;
        params.push(...categories);
      }
  
      if (brands && brands.length > 0) {
        conditions += ` AND p.brand_id IN (${brands.map(() => '?').join(',')})`;
        params.push(...brands);
      }
  
      if (priceRange && priceRange.length === 2) {
        conditions += ' AND p.price BETWEEN ? AND ?';
        params.push(priceRange[0], priceRange[1]);
      }
  
      // ---------------------------
      // Step 2: Count total filtered products
      // ---------------------------
      const countSql = `SELECT COUNT(*) AS total FROM products p ${conditions}`;
      const [countResult] = await db.query(countSql, params);
      const totalProducts = countResult[0].total;
      const totalPages = Math.ceil(totalProducts / limit);
  
      // ---------------------------
      // Step 3: Fetch filtered products with joins
      // ---------------------------
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
        ${conditions}
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `;
      params.push(parseInt(limit), parseInt(offset));
      const [products] = await db.query(productSql, params);
  
      // ---------------------------
      // Step 4: Fetch all product images (optional optimization: only for shown product IDs)
      // ---------------------------
      const productIds = products.map(p => p.id);
      let images = [];
  
      if (productIds.length > 0) {
        const imageSql = `SELECT product_id, image_url, is_main FROM product_images WHERE product_id IN (${productIds.map(() => '?').join(',')})`;
        const [imageResult] = await db.query(imageSql, productIds);
        images = imageResult;
      }
  
      // ---------------------------
      // Step 5: Attach images to each product
      // ---------------------------
      const productsWithImages = products.map(product => {
        const productImages = images.filter(img => img.product_id === product.id);
        return {
          ...product,
          images: productImages
        };
      });
  
      // ---------------------------
      // Step 6: Return response in standard format
      // ---------------------------
      return res.status(200).json({
        products: productsWithImages,
        currentPage: Math.floor(offset / limit) + 1,
        totalPages,
        totalProducts
      });
  
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  



module.exports = {
    getFilters,
    fetchProductsByFilter
}