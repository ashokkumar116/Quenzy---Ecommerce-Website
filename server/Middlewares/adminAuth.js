const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.id !==1) {
        return res.status(403).json({ message: 'Forbidden. Admins only.' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = adminAuth;