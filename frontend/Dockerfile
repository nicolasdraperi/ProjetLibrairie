### Dockerfile pour le frontend (React + Vite + Bootstrap)
# Étape 1 : Construction du projet avec Node.js
FROM node:18-alpine AS builder

# Définition du répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm ci

# Copier le reste du projet
COPY . .

# Build du projet React avec Vite
RUN npm run build

# Étape 2 : Utilisation de Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Suppression de la configuration par défaut de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Ajout de notre propre configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers build de React dans le serveur Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
