import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

//DTO pour la création d'un employé
export class CreateEmployeeDto {
  @ApiProperty({ description: 'Nom de l\'employé', example: 'Jane Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Adresse email de l\'employé', example: 'jane.doe@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Catégorie de matériel géré', example: 'Laptop' })
  @IsString()
  managedCategory!: string;
}

//DTO pour la mise à jour des données d'un employé
export class UpdateEmployeeDto {
  @ApiProperty({ description: 'Nom de l\'employé', example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Adresse email de l\'employé', example: 'jane.doe@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Catégorie de matériel géré', example: 'Laptop' })
  @IsOptional()
  @IsString()
  managedCategory?: string;
}
