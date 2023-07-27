import pool from '../database.js';

// View Product
export function getAllProducts() {
  return pool.query('SELECT * FROM products');
}

export function getProductById(product_id) {
  return pool.query('SELECT * FROM products WHERE product_id = ?', [product_id]);
}

export function getProductsBySearch(search_term) {
  // This line adds % to both sides of the search_term and stores it back into the same variable
  // search_term = "%" + search_term + "%"
  // OR use the string interpolation as follows (both give the same result)
  search_term = `%${search_term}%`;

  return pool.query(
    'SELECT * FROM products WHERE product_name LIKE ? ' + 'OR product_model LIKE ? ' + 'OR manufacturer LIKE ?',
    [search_term, search_term, search_term],
  );
}

// Create Product
export function createProduct(product_name, product_model, manufacturer, price, stock_on_hand, feature_id) {
  return pool.query(
    'INSERT INTO products (product_name, product_model, manufacturer, price, stock_on_hand, feature_id) ' +
      'VALUES (?, ?, ?, ?, ?, ?)',
    [product_name, product_model, manufacturer, price, stock_on_hand, feature_id],
  );
}

// Update Product
export function updateProductById(
  product_id,
  product_name,
  product_model,
  manufacturer,
  price,
  stock_on_hand,
  feature_id,
) {
  return pool.query(
    'UPDATE products ' +
      'SET product_name = ?, product_model = ?, manufacturer = ?, price = ?, stock_on_hand = ?, feature_id = ?' +
      'WHERE product_id = ?',
    [product_name, product_model, manufacturer, price, stock_on_hand, feature_id, product_id],
  );
}

// Delete Product
export function deleteProductById(product_id) {
  return pool.query('DELETE FROM products WHERE product_id = ?', [product_id]);
}
