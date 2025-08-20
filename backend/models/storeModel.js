// models/user.js or a migration script
const mysqlPool = require("../config/db"); // Assuming db.js contains your connection

const createStoreTable = async() => {
    const createTableSql = `
        CREATE TABLE IF NOT EXISTS stores (
        store_id INT AUTO_INCREMENT PRIMARY KEY,
        store_name VARCHAR(60) NOT NULL,
        address VARCHAR(400) NOT NULL,
        owner_id INT ,
        FOREIGN KEY (owner_id) REFERENCES user(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
    try {
        await mysqlPool.query(createTableSql);
        console.log("Users table created or already exists.");
    } catch (err) {
        console.error("Error creating users table:", err);
    }
};

module.exports = createStoreTable ;
