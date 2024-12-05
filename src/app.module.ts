import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialModule } from './materials/materials.module';
import { EmployeeModule } from './employee/employee.module';

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
  ],
})
export class AppModule {}
