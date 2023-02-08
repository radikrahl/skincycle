import { Selector } from '@ngxs/store';
import { Routine } from 'src/app/shared/routines/models/routine.model';
import { Category } from 'src/app/shared/categories/models/category.model';
import { Product } from 'src/app/products/models/product.model';
import {
  CalendarDays,
  CalendarStepModel,
  CalendarViewModel,
} from '../models/calendar.model';
import { IngredientRelations } from '../models/ingredient-relations.model';
import { IngredientQueries } from '../selectors/ingredient.queries';
import { CalendarState, CalendarStateModel } from '../state/calendar.state';
import { RoutinesState } from '../../shared/routines/state/routines.state';
import { CalendarSelectors } from './calendar.queries';

export class CalendarViewQueries {

  @Selector([
    CalendarState,
    RoutinesState.entities(),
    CalendarSelectors.getCategoryStepModel,
  ])
  static getViewModel(
    state: CalendarStateModel,
    routines: Routine[],
    steps: CalendarStepModel[]
  ): CalendarViewModel {
    const today = state.visibleDays[1];
    const routine = CalendarViewQueries.extractRoutine(
      routines,
      state.isEvening,
      today.date
    );
    // set the routine in state based on what we extracted.
    state.routine = routine;

    return {
      days: new CalendarDays(state.visibleDays),
      steps,
      routine,
    };
  }

  // static getViewModel2() {

  // }

  @Selector([
    CalendarState,
    IngredientQueries.getIngredients,
    CalendarSelectors.getCategoryStepModel,
  ])
  static getIngredientFilteredView(
    state: CalendarStateModel,
    ingredients: IngredientRelations[],
    dict: { category: Category; products: Product[] }[]
  ): CalendarViewModel {
    const relations = ingredients.find(
      (relation) => relation.label === state.routine?.base
    );

    let copy = [...dict];
    if (relations) {
      copy = copy.filter((x) => {
        console.log(this.extractProduct(x.products, relations));
        return this.extractProduct(x.products, relations).length > 0;
      });
    }
    const model = {
      routine: state.routine,
      days: new CalendarDays(state.visibleDays),
      steps: copy,
    };

    return model;
  }

  private static extractProduct(
    products: Product[],
    relations: IngredientRelations
  ) {
    return products.filter((product) => {
      return product.ingredients.some((r) =>
        relations?.ingredients.some((tN) => tN === r)
      );
    });
  }

  private static extractRoutine(
    routines: Routine[],
    isEvening: boolean,
    date: Date
  ) {
    return routines?.find((routine) => {
      return (
        routine.day === date.toLocaleDateString('de-DE', { weekday: 'long' }) &&
        (isEvening ? routine.daytime == 'abends' : routine.daytime == 'morgens')
      );
    });
  }
}
