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
- **Recharts** – Data visualization

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
   cd client
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

## 🖼️ UI Preview

### 🏡 Home Page
<p float="left">
<img width="300" alt="Screenshot 2025-08-10 123902" src="https://github.com/user-attachments/assets/4c64c245-d289-4099-a508-9585d911f553" />
</p>

### 🛒 Products Page

<p float="left">
<img width="300" alt="Screenshot 2025-08-10 220028" src="https://github.com/user-attachments/assets/afd068d6-74e0-45c6-b2ca-88f56b7cdfc5" />
<img width="300" alt="Screenshot 2025-08-10 220109" src="https://github.com/user-attachments/assets/a5b0616c-0eed-4576-8abc-b817be184745" />
<img width="300" alt="Screenshot 2025-08-10 220136" src="https://github.com/user-attachments/assets/92372070-e9d5-4610-9709-b4da1a4babc6" />
<img width="300" alt="Screenshot 2025-08-10 220158" src="https://github.com/user-attachments/assets/69949539-915a-43e2-8f59-d90b694d2eb2" />

</p>

### 👥 Users Profile and orders

<p float="left">
<img width="300" alt="Screenshot 2025-08-10 220234" src="https://github.com/user-attachments/assets/59c93ee0-e2a2-4b14-bb8f-7da86a3a0b7e" />
<img width="300" alt="Screenshot 2025-08-10 220401" src="https://github.com/user-attachments/assets/50b11056-997b-4cec-9c18-392702fcd0c2" />

</p>

### 🛍️ Cart and Orders

<p float="left">
<img width="300" alt="Screenshot 2025-08-10 220433" src="https://github.com/user-attachments/assets/f6d33706-234d-444e-8cf6-a5abd64f5553" />
<img width="300" alt="Screenshot 2025-08-10 220458" src="https://github.com/user-attachments/assets/5ab9fc5b-e578-4526-bc44-356949d7770f" />

</p>

### 🔐 Admin pages

<p float="left">
<img width="300" alt="Screenshot 2025-08-10 220602" src="https://github.com/user-attachments/assets/f3e9983d-0216-4337-b6aa-55c6f03ea6fd" />
<img width="300" alt="Screenshot 2025-08-10 220619" src="https://github.com/user-attachments/assets/69144b3f-3ee8-465b-b992-0c7a41a5130b" />
<img width="300" alt="Screenshot 2025-08-10 220648" src="https://github.com/user-attachments/assets/51065c7b-b386-4f13-859c-4626a7d9c036" />
<img width="300" alt="Screenshot 2025-08-10 220719" src="https://github.com/user-attachments/assets/abaced28-ef86-4c23-9ee4-de3b758ea38b" />


</p>

### Other pages

<p float="left">
   <img width="300" alt="Screenshot 2025-08-10 220808" src="https://github.com/user-attachments/assets/e1112909-9a40-48c6-a728-48994db46272" />
   <img width="300" alt="Screenshot 2025-08-10 220907" src="https://github.com/user-attachments/assets/4b3a063d-deb8-4ccd-9040-bc437eeac0ab" />
   <img width="300" alt="Screenshot 2025-08-10 220925" src="https://github.com/user-attachments/assets/de8e7a4b-c1f3-4d18-875c-faf5bb3cbf0e" />
   <img width="300" alt="Screenshot 2025-08-10 220940" src="https://github.com/user-attachments/assets/53c5516b-c54b-433a-ac2c-f9e7f28adc95" />
</p>


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

Ashok Kumar – [@ashokkumar116]([https://github.com/ashokkumar116])
