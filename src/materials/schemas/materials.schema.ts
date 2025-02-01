import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//Déclare un modèle Material en tant que schéma MongoDB
@Schema()
export class Material extends Document {
  @Prop({ required: true })
  name!: string; // Nom du matériel

  @Prop({ required: true })
  category!: string; // Catégorie du matériel

  @Prop({ required: true })
  quantity!: number; // Quantité disponible en stock

  @Prop({ required: true })
  employee!: string; // Nom de l'employé responsable

  @Prop({ required: true })
  description!: string; // Description optionnelle du matériel  

  @Prop({ default: Date.now })
  createdAt!: Date; // Date de création automatique
}

//Déclare un schéma MongoDB à partir de la classe Material
export const MaterialSchema = SchemaFactory.createForClass(Material);
