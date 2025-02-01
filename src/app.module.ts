import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialModule } from './materials/materials.module';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './categories/categories.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    //Charge les variables d'environnement
    ConfigModule.forRoot(),
    //Configurer la connexion à MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/default'),
    //Importer le module Material
    MaterialModule,
    //Importer le module Employee
    EmployeeModule,
    //Importer le module Category
    CategoryModule,
  ],controllers: [AppController], // Ajoutez AppController
  providers: [AppService], // Ajoutez AppService
})

export class AppModule {}
