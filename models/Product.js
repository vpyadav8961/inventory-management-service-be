const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  valueCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'INR',
    field: 'value_currency',
    after: 'price'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productImageLink: {
    type: DataTypes.STRING,
    field: 'product_image_link',
    after: 'category'
  },
  productLink: {
    type: DataTypes.STRING,
    field: 'product_link',
    after: 'productImageLink'
  },
  status:{
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
    before: 'lowStockThreshold'
  },
  lowStockThreshold: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    field: 'low_stock_threshold'
  }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Product;