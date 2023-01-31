import { Injectable } from '@angular/core';
import {
  State,
  Selector,
  Action,
  StateContext,
  createSelector,
  NgxsOnInit,
} from '@ngxs/store';
import { forkJoin, tap } from 'rxjs';
import { Routine } from '../../models/routine.model';
import { ApiDataService } from '../../shared/services/apidata.service';
import { GetIngredients } from './actions';
import { IngredientRelations } from '../models/ingredient-relations.model';

export interface IngredientsStateModel {
  ingredients: IngredientRelations[];
}

@State<IngredientsStateModel>({
  name: 'ingredients',
  defaults: {
    ingredients: [],
  },
})
@Injectable()
export class IngredientsState implements NgxsOnInit {
  constructor(private dataService: ApiDataService) {}
  ngxsOnInit(ctx: StateContext<IngredientsStateModel>): void {
    ctx.dispatch(new GetIngredients());
  }

  @Selector()
  static getIngredients(state: IngredientsStateModel): IngredientRelations[] {
    return state.ingredients;
  }

  static getRelationByLabel(label: string) {
    return createSelector(
      [IngredientsState],
      (state: { ingredients: IngredientsStateModel }) => {
        return state.ingredients.ingredients.find(
          (relation) => relation.label === label
        );
      }
    );
  }

  @Action(GetIngredients)
  getAll(ctx: StateContext<IngredientsStateModel>) {
    if (ctx.getState().ingredients.length > 0) {
      return;
    }

    return this.dataService.getAll('/api/ingredientRelations').pipe(
      tap((values) => {
        const ingredients = values as IngredientRelations[];

        ctx.setState({ ingredients: ingredients });
      })
    );
  }
}
