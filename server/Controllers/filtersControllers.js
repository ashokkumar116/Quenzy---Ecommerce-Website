const db = require('../db');



const getFilters = async(req,res)=>{
    const [categories] = await db.query('SELECT * FROM categories');
    const [brands] = await db.query('SELECT * FROM brands');
    const [priceRange] = await db.query("SELECT MIN(price) AS minPrice, MAX(price) AS maxPrice FROM products");

    const filters = {
        categories:categories.map(category => ({
            id: category.id,
            name: category.name,
        })),
        brands:brands.map(brand => ({
            id: brand.id,
            name: brand.name,
        })),
        priceRange: {
            min: priceRange[0].minPrice,
            max: priceRange[0].maxPrice,
        },

    };

    return res.status(200).json(filters);

}


module.exports = {
    getFilters,
}