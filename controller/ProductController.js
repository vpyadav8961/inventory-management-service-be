const Product = require('../models/Product');
const { Op } = require('sequelize');

class ProductController {
    async createProduct(req, res) {
        const { name, sku, description, price, quantity, category, productImageLink, productLink} = req.body;
        try {
            const newProduct = await Product.create({ name, sku, description, price, quantity, category, productImageLink, productLink });
            res.status(201).json({
                message: 'Product created successfully',
                product: {
                    id: newProduct.id,
                    name: newProduct.name,
                    sku: newProduct.sku,
                    description: newProduct.description,
                    price: newProduct.price,
                    quantity: newProduct.quantity,
                    category: newProduct.category,
                    productImageLink: newProduct.productImageLink,
                    productLink: newProduct.productLink
                }
            });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Failed to create product' });
        }
    }

}

module.exports = { ProductController };