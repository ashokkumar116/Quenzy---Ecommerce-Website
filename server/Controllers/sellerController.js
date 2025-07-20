const db = require('../db');



const getAllSeller = async(req,res)=>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    
    const [countResult] = await db.query("SELECT COUNT(*) AS total FROM sellers");
    const totalSellers = countResult[0].total;
    const totalPages = Math.ceil(totalSellers / limit);

    const sql = "SELECT * FROM sellers LIMIT ? OFFSET ?";

    const [sellers] = await db.query(sql,[limit,offset]);

    return res.json({
        sellers: sellers,
        currentPage: page,
        totalPages,
        totalSellers
    });

}

const addSeller = async(req,res)=>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        return res.status(400).json({message:"All fields are required"});
    }
    const existingSeller = await db.query("SELECT * FROM sellers WHERE email = ?", [email]);
    if(existingSeller[0].length > 0){
        return res.status(400).json({message:"Seller already exists"});
    }
    const sql = "INSERT INTO sellers (name,email,phone) VALUES (?,?,?)";

    await db.query(sql, [name, email, phone]);
    return res.status(201).json({message:"Seller added successfully"});

}   

const updateSeller = async(req,res)=>{
    const {id} = req.params;
    const {name,email,phone} = req.body;

    if(!name || !email || !phone){
        return res.status(400).json({message:"All fields are required"});
    }
    const existingSeller = await db.query("SELECT * FROM sellers WHERE id = ?", [id]);

    if(existingSeller[0].length === 0){
        return res.status(404).json({message:"Seller not found"});
    }

    const sql = "UPDATE sellers SET name = ?, email = ?, phone = ? WHERE id = ?";

    await db.query(sql, [name, email, phone, id]);

    return res.status(200).json({message:"Seller updated successfully"});
}

const deleteSeller = async(req,res)=>{
    const {id} = req.params;

    const existingSeller = await db.query("SELECT * FROM sellers WHERE id = ?", [id]);

    if(existingSeller[0].length === 0){
        return res.status(404).json({message:"Seller not found"});
    }

    const sql = "DELETE FROM sellers WHERE id = ?";

    await db.query(sql, [id]);

    return res.status(200).json({message:"Seller deleted successfully"});
}


const getSellersPage = async(req,res)=> {
    const sql = "SELECT * FROM sellers";
    const [sellers] = await db.query(sql);
    return res.json(sellers);
}


module.exports ={
    getAllSeller,
    addSeller,
    updateSeller,
    deleteSeller,
    getSellersPage
}