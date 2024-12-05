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
import { CreateMaterialDto, UpdateMaterialDto } from './materials.dto';

@Controller('materials') //Definir le préfixe de la route : /materials
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  //Route POST pour créer un nouveau matériel
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }

  //Route GET pour récupérer tous les matériels
  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  //Route GET pour récupérer un matériel par son ID
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.materialService.findById(id);
  }

  //Route PUT pour mettre à jour un matériel par son ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, updateMaterialDto);
  }

  //Route DELETE pour supprimer un matériel
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.materialService.delete(id);
  }
}
