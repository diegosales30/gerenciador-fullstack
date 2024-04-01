import mysql from 'mysql';

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1991",
  database: "gerenciador",
});

connection.connect();

export default connection;