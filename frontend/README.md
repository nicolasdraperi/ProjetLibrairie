# Application CRUD pour Librairie

## Objectif
API RESTful pour gérer une librairie avec une architecture MVC. Permet la gestion des livres avec des fonctionnalités CRUD.

---

## Fonctionnalités
- **Livres** : créer, lister, récupérer par ID, mettre à jour, supprimer
- **Statut du serveur** : Vérifier la connexion avec la base de données

---

## Spécifications
### Modèle de données
#### Book
- **titre** : `String` (requis)
- **auteur** : `String` (requis)
- **ISBN** : `String` (requis, unique)
- **createdAt** : `Date` (ajout automatique)
- **updatedAt** : `Date` (modification automatique)

### Contrôleurs
#### Book Controller
- `createBook` : Créer un nouveau livre
- `getAllBooks` : Récupérer tous les livres
- `getBookById` : Récupérer un livre par ID
- `updateBook` : Mettre à jour un livre
- `deleteBook` : Supprimer un livre

### Routes API
| Action                     | Méthode | Endpoint          | Description                             |
|----------------------------|---------|-------------------|-----------------------------------------|
| **Créer un livre**         | `POST`  | `/api/books`      | Ajoute un nouveau livre                |
| **Lister les livres**      | `GET`   | `/api/books`      | Récupère tous les livres               |
| **Récupérer un livre**     | `GET`   | `/api/books/:id`  | Récupère un livre par ID               |
| **Mettre à jour un livre** | `PUT`   | `/api/books/:id`  | Met à jour un livre                    |
| **Supprimer un livre**     | `DELETE`| `/api/books/:id`  | Supprime un livre                      |
| **Vérifier le statut serveur** | `GET` | `/status`       | Vérifie la connexion à la base de données |

---

## Configuration & Lancement
### Via Docker
1. **Lancer Docker**
2. **Dans le dossier du projet, exécuter** :  
    ```bash
    ./runn.sh
    ```
    - Le backend est accessible sur : **[http://localhost:5000](http://localhost:5000)**
    - Le frontend est accessible sur : **[http://localhost:3000](http://localhost:3000)**

### Commandes pour gérer les conteneurs Docker
#### **Démarrer le projet**
```bash
./runn.sh
```
#### **Arrêter tous les conteneurs**
```bash
docker stop $(docker ps -aq)
```
#### **Supprimer tous les conteneurs**
```bash
docker rm $(docker ps -aq)
```
#### **Supprimer le réseau Docker**
```bash
docker network rm app-network
```
#### **Rebuild et relancer le projet**
```bash
docker-compose down --volumes
./runn.sh
```

---

## Déploiement
L'application est conteneurisée avec Docker :
- **Backend** : Node.js, Express, MongoDB
- **Frontend** : React, Vite, Bootstrap, Nginx
- **Base de données** : MongoDB via Docker

---

## Exemple de requête API
### **Créer un livre**
```bash
curl -X POST http://localhost:5000/api/books --json '{
  "titre": "Mon Premier Livre",
  "auteur": "Auteur inconnu",
  "ISBN": "9781234567890"
}'
```

**Retour JSON :**
```json
{
  "_id": "67b89aa31d4073e5f3863531",
  "titre": "Mon Premier Livre",
  "auteur": "Auteur inconnu",
  "ISBN": "9781234567890",
  "createdAt": "2025-02-21T15:24:19.330Z",
  "updatedAt": "2025-02-21T15:24:19.330Z",
  "__v": 0
}
```

---

## Contributeurs
- **Hugo Khaled Brotons**  
- **Nicolas Draperi**  
- **Nail Benamer**

