import pool from '../database.js';

// View User
export function getAllUsers() {
  return pool.query('SELECT * FROM users');
}

export function getUserById(user_id) {
  return pool.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
}

export function getUserByUsername(username) {
  return pool.query('SELECT * FROM users WHERE username = ?', [username]);
}

// Create User
export function createUser(firstname, lastname, role, username, password) {
  return pool.query('INSERT INTO users (firstname, lastname, role, username, password)' + 'VALUES (?, ?, ?, ?, ?)', [
    firstname,
    lastname,
    role,
    username,
    password,
  ]);
}

// Update User
export function updateUserById(user_id, firstname, lastname, role, username, password) {
  return pool.query(
    'UPDATE users ' + 'SET firstname = ?, lastname = ?, role = ?, username = ?, password = ?' + 'WHERE user_id = ?',
    [firstname, lastname, role, username, password, user_id],
  );
}

// Delete User
export function deleteUserById(user_id) {
  return pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
}
