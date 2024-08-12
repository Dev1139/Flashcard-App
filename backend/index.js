const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// API Endpoints

// Get all flashcards
app.get("/api/flashcards", (req, res) => {
  const sql = "SELECT * FROM flashcards";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get a single flashcard by ID
app.get("/api/flashcards/:id", (req, res) => {
  const sql = "SELECT * FROM flashcards WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Create a new flashcard
app.post("/api/flashcards", (req, res) => {
  const { question, answer } = req.body;
  const sql = "INSERT INTO flashcards (question, answer) VALUES (?, ?)";
  db.query(sql, [question, answer], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, question, answer });
  });
});

// Update an existing flashcard
app.put("/api/flashcards/:id", (req, res) => {
  const { question, answer } = req.body;
  const sql = "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [question, answer, id], (err, result) => {
    if (err) throw err;
    res.json({ id, question, answer });
  });
});

// Delete a flashcard
app.delete("/api/flashcards/:id", (req, res) => {
  const sql = "DELETE FROM flashcards WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Flashcard deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
