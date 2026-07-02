# Material API

Projet de groupe réalisé avec Anthony NGAKOSSO durant mon année universitaire à YNOV Campus.
API REST backend pour la gestion des matériels informatiques, développée avec NestJS, TypeScript et MongoDB via Mongoose.

## Description

Cette application gère les entités suivantes :

- **Employés** (`employees`) : CRUD des employés.
- **Matériaux** (`materials`) : CRUD des matériels et validation métier.
- **Catégories** (`categories`) : CRUD des catégories et gestion des relations matériel-catégorie.

L'application utilise une architecture modulaire NestJS et expose une documentation Swagger.

## Fonctionnalités

- CRUD complet pour les employés, matériels et catégories.
- Route de santé : `GET /ping`.
- Validation automatique des requêtes avec `ValidationPipe`.
- Vérification métier : un employé ne peut gérer qu'une seule catégorie.
- Documentation interactive via Swagger.

## Architecture

- `src/app.module.ts` : import des modules et configuration MongoDB.
- `src/main.ts` : configuration de l'application, validation globale et Swagger.
- `src/app.controller.ts` : route racine et route `/ping`.
- `src/employee` : module employé.
- `src/materials` : module matériel.
- `src/categories` : module catégorie et relations.

## Structure du projet

```
src/
  app.module.ts
  main.ts
  app.controller.ts
  app.service.ts
  employee/
    employee.controller.ts
    employee.service.ts
    employee.dto.ts
    schemas/employee.schema.ts
  materials/
    materials.controller.ts
    materials.service.ts
    materials.dto.ts
    schemas/materials.schema.ts
  categories/
    categories.controller.ts
    categories.service.ts
    categories.dto.ts
    schemas/category.schema.ts
    schemas/materialCategory.schema.ts
```

## Configuration

Créer un fichier `.env` à la racine avec :

```env
MONGO_URI=mongodb://localhost:27017/material-api
PORT=3000
```

`MONGO_URI` peut être remplacé par un URI MongoDB Atlas.

## Installation

```bash
npm install
```

## Lancement

```bash
npm run start
```

Mode développement :

```bash
npm run start:dev
```

Mode production :

```bash
npm run start:prod
```

## Endpoints

### Global

- `GET /` : message de bienvenue.
- `GET /ping` : vérifie l'état de l'API.

### Employés

- `POST /employees`
- `GET /employees`
- `GET /employees/:id`
- `PUT /employees/:id`
- `DELETE /employees/:id`

### Matériaux

- `POST /materials`
- `GET /materials`
- `GET /materials/:id`
- `GET /materials/employee/:employeeName`
- `PUT /materials/:id`
- `DELETE /materials/:id`

### Catégories

- `POST /categories`
- `GET /categories`
- `GET /categories/:id`
- `PUT /categories/:id`
- `DELETE /categories/:id`

### Relations matériel-catégorie

- `POST /categories/assign`
  - Payload : `{ "materialId": "<id>", "categoryId": "<id>" }`
- `GET /categories/materials-categories`
- `GET /categories/materials-categories/:idRelation`
- `GET /categories/:name/materials`
- `DELETE /categories/unassign/:idRelation`

## Modèles de données

### CreateEmployeeDto

- `name` : string
- `position` : string
- `managedCategory` : string

### UpdateEmployeeDto

- `name?` : string
- `position?` : string
- `managedCategory?` : string

### CreateMaterialDto

- `name` : string
- `category` : string
- `employee` : string

### UpdateMaterialDto

- `name?` : string
- `category?` : string
- `employee?` : string

### CreateCategoryDto

- `name` : string
- `description` : string

### UpdateCategoryDto

- `name?` : string
- `description?` : string

## Règles métier

- Un employé gère une seule catégorie via `managedCategory`.
- Lors de la création ou modification d'un matériel, l'employé indiqué doit correspondre à la catégorie du matériel.

## Swagger

Swagger est accessible à :

```text
http://localhost:3000/api
```

## Tests

- Tests unitaires : `npm run test`
- Tests e2e : `npm run test:e2e`
- Couverture : `npm run test:cov`

## Déploiement

Le dépôt ne contient pas de script de déploiement spécial. Pour déployer, construisez l'application puis exécutez `npm run start:prod`.

## Notes

- Le port par défaut est `3000`.
- Les routes attendent des IDs MongoDB au format `string`.
- `MONGO_URI` configure la connexion MongoDB.
