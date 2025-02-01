import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { MaterialCategory, MaterialCategorySchema } from './schemas/materialCategory.schema';
import { Material, MaterialSchema } from '../materials/schemas/materials.schema';

@Module({
    //Configurer Mongoose pour ce module en enregistrant le schéma Category et MaterialCategory
  imports: [
    MongooseModule.forFeature([
        { name: Category.name, schema: CategorySchema },
        { name: MaterialCategory.name, schema: MaterialCategorySchema },
        { name: Material.name, schema: MaterialSchema },
    ])],
  controllers: [CategoryController], //On déclare le controleur qui est instancié dans ce module
  providers: [CategoryService], //On déclare le service qui est instancié dans ce module
  exports: [CategoryService], //On exporte le service pour qu'il soit utilisé dans d'autres modules
})
export class CategoryModule {}
