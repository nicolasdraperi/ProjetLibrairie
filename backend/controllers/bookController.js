import Book from '../models/book.js';

//recuperer tous les livres
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

//recuperer un livre par ID
export const getBookById = async (req, res) => {
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

//ajouter un nouveau livre
export const createBook = async (req, res) => {
    try {
        const { titre, auteur, ISBN } = req.body;
        const newBook = new Book({ titre, auteur, ISBN });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

//mettre à jour un livre existant
export const updateBook = async (req, res) => {
    try {
        const { titre, auteur, ISBN } = req.body;
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

//supprimer un livre
export const deleteBook = async (req, res) => {
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

//verifier le statut du serveur
export const getStatus = (req, res) => {
    res.status(200).json({ message: "Serveur opérationnel" });
};
