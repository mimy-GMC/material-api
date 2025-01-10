import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MaterialService } from './materials.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMaterialDto, UpdateMaterialDto } from './materials.dto';

@ApiTags(('materials')) //le tag pour la documentation Swagger
@Controller('materials') //le préfixe de la route : /materials
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  //Route POST pour créer un nouveau matériel
  @Post()
  @ApiOperation({ summary: 'Créer un matériel' })
  @ApiResponse({ status: 201, description: 'Matériel créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }

  //Route GET pour récupérer tous les matériels
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les matériels' })
  @ApiResponse({ status: 200, description: 'Liste de tous les matériels.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  findAll() {
    return this.materialService.findAll();
  }

  //Route GET pour récupérer un matériel par son ID
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un matériel par son ID' })
  @ApiResponse({ status: 200, description: 'Détails du matériel choisi' })
  @ApiResponse({ status: 404, description: 'Matériel non trouvé.' })
  findById(@Param('id') id: string) {
    return this.materialService.findById(id);
  }

  //Route PUT pour mettre à jour un matériel par son ID
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un matériel' })
  @ApiResponse({ status: 200, description: 'Matériel mis à jour.' })
  @ApiResponse({ status: 404, description: 'Aucune mis à jour n\'a été trouvé.' })
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, updateMaterialDto);
  }

  //Route DELETE pour supprimer un matériel
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un matériel' })
  @ApiResponse({ status: 200, description: 'Matériel supprimé.' })
  @ApiResponse({ status: 404, description: 'Matériel non trouvé.' })
  delete(@Param('id') id: string) {
    return this.materialService.delete(id);
  }
}
