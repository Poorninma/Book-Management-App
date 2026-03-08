"use client";

import { useEffect, useState } from "react";

export default function BooksPage() {

  const [books, setBooks] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const fetchBooks = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const res = await fetch("http://localhost:5000/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:5000/books/${editId}`
      : "http://localhost:5000/books";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        author,
        genre,
        publication_year: year,
      }),
    });

    setTitle("");
    setAuthor("");
    setGenre("");
    setYear("");
    setEditId(null);

    fetchBooks();
  };

  const deleteBook = async (id: number) => {

    await fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBooks();
  };

  const editBook = (book: any) => {

    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setYear(book.publication_year);

    setEditId(book.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Book Manager
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Form Card */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-lg">

        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Update Book" : "Add Book"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Author"
            className="w-full p-2 border rounded"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <input
            placeholder="Genre"
            className="w-full p-2 border rounded"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <input
            placeholder="Publication Year"
            className="w-full p-2 border rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {editId ? "Update Book" : "Add Book"}
          </button>

        </form>

      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {books.map((book) => (

          <div
            key={book.id}
            className="bg-white p-5 rounded-lg shadow"
          >

            <h3 className="text-lg font-bold mb-2">
              {book.title}
            </h3>

            <p className="text-gray-600">
              Author: {book.author}
            </p>

            <p className="text-gray-600">
              Genre: {book.genre}
            </p>

            <p className="text-gray-600 mb-3">
              Year: {book.publication_year}
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => editBook(book)}
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>

              <button
                onClick={() => deleteBook(book.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}