const pool = require("../config/db");

// Get all books
const getAllBooks = async () => {
  const result = await pool.query("SELECT * FROM books ORDER BY id");
  return result.rows;
};

// Get book by ID
const getBookById = async (id) => {
  const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new book
const createBook = async (title, author, genre, publication_year) => {
  const result = await pool.query(
    "INSERT INTO books (title, author, genre, publication_year) VALUES ($1,$2,$3,$4) RETURNING *",
    [title, author, genre, publication_year]
  );
  return result.rows[0];
};

// Update book
const updateBook = async (id, title, author, genre, publication_year) => {
  const result = await pool.query(
    "UPDATE books SET title=$1, author=$2, genre=$3, publication_year=$4 WHERE id=$5 RETURNING *",
    [title, author, genre, publication_year, id]
  );
  return result.rows[0];
};

// Delete book
const deleteBook = async (id) => {
  await pool.query("DELETE FROM books WHERE id=$1", [id]);
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
