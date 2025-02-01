import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Material } from './schemas/materials.schema';
import { Employee } from '../employee/schemas/employee.schema';
import { CreateMaterialDto, UpdateMaterialDto } from './materials.dto';

@Injectable()
export class MaterialService {
  constructor(
    //Injecter le modèle Material pour interagir avec MongoDB
    @InjectModel(Material.name) private materialModel: Model<Material>,
    //Injecter le modèle Employee pour interagir avec MongoDB
    @InjectModel(Employee.name) private employeeModel: Model<Employee>
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
  async findById(id: ObjectId): Promise<Material> {
    const item = await this.materialModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Material item with ID ${id} not found`);
    }
    return item;
  }
  
  //Obtenir un materiel par le nom de l'employé
  async findByEmployeeName(employeeName: string): Promise<Material[]> {
    //Trouver d'abord l'employé par son nom
    const employee = await this.employeeModel.findOne({ name: employeeName }).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with NAME ${employeeName} not found`);
    }

    //Utiliser le nom de l'employé pour trouver le matériel associés
    const materialItem = await this.materialModel.find({ employee: employee.name }).exec();
    if (materialItem.length === 0) {
      throw new NotFoundException(`Material item with employee NAME ${employee.name} not found`);
    }
    return materialItem;
  }

  //Mettre à jour un matériel existant
  async update(id: ObjectId, updateMaterialDto: UpdateMaterialDto): Promise<Material> {
    const updatedItem = await this.materialModel.findByIdAndUpdate(id, updateMaterialDto, { new: true })
      .exec();
    if (!updatedItem) {
      throw new NotFoundException(`Material'new item with ID ${id} not found`);
    }
    return updatedItem;
  }

  //Supprimer un matériel par son ID
  async delete(id: ObjectId): Promise<Material> {
    const deletedItem = await this.materialModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`Material item with ID ${id} not found`);
    }
    return deletedItem;
  }
}
