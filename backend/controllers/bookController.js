import Book from '../models/book.js';
import mongoose from 'mongoose';

// récupérer tous les livres
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// récupérer un livre par ID avec validation
export const getBookById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID invalide' });
    }

    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// ajouter un nouveau livre avec validation
export const createBook = async (req, res) => {
    const { titre, auteur, ISBN } = req.body;
    if (!titre || !auteur || !ISBN) {
        return res.status(400).json({ message: 'Tous les champs (titre, auteur, ISBN) sont obligatoires' });
    }

    try {
        const newBook = new Book({ titre, auteur, ISBN });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// mettre à jour un livre existant avec validation
export const updateBook = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID invalide' });
    }

    const { titre, auteur, ISBN } = req.body;
    if (!titre || !auteur || !ISBN) {
        return res.status(400).json({ message: 'Tous les champs (titre, auteur, ISBN) sont obligatoires' });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id,
            { titre, auteur, ISBN },
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// supprimer un livre avec validation
export const deleteBook = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID invalide' });
    }

    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json({ message: 'Livre supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// vérifier le statut du serveur
export const getStatus = (req, res) => {
    res.status(200).json({ message: "Serveur opérationnel" });
};
