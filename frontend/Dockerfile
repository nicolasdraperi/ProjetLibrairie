# Utiliser une image Node.js légère pour la build
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers du frontend
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser une image nginx pour servir l'application
FROM nginx:alpine

# Copier le build du frontend dans nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 3000
EXPOSE 3000

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
