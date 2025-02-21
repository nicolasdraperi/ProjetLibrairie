import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur de connexion MongoDB :', err));

const PORT = process.env.PORT || 5000;
app.use('/api', bookRoutes);

app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
