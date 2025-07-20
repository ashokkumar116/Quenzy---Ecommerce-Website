const db = require('../db');



const addBrand = async (req, res) => {

    const {name} = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({
            message: "Brand name is required"
        });
    }

    const checkSql = "SELECT * FROM brands WHERE name = ?";
    const [existingBrand] = await db.query(checkSql, [name]);
    if (existingBrand.length > 0) {
        return res.status(400).json({
            message: "Brand already exists"
        });
    }

    const slugify = (name) => {
        return name
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, "-")
          .replace(/^-+|-+$/g, ""); 
      };

      const slug = slugify(name);

      const sql = "INSERT INTO brands (name, slug) VALUES (?, ?)";

      await db.query(sql,[name,slug]);

      return res.status(201).json({
        message: "Brand added successfully",
        brand: {
          name,
          slug
        }
      });


}


const getBrands = async (req,res)=>{

    const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = (page - 1) * limit;
  
      // Count total products for pagination
      const [countResult] = await db.query("SELECT COUNT(*) AS total FROM brands");
      const totalBrands = countResult[0].total;
      const totalPages = Math.ceil(totalBrands / limit);

    const sql = "SELECT * FROM brands LIMIT ? OFFSET ?";

    const [brands] = await db.query(sql,[limit, offset]);

    return res.json({
        brands: brands,
        currentPage: page,
        totalPages,
        totalBrands
    });    
} 

const updateBrand = async (req,res)=>{
    const {id} = req.params;
    const {name} = req.body;

    const sql = "UPDATE brands SET name = ? , slug = ? WHERE id = ?";

    const slugify = (name) => {
        return name
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, "-")
          .replace(/^-+|-+$/g, ""); 
      };

      const slug = slugify(name);

    await db.query(sql, [name,slug, id]);
    return res.status(200).json({
        message: "Brand updated successfully",
        brand: {
            id,
            name,
            slug
        }
    });

}

const deleteBrand = async (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM brands WHERE id = ?";

    await db.query(sql, [id]);

    return res.status(200).json({
        message: "Brand deleted successfully",
        brandId: id
    });
}

const getBrandsPage = async (req, res) => {
    const sql = "SELECT * FROM brands";
    const [brands] = await db.query(sql);
    return res.json(brands);

}


module.exports = {
    addBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    getBrandsPage

}