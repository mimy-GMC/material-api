import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee, EmployeeSchema } from './schemas/employee.schema';

@Module({
  //Configurer Mongoose pour ce module en enregistrant le schéma Employee
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController],//On déclare le controleur qui est instancié dans ce module
  providers: [EmployeeService],//On déclare le service qui est instancié dans ce module
})
export class EmployeeModule {}
