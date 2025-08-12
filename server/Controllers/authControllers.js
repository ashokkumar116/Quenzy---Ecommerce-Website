const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
        return res.status(400).json({ message: "No User Exists" });
    }
    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) {
        return res.status(400).json({ message: "Wrong Password" });
    }

    const token = await jwt.sign({id:user.id},process.env.JWT_SECRET, {expiresIn:'1h'});

    res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ?'None' : 'Strict',
        maxAge: 3600000 
    });

    return res.status(200).json({message:"Successfully Logged in"})

}

const registerUser = async(req,res)=>{
    const {name,email,password,contact} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if(users.length > 0){
        return res.status(400).json({message: "User already exists"});
    }

    const salt =await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = "INSERT INTO users (name, email, password, contact) VALUES (?, ?, ?, ?)";
    
    try {
        await db.query(sql,[name,email,hashedPassword,contact]);
        return res.status(201).json({message: "User registered successfully"});
        
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const getUser = async(req,res)=>{
    const id = req.user.id;
    const sql = "SELECT * FROM users WHERE id = ?";

    const [users] = await db.query(sql,[id]);

    if(users.length === 0){
        return res.status(401).json({message:"No User Found"})
    }

    const user = users[0];

    return res.json(user);

}

const logout =async (req,res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    return res.status(200).json({message:"Successfully logged out"});
}

const uploadProfile = async (req, res) => {
    const profile_pic = req.file; // Cloudinary gives file info here

    if (!profile_pic) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const id = req.user.id;
    const sql = "UPDATE users SET profile_pic = ? WHERE id = ?";

    try {
        // Store Cloudinary secure URL instead of local file path
        await db.query(sql, [profile_pic.path, id]);

        return res.status(200).json({
            message: "Profile picture updated successfully",
            imageUrl: profile_pic.path // frontend can use this directly
        });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const editUser = async(req,res)=>{
    const {name,contact} = req.body;
    const id = req.user.id;
    if(!contact){
        contact = null;
    }
    const sql = "UPDATE users SET name = ? , contact = ? WHERE id = ?";
    try {
        await db.query(sql, [name, contact, id]);
        return res.status(200).json({message: "User details updated successfully"});
    } catch (error) {
        console.error("Error updating user details:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    loginUser,
    registerUser,
    getUser,
    logout,
    uploadProfile,
    editUser
}