import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId} from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    //Injecter le modèle Employee pour interagir avec MongoDB
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  //Créer un nouvel employé
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  //Récupérer les données de tous les employés
  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  //Récupérer les données d'un employé par son ID
  async findById(id: ObjectId): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return employee;
  }

  //Mettre à jour les données d'un employé par son ID
  async update(id: ObjectId, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedItem = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true }).exec();
    if (!updatedItem) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return updatedItem;
  }

  //Supprimer les données d'un employé grace à son ID
  async delete(id: ObjectId): Promise<Employee> {
    const employee = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return employee;
  }
}
