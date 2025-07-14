const db = require('../db');



const addBrand = async (req, res) => {

    const {name} = req.body;

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
    const sql = "SELECT * FROM brands";

    const [brands] = await db.query(sql);

    return res.json(brands);    
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


module.exports = {
    addBrand,
    getBrands,
    updateBrand,
    deleteBrand

}