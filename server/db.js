const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


db.getConnection().then((connection)=>{
    console.log("Database connected successfully!");
    connection.release();
})


module.exports = db;