import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        trim: true
    },
    auteur: {
        type: String,
        required: true,
        trim: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
