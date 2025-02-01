import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialController } from './materials.controller';
import { MaterialService } from './materials.service';
import { Material, MaterialSchema } from './schemas/materials.schema';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    //Enregistrer le modèle MongoDB pour le modèle Material
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
    ]),
    EmployeeModule,

  ],
  //Definir le contrôleur associé à ce module
  controllers: [MaterialController],

  //Fournir le service utilisé par le contrôleur
  providers: [MaterialService],
})
export class MaterialModule {}
