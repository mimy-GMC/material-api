import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class MaterialCategory extends Document {
  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Material', required: true }) 
  materialId!: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
  categoryId!: MongooseSchema.Types.ObjectId;

  @Prop({ default: Date.now })
  assignedAt!: Date;
}

export const MaterialCategorySchema = SchemaFactory.createForClass(MaterialCategory);

// Ajout d'un index unique dans le schéma pour éviter les doublons au niveau de la base de données
MaterialCategorySchema.index({ materialId: 1, categoryId: 1 }, { unique: true });