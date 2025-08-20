// models/user.js or a migration script
const mysqlPool = require("../config/db")

const UsersTab = async () => {
    const createTableSql = `
        CREATE TABLE IF NOT EXISTS user (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(400) NOT NULL,
        role ENUM('admin', 'normal_user') NOT NULL DEFAULT 'normal_user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
    try {
        await mysqlPool.query(createTableSql);
        console.log("Users table created or already exists.");
    } catch (err) {
        console.error("Error creating users table:", err);
    }
};

module.exports = UsersTab;
