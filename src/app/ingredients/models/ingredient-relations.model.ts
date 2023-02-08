import { BaseEntity } from '../../core/models/base.model';

export class IngredientRelations extends BaseEntity {
  public label = '';

  public prio = 0;
  public ingredients: Array<string> = [];
  public effect: string[] = [];

  public combinableWith: string[] = [];
  constructor() {
    super();
  }
}
