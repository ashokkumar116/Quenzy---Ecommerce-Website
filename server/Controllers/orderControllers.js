const db = require('../db');


const { v4: uuidv4 } = require("uuid");

const placeOrder = async (req, res) => {
  const connection = await db.getConnection(); 
  const user_id = req.user.id

  try {
    const {address, paymentMethod, items, total } = req.body;
    const orderUUID = uuidv4();
    const now = new Date();

    // Start transaction
    await connection.beginTransaction();

    // 1. Insert into orders table
    const [orderResult] = await connection.query(
      `INSERT INTO orders (order_uuid, user_id, total_price, payment_method, status, shipping_address)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [orderUUID, user_id, total, paymentMethod, "pending", address]
    );

    const orderId = orderResult.insertId;

    // 2. Insert into order_items table for each product
    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    // Commit transaction
    await connection.commit();

    res.status(200).json({ message: "Order placed successfully", orderUUID });

  } catch (err) {
    await connection.rollback();
    console.error("Order error:", err);
    res.status(500).json({ message: "Order failed" });
  } finally {
    connection.release();
  }
};


module.exports = {
  placeOrder
}
