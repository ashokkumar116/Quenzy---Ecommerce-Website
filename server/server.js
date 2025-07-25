const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

//Routes Imports
const authRoutes = require('./Routes/authRoutes');
const brandRoutes = require('./Routes/brandRoutes');
const categoriesRoutes = require('./Routes/categoriesRoutes');
const sellerRoutes = require('./Routes/sellerRoutes');
const productRoutes = require('./Routes/productRoutes');
const dashboardRoutes = require('./Routes/dashboardRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const contactRoutes = require('./Routes/contactRoutes');
const filtersRoutes = require('./Routes/filtersRoutes');
const searchRoutes = require('./Routes/searchRoutes');

//Express App Initialization
const app = express();
const path = require('path');

//Middlewares
app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser());

//Middleware Routes
app.use('/api/auth',authRoutes);
app.use('/api/brands',brandRoutes);
app.use('/api/categories',categoriesRoutes)
app.use('/api/sellers',sellerRoutes);
app.use('/api/products',productRoutes);
app.use('/api/dashboard',dashboardRoutes);
app.use('/api/carts',cartRoutes);
app.use('/api/contactus',contactRoutes);
app.use('/api/filters',filtersRoutes)
app.use('/api/searchbar',searchRoutes)


// Serve static files from the React app
app.use('/uploads', express.static('Uploads'));




//Server Connection
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
