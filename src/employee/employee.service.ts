import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { Category } from '../categories/schemas/category.schema';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    //Injecter le modèle Employee pour interagir avec MongoDB
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    //Injecter le modèle Category pour valider la catégorie gérée par l'employé
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  private async validateManagedCategory(categoryName: string): Promise<void> {
    const category = await this.categoryModel.findOne({ name: categoryName }).exec();
    if (!category) {
      throw new NotFoundException(`Category with name "${categoryName}" not found`);
    }
  }

  //Créer un nouvel employé
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    await this.validateManagedCategory(createEmployeeDto.managedCategory);
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  //Récupérer les données de tous les employés
  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  //Récupérer les données d'un employé par son ID
  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return employee;
  }

  //Mettre à jour les données d'un employé par son ID
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    if (updateEmployeeDto.managedCategory) {
      await this.validateManagedCategory(updateEmployeeDto.managedCategory);
    }

    const updatedItem = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true }).exec();
    if (!updatedItem) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return updatedItem;
  }

  //Supprimer les données d'un employé grace à son ID
  async delete(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return employee;
  }
}
