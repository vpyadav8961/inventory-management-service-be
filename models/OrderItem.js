const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Order = require('./Order.js');
const Product = require('./Product.js');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'order_id',
    references: {
      model: Order,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'product_id',
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  priceAtTime: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'price_at_time'
  }
}, {
  tableName: 'order_items',
  timestamps: false
});

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = OrderItem;