import { Selector, createSelector } from '@ngxs/store';
import { IngredientRelations } from '../models/ingredient-relations.model';
import {
  IngredientsState,
  IngredientsStateModel,
} from '../state/ingredients.state';

export class IngredientQueries {
  @Selector([IngredientsState.entities()])
  static getIngredients(entities: IngredientRelations[]): IngredientRelations[] {
    return entities;
  }

  static getRelationByLabel(label: string) {
    return createSelector(
      [IngredientsState.ingredients],
      (state: IngredientsStateModel) => {
        return state.entities.find((relation) => relation.label === label);
      }
    );
  }
}
