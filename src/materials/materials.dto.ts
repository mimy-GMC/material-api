import { ApiProperty } from "@nestjs/swagger";

//DTO pour la création d'un matériel
export class CreateMaterialDto {
  @ApiProperty({ description: 'Nom du matériel', example: 'Dell Latitude 5420 Laptop' })
  name!: string;

  @ApiProperty({ description: 'Catégorie du matériel', example: 'Laptop' })
  category!: string;

  @ApiProperty({ description: 'Quantité en stock', example: 15 })
  quantity!: number;

  @ApiProperty({ description: 'Nom de l\'employé responsable', example: 'John Doe' })
  employee!: string;

  @ApiProperty({ description: 'Description du matériel', example: 'A reliable business laptop.' })
  description?: string;
}

//DTO pour la mise à jour d'un matériel
export class UpdateMaterialDto {
  @ApiProperty({ description: 'Nom du matériel', example: 'Dell Latitude 5420 Laptop', required: false })
  name?: string;

  @ApiProperty({ description: 'Catégorie du matériel', example: 'Laptop', required: false })
  category?: string;

  @ApiProperty({ description: 'Quantité en stock', example: 15, required: false })
  quantity?: number;

  @ApiProperty({ description: 'Nom de l\'employé responsable', example: 'John Doe', required: false })
  employee?: string;

  @ApiProperty({ description: 'Description du matériel', example: 'A reliable business laptop.', required: false })
  description?: string;
}
