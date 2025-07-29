
const db = require('../db')

const addReview = async (req, res) => {
    const { productId, rating, comment, orderId } = req.body;
    const userId = req.user.id;

    try {
        // Verify if the order is delivered and belongs to the user
        const [orderCheck] = await db.execute(`
            SELECT o.status
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            WHERE o.id = ? AND o.user_id = ? AND oi.product_id = ?
        `, [orderId, userId, productId]);

        if (!orderCheck.length || orderCheck[0].status !== 'delivered') {
            return res.status(400).json({ message: 'You can only review delivered products.' });
        }

        // Check if user already reviewed this product in this order
        const [existing] = await db.execute(`
            SELECT * FROM reviews
            WHERE user_id = ? AND product_id = ? AND order_id = ?
        `, [userId, productId, orderId]);

        if (existing.length) {
            return res.status(400).json({ message: 'You have already reviewed this product.' });
        }

        // Insert review
        await db.execute(`
            INSERT INTO reviews (user_id, product_id, order_id, rating, comment)
            VALUES (?, ?, ?, ?, ?)
        `, [userId, productId, orderId, rating, comment]);

        res.status(201).json({ message: 'Review submitted successfully.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

checkReviewExists = async (req, res) => {
    const { orderId, productId } = req.query;

    try {
        const [result] = await db.execute(
            `SELECT * FROM reviews WHERE order_id = ? AND product_id = ?`,
            [orderId, productId]
        );

        if (result.length > 0) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (err) {
        console.error("Error checking review:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    addReview,
    checkReviewExists
}
