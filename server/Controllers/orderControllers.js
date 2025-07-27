const db = require("../db");

const { v4: uuidv4 } = require("uuid");

const placeOrder = async (req, res) => {
    const connection = await db.getConnection();
    const user_id = req.user.id;

    try {
        const { address, paymentMethod, items, total } = req.body;
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

        res.status(200).json({
            message: "Order placed successfully",
            orderUUID,
        });
    } catch (err) {
        await connection.rollback();
        console.error("Order error:", err);
        res.status(500).json({ message: "Order failed" });
    } finally {
        connection.release();
    }
};

const getMyOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.query(
            `
  SELECT 
  o.id AS order_id,
  o.order_uuid,
  o.user_id,
  o.total_price,
  o.payment_method,
  o.status,
  o.shipping_address,
  o.created_at AS order_created_at,

  oi.product_id,
  oi.quantity,
  oi.price AS item_price,

  p.name AS product_name,

  (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1) AS image_url

FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id

WHERE o.user_id = ?
ORDER BY o.created_at DESC;

      `,
            [userId]
        );

        // Group by order
        const groupedOrders = {};

        for (const row of rows) {
            const orderId = row.order_id;

            if (!groupedOrders[orderId]) {
                groupedOrders[orderId] = {
                    order_id: orderId,
                    order_uuid: row.order_uuid,
                    total_price: row.total_price,
                    payment_method: row.payment_method,
                    status: row.status,
                    shipping_address: row.shipping_address,
                    created_at: row.order_created_at,
                    items: [],
                };
            }

            // Push product to items list
            groupedOrders[orderId].items.push({
                product_id: row.product_id,
                product_name: row.product_name,
                quantity: row.quantity,
                price: row.item_price,
                image_url: row.image_url,
            });
        }

        res.status(200).json(Object.values(groupedOrders));
    } catch (err) {
        console.error("getMyOrders error:", err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

const cancelOrder = async(req,res)=>{
  const {order_id} = req.body;
  const sql = "UPDATE orders SET status = ? WHERE id = ?";
  await db.query(sql,['cancelled',order_id]);

  res.status(200).json({message:"Order Cancelled Successfully!"});

}

const updateOrderStatus = async(req,res)=>{
    const {order_id , status} = req.body;
    const sql = "UPDATE orders SET status = ? WHERE id = ?";
    await db.query(sql,[status,order_id]);
    res.status(200).json({message:"Order Status updated successfully!"});
}

const getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                o.id AS order_id,
                o.order_uuid,
                o.user_id,
                o.total_price,
                o.payment_method,
                o.status,
                o.shipping_address,
                o.created_at AS order_created_at,

                u.name AS user_name,
                u.email AS user_email,

                oi.product_id,
                oi.quantity,
                oi.price AS item_price,

                p.name AS product_name,

                (
                    SELECT image_url 
                    FROM product_images 
                    WHERE product_id = p.id 
                    LIMIT 1
                ) AS image_url

            FROM orders o
            JOIN users u ON o.user_id = u.id
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            ORDER BY o.created_at DESC;
        `);

        const groupedOrders = {};

        for (const row of rows) {
            const orderId = row.order_id;

            if (!groupedOrders[orderId]) {
                groupedOrders[orderId] = {
                    order_id: orderId,
                    order_uuid: row.order_uuid,
                    user_id: row.user_id,
                    total_price: row.total_price,
                    payment_method: row.payment_method,
                    status: row.status,
                    shipping_address: row.shipping_address,
                    created_at: row.order_created_at,
                    user_name: row.user_name,
                    user_email: row.user_email,
                    items: [],
                };
            }

            groupedOrders[orderId].items.push({
                product_id: row.product_id,
                product_name: row.product_name,
                quantity: row.quantity,
                price: row.item_price,
                image_url: row.image_url,
            });
        }

        res.status(200).json(Object.values(groupedOrders));
    } catch (err) {
        console.error("getAllOrders error:", err);
        res.status(500).json({ message: "Failed to fetch all orders" });
    }
};


module.exports = {
    placeOrder,
    getMyOrders,
    cancelOrder,
    updateOrderStatus,
    getAllOrders
};
