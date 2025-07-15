const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const authRoutes = require('./Routes/authRoutes');
const brandRoutes = require('./Routes/brandRoutes');
const categoriesRoutes = require('./Routes/categoriesRoutes');
const sellerRoutes = require('./Routes/sellerRoutes');
const app = express();


app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/brands',brandRoutes);
app.use('/api/categories',categoriesRoutes)
app.use('/api/sellers',sellerRoutes)






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
