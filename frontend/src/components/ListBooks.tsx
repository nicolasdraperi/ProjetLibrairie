import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Book {
    _id: string;
    titre: string;
    auteur: string;
    ISBN: string;
}

const API_URL = "http://localhost:5000/api/books";

const Home = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [formData, setFormData] = useState({ titre: "", auteur: "", ISBN: "" });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(API_URL);
            setBooks(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des livres", error);
        }
    };

    const deleteBook = async (id: string) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            setBooks(books.filter((book) => book._id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression du livre", error);
        }
    };

    const startEditing = (book: Book) => {
        setEditingBook(book);
        setFormData({ titre: book.titre, auteur: book.auteur, ISBN: book.ISBN });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateBook = async () => {
        if (!editingBook) return;

        try {
            const response = await axios.put(`${API_URL}/${editingBook._id}`, formData);
            setBooks(books.map((book) => (book._id === editingBook._id ? response.data : book)));
            setEditingBook(null);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du livre", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="fw-bold">📚 Liste des Livres</h1>
            </div>

            <div className="d-flex justify-content-center mb-4">
                <Link to="/add" className="btn btn-success btn-lg">➕ Ajouter un Livre</Link>
            </div>

            <div className="d-flex justify-content-center">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered shadow-lg rounded text-center">
                        <thead className="table-dark">
                        <tr>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>ISBN</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td>{book.titre}</td>
                                <td>{book.auteur}</td>
                                <td>{book.ISBN}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => startEditing(book)}>✏️ Modifier</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteBook(book._id)}>🗑️ Supprimer</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editingBook && (
                <div className="d-flex justify-content-center mt-4">
                    <div className="card shadow-lg p-4 w-50">
                        <h2 className="text-center">✏️ Modifier le Livre</h2>
                        <div className="mb-3">
                            <label className="form-label">Titre</label>
                            <input
                                type="text"
                                name="titre"
                                className="form-control"
                                value={formData.titre}
                                onChange={handleChange}
                                placeholder="Titre du livre"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Auteur</label>
                            <input
                                type="text"
                                name="auteur"
                                className="form-control"
                                value={formData.auteur}
                                onChange={handleChange}
                                placeholder="Nom de l'auteur"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">ISBN</label>
                            <input
                                type="text"
                                name="ISBN"
                                className="form-control"
                                value={formData.ISBN}
                                onChange={handleChange}
                                placeholder="Numéro ISBN"
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" onClick={updateBook}>✅ Enregistrer</button>
                            <button className="btn btn-secondary" onClick={() => setEditingBook(null)}>❌ Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
