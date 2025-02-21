# Utiliser une image Node.js légère
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Copier le reste des fichiers du backend
COPY . .

# Exposer le port utilisé par le serveur Express
EXPOSE 5000

# Démarrer le serveur
CMD ["node", "server.js"]

