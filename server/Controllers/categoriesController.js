const db = require('../db');


const getCategories = async(req,res)=>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    
    const [countResult] = await db.query("SELECT COUNT(*) AS total FROM categories");
    const totalCategories = countResult[0].total;
    const totalPages = Math.ceil(totalCategories / limit);
    
    const sql = "SELECT * FROM categories LIMIT ? OFFSET ?";

    const [categories] = await db.query(sql,[limit,offset]);

    return res.json({
        categories:categories,
        currentPage: page,
        totalPages,
        totalCategories
    });

}

const AddCategory = async(req,res)=>{
    const {name} = req.body;

    const [checkAvailable] = await db.query("SELECT * FROM categories WHERE name = ?",[name]);

    if(checkAvailable.length >0){
        return res.status(400).json({message:"Category Already Exists!"});
    }

    const slugify = (name) => {
        return name
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, "-")
          .replace(/^-+|-+$/g, ""); 
      };

      const slug = slugify(name);

    const sql = "INSERT INTO categories (name,slug) VALUES (?,?)";

    await db.query(sql,[name,slug]);

    return res.status(201).json({message:"Categoriy added Successfully !"})

}


const updateCategory = async(req,res)=>{
    const id = req.params.id;
    const {name} = req.body;

    const [checkAvailable] = await db.query("SELECT * FROM categories WHERE id = ?",[id]);

    if(checkAvailable.length === 0){
        return res.status(400).json({message:"Category Does not Exist!"})
    }

    const slugify = (name) => {
        return name
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, "-")
          .replace(/^-+|-+$/g, ""); 
      };

      const slug = slugify(name);


    const sql = "UPDATE categories SET name = ? , slug = ? WHERE id = ?";

    await db.query(sql,[name,slug,id]);

    res.status(200).json({message:"Category Updated Successfully!"})

}

const deleteCategory = async(req,res)=>{
    const id = req.params.id;

    const sql = "DELETE FROM categories WHERE id = ?";

    const [existing] = await db.query("SELECT * FROM categories WHERE id = ?",[id]);

    if(existing.length === 0){
        return res.status(400).json({message:"Category Does not Exist!"});
    }

    await db.query(sql,[id]);
    return res.status(200).json({message:"Category Deleted Successfully!"});

}

const getCategoriesPage = async (req, res) => {
    const sql = "SELECT * FROM categories";
    const [categories] = await db.query(sql);
    return res.json(categories);

}


module.exports = {
    getCategories,
    AddCategory,
    updateCategory,
    deleteCategory,
    getCategoriesPage
}