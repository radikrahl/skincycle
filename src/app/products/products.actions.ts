import { IngredientRelations } from '../ingredients/models/ingredient-relations.model';

export class GetAll {
  static readonly type = '[Products] Get all products';
}

export class GetProductsForIngredients {
  static readonly type = '[Products] Get products for ingredients';

  constructor(
    public relations: IngredientRelations,
    public categoryName: string
  ) {}
}

export class GetProductsByCategory {
  static readonly type = '[Products] Get products by category';

  constructor(public categoryName: string) {}
}
