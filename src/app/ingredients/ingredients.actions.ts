import { IngredientRelations } from "./models/ingredient-relations.model";

export class GetAll {
  static readonly type = '[Ingredients] Get all products';
}

export class GetProductsForIngredients {
  static readonly type = '[Ingredients] Get products for ingredients';

  constructor(public relations: IngredientRelations, public categoryName: string) {}
}
