const Product = require('../models/Product');
const { Op } = require('sequelize');

class ProductController {
    async createProduct(req, res) {
        const products = req.body.products;
        try {
            const newProducts = await Product.bulkCreate(products);
            res.status(201).json({
                message: 'Product created successfully',
                product: newProducts
            });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Failed to create product' });
        }
    }

}

module.exports = { ProductController };