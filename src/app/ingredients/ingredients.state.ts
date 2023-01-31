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
import { Routine } from '../models/routine.model';
import { ApiDataService } from '../shared/services/apidata.service';
import { GetAll } from './ingredients.actions';
import { IngredientRelations } from './models/ingredient-relations.model';

export interface IngredientsStateModel {
  ingredients: IngredientRelations[];
  routines: Routine[];
}

@State<IngredientsStateModel>({
  name: 'ingredients',
  defaults: {
    ingredients: [],
    routines: [],
  },
})
@Injectable()
export class IngredientsState implements NgxsOnInit {
  constructor(private dataService: ApiDataService) {}
  ngxsOnInit(ctx: StateContext<IngredientsStateModel>): void {
    ctx.dispatch(new GetAll());
  }

  @Selector()
  static getIngredients(state: IngredientsStateModel): IngredientRelations[] {
    return state.ingredients;
  }

  @Selector()
  static getRoutines(state: IngredientsStateModel): Routine[] {
    return state.routines;
  }

  @Selector()
  static getRoutine(isEvening: boolean, date: Date) {
    return createSelector(
      [IngredientsState],
      (state: { ingredients: IngredientsStateModel }) => {
        return state.ingredients.routines?.find((routine) => {
          return (
            routine.day ===
              date.toLocaleDateString('de-DE', { weekday: 'long' }) &&
            (isEvening
              ? routine.daytime == 'abends'
              : routine.daytime == 'morgens')
          );
        });
      }
    );
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

  @Action(GetAll)
  getAll(ctx: StateContext<IngredientsStateModel>) {
    if (
      ctx.getState().ingredients.length > 0 &&
      ctx.getState().routines.length > 0
    ) {
      return;
    }

    return forkJoin([
      this.dataService.getAll('/api/ingredientRelations'),
      this.dataService.getAll('/api/routines'),
    ]).pipe(
      tap((values) => {
        const ingredients = values[0] as IngredientRelations[];
        const routines = values[1] as Routine[];

        ctx.setState({ ingredients: ingredients, routines: routines });
      })
    );
  }
}
