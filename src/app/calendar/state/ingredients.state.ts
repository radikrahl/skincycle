import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, NgxsOnInit } from '@ngxs/store';
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
  @Selector()
  static ingredients(state: IngredientsStateModel) {
    return state;
  }

  constructor(private dataService: ApiDataService) {}
  ngxsOnInit(ctx: StateContext<IngredientsStateModel>): void {
    ctx.dispatch(new GetIngredients());
  }

  @Action(GetIngredients)
  getAll(ctx: StateContext<IngredientsStateModel>) {
    if (ctx.getState().ingredients.length > 0) {
      return;
    }

    return this.dataService
      .getAll('/api/ingredientRelations')
      .subscribe((values) => {
        const ingredients = values as IngredientRelations[];

        ctx.setState({ ingredients: ingredients });
      });
  }
}
