const mysql = require('mysql2/promise');

// Create a connection pool with your database credentials
const pool = mysql.createPool({
  host: '34.89.82.183', // Replace with your VM's internal IP address
  user: 'username',
  password: 'password',
  database: 'testing',
  connectTimeout: 10000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
