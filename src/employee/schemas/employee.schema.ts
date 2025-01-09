import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ required: true })
  name!: string; // Nom de l'employé

  @Prop({ required: true })
  email!: string; // Adresse email de l'employé

  @Prop({ required: true })
  managedCategory!: string; // Catégorie de matériel géré par l'employé
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
