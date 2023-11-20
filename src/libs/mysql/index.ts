const mysql = require("mysql2/promise");

export default await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cornelius_store"
});