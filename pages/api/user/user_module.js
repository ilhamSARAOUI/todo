const mysql = require('mysql2/promise');
const CryptoJS = require("crypto-js");


const dbConnection = createDatabaseConnection();

async function createDatabaseConnection() {
  try {
    return await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'todo', 
      connectionLimit: 10,
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

async function getAllUsers() {
  let conn = await dbConnection;
  try {
    const [rows] = await conn.execute('SELECT * FROM `users` ORDER BY `id` ASC');
    return rows;
  } catch (error) {
    console.error('Error reading users:', error);
    throw error;
  }
}

async function getUser(id) {
  try {
    let conn = await dbConnection;
    const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error reading user:', error);
    throw error;
  }
}
async function addUser(userData) {
  try {
    let conn = await dbConnection;
    const { firstName, lastName, email, phoneNumber, password } = userData;

    const [existingUsers] = await conn.execute('SELECT * FROM `users` WHERE `email` = ?', [email]);

    if (existingUsers.length > 0) {
      return { error: 'Email already used' };
    }

    const query = 'INSERT INTO users (firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)';
    const [result] = await conn.execute(query, [firstName, lastName, email, phoneNumber, password]);

    if (result.affectedRows === 1) {
      console.log(`User "${firstName} ${lastName}" added successfully!`);
      return { success: true };
    } else {
      console.error(`Error adding user "${firstName} ${lastName}"`);
      return { error: 'Failed to add user' };
    }
  } catch (error) {
    console.error('Error adding user:', error);
    return { error: 'An error occurred while adding the user' };
  }
}


async function updateUser(id, userData) {
  try {
    let conn = await dbConnection;
    const { firstName, lastName, email, phoneNumber } = userData;
    const query = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, phoneNumber = ? WHERE id = ?';
    const [result] = await conn.execute(query, [firstName, lastName, email, phoneNumber, id]);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    let conn = await dbConnection;
    const [rows] = await conn.execute('DELETE FROM users WHERE id = ?', [id]);
    return rows;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
async function login(email, password) {
  try {
    let conn = await dbConnection;
    const [users] = await conn.execute('SELECT * FROM `users` WHERE `email` = ?', [email]);

    if (users.length === 1) {
      const user = users[0];
      const hashedPassword = CryptoJS.SHA256(password).toString();

      if (user.password === hashedPassword) {
        // Successfully logged in
        return { success: true, user };
      }
    }

    // Login failed
    return { error: 'Invalid credentials' };
  } catch (error) {
    console.error('Error logging in user:', error);
    return { error: 'An error occurred while logging in' };
  }
}

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  login, 
  createDatabaseConnection,
};