import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { ApiTags, ApiOperation} from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employee.dto';

@ApiTags('employees') //Définir le tag pour la documentation Swagger
@Controller('employees') //Définir le préfixe de la route : /employees
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  //Route POST pour créer un nouvel employé
  @Post()
  @ApiOperation({ summary: 'Créer un employé' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  //Route GET pour récupérer les données entières des employés
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les employés' })
  findAll() {
    return this.employeeService.findAll();
  }

  //Route GET pour récupérer les données d'un employé par son ID
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer les données d\'un employé par son ID' })
  findById(@Param('id') id: string) {
    return this.employeeService.findById(id);
  }

  //Route PUT pour mettre à jour les données d'un employé par son ID
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour les données d\'un employé' })
  update(
    @Param('id') id: string, 
    @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  //Route DELETE pour supprimer les données d'un employé par son ID
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer l\'employé de la liste' })
  delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
