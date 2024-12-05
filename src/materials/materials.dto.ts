//DTO pour la création d'un matériel
export class CreateMaterialDto {
  name!: string;
  category!: string;
  description?: string;
  quantity!: number;
}

//DTO pour la mise à jour d'un matériel
export class UpdateMaterialDto {
  name?: string;
  category?: string;
  description?: string;
  quantity?: number;
}
