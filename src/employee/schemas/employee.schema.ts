import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  managedCategory!: string; // Catégorie de matériel géré
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
