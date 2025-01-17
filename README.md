# inventory-management-service-be
web-application for inventry management service to automate inventory tracking and order management , used vue.js in frontend and express.js for backend

# Inventory Management System

A robust Node.js-based inventory management system with real-time stock tracking, order management, and reporting capabilities.

## Features

- **Product Management**
  - Create, update, and delete products
  - Track stock levels
  - Set low stock thresholds
  - Bulk product import via CSV

- **Order Management**
  - Process customer and supplier orders
  - Real-time stock updates
  - Order status tracking
  - Automated stock level checks

- **Reporting**
  - Inventory reports
  - Sales reports
  - Low stock alerts
  - Export to CSV and PDF

- **User Management**
  - Role-based access control
  - Staff and admin roles
  - Secure authentication

## Tech Stack

- Node.js & Express
- Supabase (PostgreSQL)
- Socket.IO for real-time updates
- JWT Authentication
- PDF and CSV export capabilities

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Supabase account

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/inventory_management
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd inventory-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npm run db:setup
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/bulk-upload` - Bulk import products

### Orders
- `GET /api/orders` - List all orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### Stock
- `GET /api/stock/low-stock` - Get low stock products
- `POST /api/stock/adjust/:id` - Adjust stock level
- `GET /api/stock/movements` - Get stock movement history

### Reports
- `GET /api/reports/inventory` - Generate inventory report
- `GET /api/reports/sales` - Generate sales report
- `GET /api/reports/low-stock` - Generate low stock report

## Testing

Run the test suite:
```bash
npm test
```

Generate coverage report:
```bash
npm run test:coverage
```

## Real-time Features

The system uses Socket.IO for real-time updates:
- Low stock alerts
- Order status changes
- Stock level updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License