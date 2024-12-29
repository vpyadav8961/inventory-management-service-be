const User = require('./User.js');
const Product = require('./Product.js');
const Order = require('./Order.js');
const OrderItem = require('./OrderItem.js');
const StockMovement = require('./StockMovement.js');

// Define relationships
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(StockMovement, { foreignKey: 'productId' });
StockMovement.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
  StockMovement
};