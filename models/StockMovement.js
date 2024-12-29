const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product.js');

const StockMovement = sequelize.define('StockMovement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
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
  quantityChange: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'quantity_change'
  },
  movementType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'movement_type',
    validate: {
      isIn: [['order', 'adjustment', 'return']]
    }
  },
  referenceId: {
    type: DataTypes.UUID,
    field: 'reference_id'
  }
}, {
  tableName: 'stock_movements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

StockMovement.belongsTo(Product, { foreignKey: 'productId' });

module.exports = StockMovement;