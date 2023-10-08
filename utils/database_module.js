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

async function execute(query, values = []) {
    try {
        const conn = await dbConnection;
        const [result] = await conn.execute(query, values);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

export async function SELECT(tableName, columns, conditions) {
    try {
        const columnNames = columns.join(', ');
        let whereConditions = ''
        if (conditions != null) {
            whereConditions = conditions.map(condition => {
                return `WHERE ${condition.column} ${condition.operator} ?`;
            }).join(' AND ');
        }
        const values = conditions?.map(condition => condition.value);

        const query = `SELECT ${columnNames} FROM ${tableName}  ${whereConditions}`;
        const rows = await execute(query, values);
        return rows;
    } catch (error) {
        console.error('Error reading data:', error);
        throw error;
    }
}

export async function INSERT(tableName, data) {
    try {

        const columnNames = Object.keys(data).join(', ');
        const placeholders = Object.values(data).map(() => '?').join(', ');

        const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${placeholders})`;
        const values = Object.values(data);

        const result = await execute(query, values);
        if (result.affectedRows === 1) {
            console.log('Data inserted successfullyy');
            return SELECT(tableName, ['*'], []);
        } else {
            console.error('Error adding data');
            return null;
        }
    } catch (error) {
        console.error('Error adding data:', error);
        throw error;
    }
}

export async function DELETE(tableName, conditions) {
    try {
        const whereConditions = conditions.map(condition => {
            return `${condition.column} ${condition.operator} ?`;
        }).join(' AND ');

        const query = `DELETE FROM ${tableName} WHERE ${whereConditions}`;

        const values = conditions.map(condition => condition.value);

        const result = await execute(query, values);
        if (result.affectedRows > 0) {
            console.log('Data deleted successfully!');
            return SELECT(tableName, ['*'], []);
        } else {
            console.error('Error deleting data');
            return null;
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

export async function UPDATE(tableName, data, conditions) {
    try {
        const setColumns = Object.keys(data).map(column => {
            return `${column} = ?`;
        }).join(', ');

        const whereConditions = conditions.map(condition => {
            return `${condition.column} ${condition.operator} ?`;
        }).join(' AND ');
        // UPDATE(tableName, data, conditions)
        const query = `UPDATE ${tableName} SET ${setColumns} WHERE ${whereConditions}`;

        const values = [...Object.values(data), ...conditions.map(condition => condition.value)];

        const result = await execute(query, values);
        if (result.affectedRows === 1) {
            console.log('Data updated successfully!');
            return SELECT(tableName, ['*'], []);
        } else {
            console.error('Error updating data');
            return null;
        }
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

