import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material } from './schemas/materials.schema';
import { CreateMaterialDto, UpdateMaterialDto } from './materials.dto';

@Injectable()
export class MaterialService {
  constructor(
    //Injecter le modèle Material pour interagir avec MongoDB
    @InjectModel(Material.name) private materialModel: Model<Material>,
  ) {}

  //Créer un nouvel élément de matériel
  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const newItem = new this.materialModel(createMaterialDto);
    return newItem.save(); //Sauvegarder le nouvel élément dans la base de données
  }

  //Récupérer tous les matériels
  async findAll(): Promise<Material[]> {
    return this.materialModel.find().exec();
  }

  //Récupérer un matériel par son ID
  async findById(id: string): Promise<Material> {
    const item = await this.materialModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Material item with ID ${id} not found`);
    }
    return item;
  }

  //Mettre à jour un matériel existant
  async update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<Material> {
    const updatedItem = await this.materialModel.findByIdAndUpdate(id, updateMaterialDto, { new: true })
      .exec();
    if (!updatedItem) {
      throw new NotFoundException(`Material'new item with ID ${id} not found`);
    }
    return updatedItem;
  }

  //Supprimer un matériel par son ID
  async delete(id: string): Promise<Material> {
    const deletedItem = await this.materialModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`Material item with ID ${id} not found`);
    }
    return deletedItem;
  }
}
