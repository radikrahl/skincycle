import { BaseEntity } from '../../models/base.model';
import { Ingredient } from './ingredient.model';

export class IngredientRelations extends BaseEntity {
  public label = '';

  public prio = 0;
  public ingredients: Array<Ingredient> = [];
  public effect: string[] = [];

  public combinableWith: string[] = [];
  constructor() {
    super();
  }
}
