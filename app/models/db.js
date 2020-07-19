const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {

    if (error) throw error;
    console.log("Successfully connected to the database.");
});

var sql = "CREATE TABLE IF NOT EXISTS emails (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255))";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

module.exports = connection;