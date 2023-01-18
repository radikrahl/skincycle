import { IngredientRelations } from "../models/ingredient-relations.model";

export class GetAll {
  static readonly type = '[Products] Get all products';
}

export class GetProductsForIngredients {
  static readonly type = '[Products] Get products for ingredients';

  constructor(public relations: IngredientRelations, public categoryName: string) {}
}
