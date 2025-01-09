import { ApiProperty } from '@nestjs/swagger';

//DTO pour la création d'un employé
export class CreateEmployeeDto {
  @ApiProperty({ description: 'Nom de l\'employé', example: 'Jane Doe' })
  name!: string;

  @ApiProperty({ description: 'Adresse email de l\'employé', example: 'jane.doe@example.com' })
  email!: string;

  @ApiProperty({ description: 'Catégorie de matériel géré', example: 'Laptop' })
  managedCategory!: string;
}

//DTO pour la mise à jour des données d'un employé
export class UpdateEmployeeDto {
  @ApiProperty({ description: 'Nom de l\'employé', example: 'Jane Doe' })
  name!: string;

  @ApiProperty({ description: 'Adresse email de l\'employé', example: 'jane.doe@example.com' })
  email!: string;

  @ApiProperty({ description: 'Catégorie de matériel géré', example: 'Laptop' })
  managedCategory!: string;
}
