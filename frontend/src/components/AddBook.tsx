import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/books";

const AddBook = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ titre: "", auteur: "", ISBN: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addBook = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, formData);
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Ajouter un Livre</h2>
                        <form onSubmit={addBook}>
                            <div className="mb-3">
                                <label className="form-label">Titre</label>
                                <input
                                    type="text"
                                    name="titre"
                                    className="form-control"
                                    value={formData.titre}
                                    onChange={handleChange}
                                    placeholder="Titre du livre"
                                    required
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
                                    required
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
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Ajouter
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
