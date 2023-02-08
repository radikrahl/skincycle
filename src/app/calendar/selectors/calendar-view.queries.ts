import { Selector } from '@ngxs/store';
import { Product } from 'src/app/products/models/product.model';
import { ProductsState } from 'src/app/products/state/products.state';
import { Category } from 'src/app/shared/categories/models/category.model';
import { CategoriesState } from 'src/app/shared/categories/state/categories.state';
import { Routine } from 'src/app/shared/routines/models/routine.model';
import { RoutinesState } from 'src/app/shared/routines/state/routines.state';
import {
  CalendarDays,
  CalendarStepModel,
  CalendarViewModel,
} from '../models/calendar.model';
import { IngredientRelations } from '../models/ingredient-relations.model';
import { CalendarState, CalendarStateModel } from '../state/calendar.state';
import { IngredientsState } from '../state/ingredients.state';

export class CalendarViewQueries {
  @Selector([CalendarState, CalendarViewQueries.getCategoryStepModel])
  static getViewModel(
    state: CalendarStateModel,
    steps: CalendarStepModel[]
  ): CalendarViewModel {
    return {
      days: new CalendarDays(state.visibleDays),
      steps: steps,
      routine: state.routine,
    };
  }

  @Selector([CalendarState, CalendarViewQueries.getCategoryStepModel2])
  static getViewModel2(
    state: CalendarStateModel,
    steps: CalendarStepModel[]
  ): CalendarViewModel {
    return {
      days: new CalendarDays(state.visibleDays),
      steps: steps,
      routine: state.routine,
    };
  }

  @Selector([RoutinesState.entities(), CalendarState])
  static getRoutine(routines: Routine[], state: CalendarStateModel) {
    return this.extractRoutine(
      routines,
      state.isEvening,
      state.visibleDays[1].date
    );
  }

  @Selector([IngredientsState.entities(), CalendarViewQueries.getRoutine])
  static getRelationByLabel(
    ingredients: IngredientRelations[],
    routine?: Routine
  ) {
    return ingredients.find((x) => x.label === routine?.base);
  }

  @Selector([ProductsState.entities(), CalendarViewQueries.getRelationByLabel])
  static getProductsByRelation(
    products: Product[],
    relations?: IngredientRelations
  ) {
    if (relations) {
      return products.filter((product) =>
        product.ingredients.some((productIngredient) =>
          relations.ingredients.some((relationIngredient) =>
            productIngredient.includes(relationIngredient)
          )
        )
      );
    } else {
      return products;
    }
  }

  @Selector([
    CategoriesState.entities(),
    CalendarViewQueries.getProductsByRelation,
  ])
  static getCategoryStepModel(categories: Category[], products: Product[]) {
    return categories.map((category) => {
      return {
        category: category,
        products: products.filter(
          (product) => product.category === category.label
        ),
      };
    });
  }

  @Selector([CategoriesState.entities(), ProductsState.entities()])
  static getCategoryStepModel2(categories: Category[], products: Product[]) {
    return categories.map((category) => {
      return {
        category: category,
        products: products.filter(
          (product) => product.category === category.label
        ),
      };
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
