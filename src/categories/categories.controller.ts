import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { Schema } from 'mongoose';

@ApiTags('categories') //le tag pour la documentation Swagger
@Controller('categories') //le préfixe de la route : /categories
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
                              /*   CATEGORIES    */
  //Route POST pour ajouter une nouvelle catégorie
  @ApiOperation({ summary: 'Créer une nouvelle catégorie' })
  @ApiResponse({ status: 201, description: 'La categorie est ajoutée' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  //Route GET pour obtenir toutes les catégories
  @ApiOperation({ summary: 'Obtenir les catégories entières' })
  @ApiResponse({ status: 200, description: 'Catégories récupérées avec succès' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  //Route GET pour obtenir une catégorie par son ID
  @ApiOperation({ summary: 'Obtenir une catégorie par ID' })
  @ApiResponse({ status: 200, description: 'Catégorie récupérée avec succès' })
  @ApiResponse({ status: 404, description: 'Aucun employé à cet id' })
  @Get(':id')
  async findCategoryById(@Param('id') id: string) {
    const objectId = new Schema.Types.ObjectId(id);
    return this.categoryService.findCategoryById(objectId);
  }

  //Route PUT pour mettre à jour une catégorie par son ID
  @ApiOperation({ summary: 'Mettre à jour une catégorie' })
  @ApiResponse({ status: 200, description: 'Categorie mise à jour' })
  @ApiResponse({ status: 404, description: 'Modification non effectuée.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const objectId = new Schema.Types.ObjectId(id);
    return this.categoryService.update(objectId, updateCategoryDto);
  }

  //Route DELETE pour supprimer une catégorie par son ID
  @ApiOperation({ summary: 'Supprimer une catégorie' })
  @ApiResponse({ status: 200, description: 'La categorie a été supprimé' })
  @ApiResponse({ status: 404, description: 'Echec de la suppression.' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const objectId = new Schema.Types.ObjectId(id);
    return this.categoryService.delete(objectId);
  }

                  /*   RELATIONS (MATERIALS-CATEGORIES)    */

  //Route POST pour assigner un matériel à une catégorie
  @ApiOperation({ summary: 'Assigner un matériel à une catégorie' })
  @ApiResponse({ status: 201, description: 'Le matériel est assigné à la catégorie' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @Post('assign')
  async assignMaterialToCategory(
    @Body('materialId') materialId: string,
    @Body('categoryId') categoryId: string,)
    {
      const objectIdMaterial = new Schema.Types.ObjectId(materialId);
      const objectIdCategory = new Schema.Types.ObjectId(categoryId);
      return this.categoryService.assignMaterialToCategory(objectIdMaterial, objectIdCategory);
  }

  //Route GET pour obtenir toutes les relations matériels-catégories
  @ApiOperation({ summary: 'Obtenir les relations matériel-catégorie' })
  @ApiResponse({ status: 200, description: 'Relations récupérées avec succès' })
  @ApiResponse({ status: 404, description: 'Aucune relation trouvée.' })
  @Get('materials-categories')
  async findAllMaterialsCategories() {
    return this.categoryService.findAllMaterialsCategories();
  }

  //Route GET pour obtenir une relation matériel-catégorie par son ID 
  @ApiOperation({ summary: 'Obtenir une relation matériel-catégorie par ID' })
  @ApiResponse({ status: 200, description: 'Relation récupérée avec succès' })
  @ApiResponse({ status: 404, description: 'Aucune relation trouvée.' })
  @Get('materials-categories/:idRelation')
  async getMaterialCategory(@Param('idRelation') id: string) {
    const objectId = new Schema.Types.ObjectId(id);
    return this.categoryService.getMaterialCategoryById(objectId);
  }

  //Route GET pour obtenir tous les matériels grace au nom de la catégorie
  @ApiOperation({ summary: 'Obtenir les matériaux par au nom de la catégorie' })
  @ApiResponse({ status: 200, description: 'Matériaux récupérés avec succès' })
  @ApiResponse({ status: 404, description: 'Aucun matériel trouvé pour cette catégorie' }) 
  @Get(':name/materials')
  async getMaterialsByCategoryId(@Param('name') name: string) { 
    return this.categoryService.getMaterialsByCategoryId(name);
  }

  //Route DELETE pour supprimer l'association d'un matériel à une catégorie
  @ApiOperation({ summary: 'Supprimer l\'association d\'un matériel à une catégorie' })
  @ApiResponse({ status: 200, description: 'L\'association a été supprimée' })
  @ApiResponse({ status: 404, description: 'Echec de la suppression.' })
  @Delete('unassign/:idRelation')
  async removeMaterialFromCategory(@Param('idRelation') id: string) {
    const objectId = new Schema.Types.ObjectId(id);
    return this.categoryService.removeMaterialFromCategory(objectId);
  }
}
