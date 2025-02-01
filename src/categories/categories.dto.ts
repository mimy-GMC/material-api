import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

//DTO pour la création d'une catégorie
export class CreateCategoryDto {
  @ApiProperty({ example: 'Keyboard', description: 'nom de la catégorie' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Devices and gadgets', description: 'description de la categorie' })
  @IsOptional()
  @IsString()
  description?: string;
}

//DTO pour la mise à jour des données d'une catégorie
export class UpdateCategoryDto {
  @ApiProperty({ example: 'Keyboard', description: 'nom de la catégorie' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'mis à jour de la description', description: 'description de la categorie' })
  @IsOptional()
  @IsString()
  description?: string;
}
