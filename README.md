# 🛒 Quenzy – Shop Smart. Shop Quenzy.

Quenzy is a **full-stack, role-based e-commerce web application** where users can browse products, manage carts, and place orders, while admins can manage products, categories, and orders.  
Built with a focus on **scalability**, **security**, and **modern UI**.

---

## 🚀 Features

### 👤 User
- Browse products with category filtering
- Add/remove items from cart
- Place and track orders
- Secure login & registration (JWT + HTTP-only cookies)
- Profile management

### 🛠 Admin
- Add, edit, and delete products & categories
- Manage orders and update statuses
- Dashboard with data visualizations
- Role-based access control

---

## 🖥 Tech Stack

### Frontend
- **React.js**
- **PrimeReact && DaisyUI**  – UI components
- **Tailwind CSS** – Styling
- **Axios** – API calls

### Backend
- **Node.js + Express.js**
- **MySQL** – Database
- **JWT** – Authentication
- **Multer + Cloudinary** – Image uploads
- **Chart.js** – Data visualization

---

## 📂 Folder Structure

```
Quenzy/
│
├── client/          # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── Loader/
│   │   ├── pages/
│   │   ├── ProtectedRoutes/
│   │   ├── /
│   │   └── App.js
│   └── package.json
│
├── server/          # Node.js backend
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── Uploads/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashokkumar116/Quenzy---Ecommerce-Website.git
   cd Quenzy---Ecommerce-Website
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd client
   npm install

   # Backend
   cd server
   npm install
   ```

3. **Set up environment variables**  
   Create `.env` files in both `client` and `server` folders:

   **Server `.env`**
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=quenzy_db
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the application**
   ```bash
   # Backend
   cd server
   npm start

   # Frontend
   cd ../client
   npm run dev
   ```

---

## 🔐 Authentication
- Uses **JWT** stored in **HTTP-only cookies** for security.
- Role-based routes for **admin** and **user** access.

---

## 📊 Admin Dashboard
- Overview of sales, orders, and product statistics.
- Interactive charts built with **Chart.js**.

---

## 🌐 Deployment
- **Frontend**: Netlify
- **Backend**: Render
- **Database**: Cleaver Cloud
- **Images**: Cloudinary

---

## 🤝 Contributing

Feel free to fork the project and open pull requests!

---

## 🌐 Live Demo

🔗 [View Live Demo Here](https://quenzy.netlify.app/)

## 💡 Future Improvements
- Payment gateway integration
- Wishlist feature
- Order invoice downloads

## 👨‍💻 Developed by

Ashok Kumar – [@ashokkumar116]([https://github.com/yourusername](https://github.com/ashokkumar116))
