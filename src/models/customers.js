import pool from '../database.js';

// View Customer
export function getAllCustomers() {
  return pool.query('SELECT * FROM customers');
}

export function getCustomerById(customer_id) {
  return pool.query('SELECT * FROM customers WHERE customer_id = ?', [customer_id]);
}

// Create Customer
export function createCustomer(firstname, lastname, phone, email, street, postcode, city, state) {
  return pool.query(
    'INSERT INTO customers (firstname, lastname, phone, email, street, postcode, city, state)' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [firstname, lastname, phone, email, street, postcode, city, state],
  );
}

// Update Customer
export function updateCustomerById(customer_id, firstname, lastname, phone, email, street, postcode, city, state) {
  return pool.query(
    'UPDATE customers ' +
      'SET firstname = ?, lastname = ?, phone = ?, email = ?, street = ?, postcode = ?, city = ?, state = ?' +
      'WHERE customer_id = ?',
    [firstname, lastname, phone, email, street, postcode, city, state, customer_id],
  );
}

// Delete Customer
export function deleteCustomerById(customer_id) {
  return pool.query('DELETE FROM customers WHERE customer_id = ?', [customer_id]);
}
