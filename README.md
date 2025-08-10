# 🛒 Quenzy – Shop Smart. Shop Quenzy.

A **full-stack role-based e-commerce web application** where users can browse products, manage carts, and place orders, while admins can manage products, categories, and orders. Built with **scalability**, **security**, and **clean UI** in mind.

## 🔧 Tech Stack
- **Frontend:** React.js, PrimeReact, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Authentication:** JWT (JSON Web Token) + Cookie-based auth  
- **File Uploads:** Multer + Cloudinary (for product and profile images)  

## ✨ Features

### User Panel
- Sign up, log in, and manage profile  
- Browse products by category  
- Add/remove items from cart  
- Place orders with delivery info  
- View order history  

### Admin Panel
- Add, edit, delete products  
- Manage product categories  
- View and manage all orders  
- Dashboard with sales and order analytics  

## 🗂️ Folder Structure
📦 quenzy
├── client (React frontend)
│ ├── src
│ └── ...
├── server (Node + Express backend)
│ ├── controllers
│ ├── routes
│ ├── middlewares
│ ├── config
│ └── ...
└── README.md

markdown
Copy
Edit

## 🔐 Authentication & Authorization
- **JWT tokens** stored in **HTTP-only cookies** for security  
- Middleware for route protection  
- Role-based access (Admin, User)  

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ashokkumar116/quenzy.git
cd quenzy
2️⃣ Setup Backend
bash
Copy
Edit
cd server
npm install
# Configure .env file (DB credentials, JWT secret, Cloudinary keys)
npm start
3️⃣ Setup Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
⚙️ Environment Variables
Create a .env file inside server/ with:

env
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=quenzy_db
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
🖼️ UI Preview
🏠 Home & Product Listing


🛍️ Cart & Checkout


📦 Orders & Order History

⚙️ Admin Dashboard & Product Management


📦 Deployment
Frontend: Netlify

Backend: Render

Database: Clever Cloud

🌐 Live Demo
🔗 View Live Demo Here

✅ Admin Login:
Email: testadmin@quenzy.com
Password: 12345

✅ User Login:
Email: testuser@quenzy.com
Password: 54321

(Demo accounts are pre-filled for testing all features.)

🤝 Contributing
Fork the repository, make your changes, and submit a pull request!

👨‍💻 Developed by
Ashok Kumar – @ashokkumar116