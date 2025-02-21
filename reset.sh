#!/bin/sh

docker stop db-container express-app react-app 2>/dev/null || true
docker rm db-container express-app react-app 2>/dev/null || true

docker network rm backend-test-network 2>/dev/null || true

docker volume rm mongo_data 2>/dev/null || true
