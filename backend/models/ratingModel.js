// models/user.js or a migration script
const mysqlPool = require("../config/db"); // Assuming db.js contains your connection

const createRatingTable = async() => {
    const createTableSql = `
        CREATE TABLE IF NOT EXISTS rating (
        rating_id INT AUTO_INCREMENT PRIMARY KEY,
        store_id INT,
        user_id INT,
        rating_value INT,
        FOREIGN KEY (store_id) REFERENCES stores(store_id),
        FOREIGN KEY (user_id) REFERENCES user(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CHECK (rating_value >=1 AND rating_value <=5)
        );`;

    try {
        await mysqlPool.query(createTableSql);
        console.log("Users table created or already exists.");
    } catch (err) {
        console.error("Error creating users table:", err);
    }
};

module.exports = createRatingTable;
