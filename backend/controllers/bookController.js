const Book = require("../models/bookModel");

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error(error);   // 👈 ADD THIS
    res.status(500).json({ message: "Error fetching books" });
  }
};

// Get book by ID
const getBook = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

// Create book
const createBook = async (req, res) => {
  try {
    const { title, author, genre, publication_year } = req.body;

    const book = await Book.createBook(
      title,
      author,
      genre,
      publication_year
    );

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error creating book" });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const { title, author, genre, publication_year } = req.body;

    const book = await Book.updateBook(
      req.params.id,
      title,
      author,
      genre,
      publication_year
    );

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    await Book.deleteBook(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};