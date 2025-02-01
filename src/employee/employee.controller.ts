import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employee.dto';
import { Schema } from 'mongoose';

@ApiTags('employees') //le tag pour la documentation Swagger
@Controller('employees') //le préfixe de la route : /employees
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  //Route POST pour créer un nouvel employé
  @Post()
  @ApiOperation({ summary: 'Créer un employé' })
  @ApiResponse({ status: 201, description: 'L\'ajout de l\'employé a été succès' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  //Route GET pour récupérer les données entières des employés
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les employés' })
  @ApiResponse({ status: 200, description: 'Liste de tous les employés.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  async findAll() {
    return this.employeeService.findAll();
  }

  //Route GET pour récupérer les données d'un employé par son ID
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer les données d\'un employé par son ID' })
  @ApiResponse({ status: 200, description: 'Informations sur l\'employé choisi.' })
  @ApiResponse({ status: 404, description: 'Aucun employé à cet id' })
  async findById(@Param('id') id: string) {
    const objectId = new Schema.Types.ObjectId(id);
    return this.employeeService.findById(objectId);
  }

  //Route PUT pour mettre à jour les données d'un employé par son ID
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour les données d\'un employé' })
  @ApiResponse({ status: 200, description: ' Succès de la mise à jour' })
  @ApiResponse({ status: 404, description: 'Modification non effectuée.' })
  async update(
    @Param('id') id: string, 
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) 
    {
      const objectId = new Schema.Types.ObjectId(id);
      return this.employeeService.update(objectId, updateEmployeeDto);
  }

  //Route DELETE pour supprimer les données d'un employé par son ID
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer l\'employé de la liste' })
  @ApiResponse({ status: 200, description: 'L\'employé choisi a été supprimé' })
  @ApiResponse({ status: 404, description: 'Echec de la suppression.' })
  async delete(@Param('id') id: string) {
    const objectId = new Schema.Types.ObjectId(id);
    return this.employeeService.delete(objectId);
  }
}
