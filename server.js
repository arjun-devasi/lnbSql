const express = require("express");
const mysql = require("mysql2");
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin2609",
  database: "ecommerce_db",
});
db.connect((err) => {
  if (err) {
    console.log("error in the database connection", err);
    return;
  }
  console.log("database is connected");
});

app.get("/", (req, res) => {
  return res.json("hii this home page");
});
// user create

app.post("/users", (req, res) => {
  const { name, email, phone_number, address } = req.body;
  const query =
    "INSERT INTO coustomers (name, email, phone_number, address) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, phone_number, address], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res
      .status(201)
      .json({ message: "User created successfully", userId: result.insertId });
  });
});
// read
app.get("/users", (req, res) => {
  const query = "SELECT * FROM coustomers";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(results);
  });
});

// update user
app.put("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;
  const query = "UPDATE coustomers SET name = ? WHERE coustmer_id = ?";
  db.query(query, [name, userId], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  });
});
// delete  user
app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "DELETE FROM coustomers WHERE coustmer_id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  });
});

app.listen(8000, () => {
  console.log("server is runing..");
});
