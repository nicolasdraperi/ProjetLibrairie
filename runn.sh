#!/bin/sh

# Arrêter et supprimer les anciens conteneurs s'ils existent
docker stop db-container backend-app frontend-app 2>/dev/null || true
docker rm db-container backend-app frontend-app 2>/dev/null || true

# Supprimer l'ancien réseau et volume s'ils existent
docker network rm app-network 2>/dev/null || true
docker volume rm mongo_data 2>/dev/null || true

# Créer un réseau Docker pour connecter les services
docker network create app-network

# Démarrer MongoDB avec un volume persistant
docker run -d \
  --name db-container \
  --network app-network \
  --network-alias db \
  -v mongo_data:/data/db \
  mongo

# Construire l’image du backend (avec le bon contexte)
docker build -t backend-app -f backend/Dockerfile backend/

# Démarrer le backend en tant que conteneur
docker run -d \
  --name backend-app \
  --network app-network \
  -p 5000:5000 \
  -e MONGO_URI="mongodb://db:27017/monprojet" \
  backend-app

# Construire l’image du frontend (avec le bon contexte)
docker build -t frontend-app -f frontend/Dockerfile frontend/

# Démarrer le frontend en tant que conteneur
docker run -d \
  --name frontend-app \
  --network app-network \
  -p 3000:80 \
  -e REACT_APP_API_URL="http://backend-app:5000" \
  frontend-app

# Afficher les URLs après le lancement
echo "🚀 Backend accessible sur http://localhost:5000"
echo "🎨 Frontend accessible sur http://localhost:3000"

