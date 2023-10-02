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

async function getAllTasks(id) {
  let conn = await dbConnection;
  try {
    const [rows] = await conn.execute('SELECT * FROM `tasks` WHERE user_id = ? ORDER BY `id` ASC',[id]);
    return rows;
  } catch (error) {
    console.error('Error reading data:', error);
    throw error;
  }
}

async function getTask(id) {
  try {
    let conn = await dbConnection;
    const [rows] = await conn.execute(`SELECT * FROM tasks WHERE id = ?`, [id]);
    return rows[0];
  } catch (error) {
    console.error('Error reading data:', error);
    throw error;
  }
}



async function addTask(taskData) {
  try {
    let conn = await dbConnection;
    const {
      name,
      category_id,
      dueDate,
      time,
      state,
      user_id
    } = taskData;
    const query = `
      INSERT INTO tasks (name, category_id, dueDate, time, state,user_id)
      VALUES (?, ?, ?, ?, ?,?)
    `;
    const [result] = await conn.execute(query, [name, category_id, dueDate, time, state, user_id]);

    if (result.affectedRows === 1) {
      console.log(`Task "${name}" added successfully!`);
      return result.insertId;
    } else {
      console.error(`Error adding task "${name}"`);
      return null;
    }
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

async function updateTask(id, taskData) {
  try {
    let conn = await dbConnection;
    const {
      name,
      category_id,
      dueDate,
      time,
      state,
      user_id
    } = taskData;
    const query = `
      UPDATE tasks SET name = ?, category_id = ?, dueDate = ?, time = ?, state = ?, user_id = ?
      WHERE id = ?
    `;
    const [result] = await conn.execute(query, [name, category_id, dueDate, time, state, user_id, id]);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}


async function deleteTask(id) {
  try {
    let conn = await dbConnection;
    const [rows] = await conn.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return rows;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}


module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  createDatabaseConnection,
 
};