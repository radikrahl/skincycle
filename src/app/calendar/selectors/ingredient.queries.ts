import { Selector, createSelector } from '@ngxs/store';
import { IngredientRelations } from '../models/ingredient-relations.model';
import {
  IngredientsState,
  IngredientsStateModel,
} from '../state/ingredients.state';

export class IngredientQueries {
  @Selector([IngredientsState.ingredients])
  static getIngredients(state: IngredientsStateModel): IngredientRelations[] {
    return state.ingredients;
  }

  static getRelationByLabel(label: string) {
    return createSelector(
      [IngredientsState.ingredients],
      (state: IngredientsStateModel) => {
        return state.ingredients.find((relation) => relation.label === label);
      }
    );
  }
}
