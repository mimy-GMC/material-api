//DTO pour la création d'un employé
export class CreateEmployeeDto {
  name!: string;
  email!: string;
  managedCategory!: string;
}

//DTO pour la mise à jour des données d'un employé
export class UpdateEmployeeDto {
  name?: string;
  email?: string;
  managedCategory?: string;
}
