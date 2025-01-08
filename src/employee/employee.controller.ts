import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employee.dto';

@Controller('employees') //Définir le préfixe de la route : /employees
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  //Route POST pour créer un nouvel employé
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  //Route GET pour récupérer les données entières des employés
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  //Route GET pour récupérer les données d'un employé par son ID
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.employeeService.findById(id);
  }

  //Route PUT pour mettre à jour les données d'un employé par son ID
  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
