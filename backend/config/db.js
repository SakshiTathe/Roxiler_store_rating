const mysql = require("mysql2/promise")
const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

/* mysqlPool.query("SELECT 1")
    .then(() => console.log("MySQL is connected"))
    .catch((err) => console.error("DB connection failed:", err)); */

module.exports = mysqlPool

/* Promise client → use .then() / await.

Callback client → pass a callback. */