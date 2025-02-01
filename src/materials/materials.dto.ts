import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, Min, IsOptional } from "class-validator";

//DTO pour la création d'un matériel
export class CreateMaterialDto {
  @ApiProperty({ description: 'Nom du matériel', example: 'Dell Latitude 5420 Laptop' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Catégorie du matériel', example: 'Laptop' })
  @IsString()
  category!: string;

  @ApiProperty({ description: 'Quantité en stock', example: 15 })
  @IsInt()
  @Min(0)
  quantity!: number;

  @ApiProperty({ description: 'Nom de l\'employé responsable', example: 'John Doe' })
  @IsString()
  employee!: string;

  @ApiProperty({ description: 'Description du matériel', example: 'A reliable business laptop.' })
  @IsOptional()
  @IsString()
  description?: string;
}

//DTO pour la mise à jour d'un matériel
export class UpdateMaterialDto {
  @ApiProperty({ description: 'Nom du matériel', example: 'Dell Latitude 5420 Laptop', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Catégorie du matériel', example: 'Laptop', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'Quantité en stock', example: 15, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @ApiProperty({ description: 'Nom de l\'employé responsable', example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  employee?: string;

  @ApiProperty({ description: 'Description du matériel', example: 'A reliable business laptop.', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
