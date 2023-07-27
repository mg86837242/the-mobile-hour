import pool from '../database.js';

// View Order
export function getAllOrderWithDetails() {
  return pool.query(`
    SELECT *
    FROM orders
    INNER JOIN products ON orders.product_id = products.product_id
    INNER JOIN customers ON orders.customer_id = customers.customer_id
    `);
}

// Create Order
export function createOrder(product_id, customer_id) {
  return pool.query('INSERT INTO orders (product_id, customer_id, order_date)' + 'VALUES (?, ?, ?)', [
    product_id,
    customer_id,
    new Date().toISOString().slice(0, 19).replace('T', ' '),
  ]);
}
