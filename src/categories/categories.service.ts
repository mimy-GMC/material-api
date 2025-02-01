import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId} from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { MaterialCategory } from './schemas/materialCategory.schema';
import { Material } from '../materials/schemas/materials.schema';

@Injectable()
export class CategoryService {
  constructor(
    //Injecter le modèle Category pour interagir avec MongoDB
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    //Injecter le modèle MaterialCategory pour interagir avec MongoDB
    @InjectModel (MaterialCategory.name) private readonly materialCategoryModel: Model<MaterialCategory>,
    //Injecter le modèle Material pour interagir avec MongoDB
    @InjectModel(Material.name) private readonly materialModel: Model<any>,
) {}

                        /*   CATEGORIES    */
  //Créer une nouvelle catégorie
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  //Récupérer les données de toutes les catégories
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  //Récupérer les données d'une catégorie par son ID
  async findCategoryById(id: ObjectId): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  //Mettre à jour les données d'une catégorie par son ID
  async update(id: ObjectId, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  //Supprimer une catégorie par son ID
  async delete(id: ObjectId): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

                  /*   RELATIONS (MATERIALS-CATEGORIES)    */

  //Assigner un matériel à une catégorie
  async assignMaterialToCategory(materialId: ObjectId, categoryId: ObjectId): Promise<MaterialCategory> {
    try {
      const association = new this.materialCategoryModel({ materialId, categoryId });
      return await association.save();
    } catch (error) {
        throw new Error('Le materiel est déjà associé à cette catégorie');
    }
  }

  //Récupérer les données de toutes les relations matériels-catégories
  async findAllMaterialsCategories(): Promise<MaterialCategory[]> {
    return await this.materialCategoryModel.find().exec();
  }

  //Récupérer les données d'une relation matériel-catégorie par son ID
  async getMaterialCategoryById(id: ObjectId): Promise<MaterialCategory> {
    const relation = await this.materialCategoryModel.findById(id).exec();
    if (!relation) {
      throw new NotFoundException(`Material-Category relation with ID ${id} not found`);
    }
    return relation;
  }

  //Récupérer les données de tous les materiels grace au nom de la catégorie
  async getMaterialsByCategoryId(categoryName: string): Promise<Material[]> {
    const category = await this.categoryModel.findOne({ name: categoryName }).exec();
    if (!category) {
      throw new NotFoundException(`Category with name ${categoryName} not found`);
    }
    return this.materialModel.find({ category: category.name}).exec();
  }

  //Supprimer l'association d'un matériel à une catégorie
  async removeMaterialFromCategory(id: ObjectId): Promise<MaterialCategory> {
    const relation = await this.materialCategoryModel.findByIdAndDelete(id).exec();
    if (!relation) {
      throw new NotFoundException(`Material-Category relation with ID ${id} not found`);
    }
    return relation;
  }
}