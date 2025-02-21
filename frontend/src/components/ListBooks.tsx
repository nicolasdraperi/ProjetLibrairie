import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <div>
            <h1>Liste des Livres</h1>
            <table border={1}>
                <thead>
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
                            <button onClick={() => startEditing(book)}>Modifier</button>
                            <button onClick={() => deleteBook(book._id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingBook && (
                <div>
                    <h2>Modifier le livre</h2>
                    <input type="text" name="titre" value={formData.titre} onChange={handleChange} placeholder="Titre" />
                    <input type="text" name="auteur" value={formData.auteur} onChange={handleChange} placeholder="Auteur" />
                    <input type="text" name="ISBN" value={formData.ISBN} onChange={handleChange} placeholder="ISBN" />
                    <button onClick={updateBook}>Enregistrer</button>
                    <button onClick={() => setEditingBook(null)}>Annuler</button>
                </div>
            )}
        </div>
    );
};

export default Home;
