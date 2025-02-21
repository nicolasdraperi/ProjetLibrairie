#!/bin/sh

docker stop db-container backend-app frontend-app 2>/dev/null || true
docker rm db-container backend-app frontend-app 2>/dev/null || true

docker network rm app-network 2>/dev/null || true
docker volume rm mongo_data 2>/dev/null || true

docker network create app-network

docker run -d \
  --name db-container \
  --network app-network \
  --network-alias db \
  -v mongo_data:/data/db \
  mongo

docker build -t backend-app -f backend/Dockerfile backend/

docker run -d \
  --name backend-app \
  --network app-network \
  -p 5000:5000 \
  -e MONGO_URI="mongodb://db:27017/monprojet" \
  backend-app


docker build -t frontend-app -f frontend/Dockerfile frontend/

docker run -d \
  --name frontend-app \
  --network app-network \
  -p 3000:80 \
  -e REACT_APP_API_URL="http://backend-app:5000" \
  frontend-app

echo "🚀 Backend accessible sur http://localhost:5000"
echo "🎨 Frontend accessible sur http://localhost:3000"

