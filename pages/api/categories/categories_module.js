const mysql = require('mysql2/promise');

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

async function getAllCategories() {
  let conn = await dbConnection;
  try {
    const [rows] = await conn.execute('SELECT * FROM `categories` ORDER BY `id` ASC');
    return rows;
  } catch (error) {
    console.error('Error reading categories:', error);
    throw error;
  }
}

async function getCategory(id) {
  try {
    let conn = await dbConnection;
    const [rows] = await conn.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error reading category:', error);
    throw error;
  }
}

async function addCategory(categoryData) {
  try {
    let conn = await dbConnection;
    const { name } = categoryData;
    const query = 'INSERT INTO categories (name) VALUES (?)';
    const [result] = await conn.execute(query, [name]);

    if (result.affectedRows === 1) {
      console.log(`Category "${name}" added successfully!`);
      return categoryData;
    } else {
      console.error(`Error adding category "${name}"`);
      return null;
    }
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
}

async function updateCategory(id, categoryData) {
  try {
    let conn = await dbConnection;
    const { name } = categoryData;
    const query = 'UPDATE categories SET name = ? WHERE id = ?';
    const [result] = await conn.execute(query, [name, id]);
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

async function deleteCategory(id) {
  try {
    let conn = await dbConnection;
    const [rows] = await conn.execute('DELETE FROM categories WHERE id = ?', [id]);
    return rows;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  createDatabaseConnection,
};
