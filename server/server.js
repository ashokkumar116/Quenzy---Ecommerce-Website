const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const authRoutes = require('./Routes/authRoutes');
const app = express();


app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser());

app.use('/api/auth',authRoutes)






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
