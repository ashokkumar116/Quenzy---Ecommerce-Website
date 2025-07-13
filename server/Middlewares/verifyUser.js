const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyUser = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Login to Continue"})
    }
    
    const decoded = await jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
        return res.status(401).json({message:"Token Invalid"})
    }
    
    req.user = decoded;
    next();
}

module.exports = verifyUser;