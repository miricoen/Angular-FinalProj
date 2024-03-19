export class recipe {
  id!: number;
  name!: string;
  categoryId!: number;
  preparationTime!: number;
  level!: number;
  dateAdded!: Date;
  products!: string[];
  instructions!: string[];
  userId!: number;
  image!: string;
}
