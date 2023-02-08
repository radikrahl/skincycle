import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { ApiDataService } from '../../shared/services/apidata.service';
import { IngredientRelations } from '../models/ingredient-relations.model';
import {
  EntitiesState,
  EntitiesStateModel,
} from 'src/app/core/state/entities.state';
import { GetIngredients } from './actions';

export type IngredientsStateModel = EntitiesStateModel<IngredientRelations>;

@State<IngredientsStateModel>({
  name: 'ingredients',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class IngredientsState extends EntitiesState implements NgxsOnInit {
  @Selector()
  static ingredients(state: IngredientsStateModel) {
    return state;
  }

  constructor(private dataService: ApiDataService<IngredientRelations>) {
    super();
  }
  ngxsOnInit(ctx: StateContext<IngredientsStateModel>): void {
    ctx.dispatch(new GetIngredients());
  }

  @Action(GetIngredients)
  getAll(ctx: StateContext<IngredientsStateModel>) {
    if (ctx.getState().entities.length > 0) {
      return;
    }

    return this.dataService
      .getAll('/api/ingredientRelations')
      .subscribe((ingredients) => {
        ctx.setState({ entities: ingredients });
      });
  }
}
