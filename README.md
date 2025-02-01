## PROJET CREATION D'API REST : GESTION DE STOCKAGE DES MATERIELS INFORMATIQUES -------------------
Ton projet est une application backend développée avec NestJS et utilise MongoDB via Mongoose pour gérer les données. 

📌 Mon application gère plusieurs entités principales :

    Employés (employee) : Gestion des employés (ajout, modification, suppression, récupération).
    Matériaux (materials) : Gestion des matériaux et leur catégorisation.
    Catégories de matériaux (categories) : Organisation des matériaux en différentes catégories.

L'architecture repose sur NestJS, un framework basé sur TypeScript pour développer des applications Node.js modulaires et maintenables.

## DETAIL BACKEND : 
Le backend est organisé en modules, chaque entité ayant son propre module pour une meilleure séparation des responsabilités.

1️⃣ Structure du projet

📂 src/

    📌 app.module.ts : Module principal qui importe tous les modules nécessaires.
    📌 main.ts : Point d'entrée de l'application NestJS.
    📂 employee/
        employee.controller.ts : Définit les endpoints de l'API REST pour les employés.
        employee.service.ts : Contient la logique métier pour manipuler les employés.
        employee.dto.ts : Définit les structures de données attendues pour la validation.
        schemas/employee.schema.ts : Modèle de données pour les employés en MongoDB.
    📂 materials/
        materials.controller.ts : Définit les endpoints liés aux matériaux.
        materials.service.ts : Contient la logique métier des matériaux.
        materials.dto.ts : Définit la validation des matériaux.
        schemas/materials.schema.ts : Modèle des matériaux en base de données.
    📂 categories/
        categories.controller.ts : Définit les endpoints pour les catégories de matériaux.
        categories.service.ts : Logique métier pour les catégories.
        categories.dto.ts : Définit les structures de données pour les catégories.
        schemas/materialCategory.schema.ts : Modèle de la relation materials et catégories en MongoDB.
        schemas/Category.schema.ts : Modèle des catégories en MongoDB.

2️⃣ Base de données

    MongoDB est utilisé comme base de données.
    Mongoose est utilisé pour définir les modèles et interagir avec la base.
    Les schémas sont définis dans chaque module sous schemas/.

3️⃣ API REST

Chaque entité possède son propre contrôleur (controller.ts) pour gérer les requêtes HTTP. Par exemple, pour employee, on retrouve :

    GET /employees : Récupérer la liste des employés.
    POST /employees : Ajouter un employé.
    PUT /employees/:id : Modifier un employé.
    DELETE /employees/:id : Supprimer un employé.


## DOCUMENTATION DE MON API : 
✅ Configuration actuelle de Swagger

    Titre : API d'inventaire de matériel
    Description : API de gestion des matériels informatiques
    Version : 1.0
    Tags : materials, employees, categories
    Module utilisé : SwaggerModule avec DocumentBuilder

📌 Comment accéder à Swagger UI ? en faisant :

  http://localhost:3000/api

(si ton application tourne sur le port 3000).



## INFORMATION CONCERNANT NESTJS, VOIR BAS DE LA PAGE ---------------

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
