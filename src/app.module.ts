import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialModule } from './materials/materials.module';
import { EmployeeModule } from './employee/employee.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    //Configurer la connexion à MongoDB
    MongooseModule.forRoot(
      'mongodb+srv://miryam:miryam123@cluster0.aul0uik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    //Importer le module Material
    MaterialModule,
    //Importer le module Employee
    EmployeeModule,
  ],controllers: [AppController], // Ajoutez AppController
  providers: [AppService], // Ajoutez AppService
})

export class AppModule {}
