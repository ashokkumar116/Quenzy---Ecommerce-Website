const db = require('../db');

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const [cart] = await db.query(`
        SELECT 
        cart_items.product_id AS id,
        cart_items.quantity,
        products.name,
        products.price,
        products.discount_percentage,
        product_images.image_url
      FROM cart_items
      JOIN products ON cart_items.product_id = products.id
      LEFT JOIN product_images ON products.id = product_images.product_id
      WHERE cart_items.user_id = ?
      GROUP BY cart_items.product_id      
`, [userId]);

        res.status(200).json({
            cart:cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch cart' });
    }
}

const addToCart = async(req,res)=>{

    const userId = req.user.id;
    const cartItems = req.body.cart;
    console.log(cartItems);

  try {
    await db.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);

    for (let item of cartItems) {
      await db.query(
        "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [userId, item.id, item.quantity]
      );
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to sync cart" });
  }
}


const removeFromCart = async(req,res)=>{
    const userId = req.user.id;
    const productId = req.params.id;
    await db.query('DELETE FROM cart_items WHERE user_id = ? AND product_id = ?', [userId, productId]);
    res.json({ message: "Item removed" });
}


const clearCart = async(req,res)=>{
    const userId = req.user.id;
    await db.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);
    res.json({ message: "Cart cleared" });
}



module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
}