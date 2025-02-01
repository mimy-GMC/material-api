import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name!: string; // Nom de la catégorie

  @Prop()
  description!: string; // Description de la catégorie
}

export const CategorySchema = SchemaFactory.createForClass(Category);
