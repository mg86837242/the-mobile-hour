import express from 'express';
import { getAllOrderWithDetails, createOrder } from '../models/orders.js';

const ordersController = express.Router();

// View Order
ordersController.get('/all_with_details', (request, response) => {
  getAllOrderWithDetails()
    .then(([results]) => {
      response.status(200).json(results);
    })
    .catch(error => {
      response.status(500).json('Failed to get all orders with details');
      console.log(error);
    });
});

// Create Order
ordersController.post('/create', (request, response) => {
  let order = request.body;

  createOrder(order.product_id, order.customer_id)
    .then(([results]) => {
      response.status(200).json({ status: 'order created', order_id: results.insertId });
    })
    .catch(error => {
      response.status(500).json('failed to create order');
      console.log(error);
    });
});

// Export fallback with export default: Usually you will use this syntax if only one value is being exported from a file. It is also used to create a fallback value for a file or module.
export default ordersController;
